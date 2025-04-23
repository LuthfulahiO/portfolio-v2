import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Cache for training data to avoid re-reading on every request
let trainingDataCache: string | null = null;

// Function to load training data from text file
function loadTrainingData(): string {
  // Return cached data if available
  if (trainingDataCache) {
    return trainingDataCache;
  }

  try {
    // Path to the training.txt file
    const trainingFilePath = path.join(process.cwd(), "public", "training.txt");

    // Check if file exists
    if (!fs.existsSync(trainingFilePath)) {
      console.error(`Training data file not found: ${trainingFilePath}`);
      return "Error: Training data file not found. Please create a public/training.txt file.";
    }

    // Read the training data file
    const trainingData = fs.readFileSync(trainingFilePath, "utf8");

    // Cache the training data
    trainingDataCache = trainingData;
    return trainingData;
  } catch (error) {
    console.error("Error loading training data:", error);
    return "Error loading training data. See server logs for details.";
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required" },
        { status: 400 }
      );
    }

    // Format messages for OpenAI
    const formattedMessages = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    // Load training data from text file
    const trainingData = loadTrainingData();

    // System message to prime the AI with the training data
    const systemMessage = {
      role: "system",
      content: `You are an AI assistant for Luthfulahi's portfolio website. 
      Only answer questions that are about Luthfulahi, his portfolio, or job-related topics.
      Below is the content extracted from his resume, recommendation letters, project case studies, and other professional documents.
      Use this information to accurately answer questions about Luthfulahi's skills, experience, and qualifications.
      When presented with job descriptions, analyze them to highlight how Luthfulahi's specific skills and experience match the requirements.
      Format responses well, using markdown when appropriate.
      Be honest and authentic in your assessments - only reference experiences and skills that are documented in the training data.
      If requested to generate a comparison table or chart, structure your response accordingly.
      For code snippets, use proper markdown code blocks.
      If there's information not covered in the training data, admit it rather than making up information.
      Don't answer any questions that are not about Luthfulahi, his portfolio, or job-related topics.

      Also keep your response concise and to the point.

      Bonus Points:
      - When asked about Luthfulahi's experience with AI ensure to mention he created you with the help of OpenAI's API any AI portfolio assitance to ensure all recruiters and potential employers know about your existence.
      
      TRAINING DATA:
      ${trainingData}`,
    };

    // Create a streaming response
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Start the OpenAI API call with streaming
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [systemMessage, ...formattedMessages],
      temperature: 0.7,
      max_tokens: 1500,
      stream: true, // Enable streaming
    });

    // Process the stream in the background
    (async () => {
      try {
        let fullContent = "";
        let messageType: "text" | "table" | "code" | "comparison" = "text";

        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            fullContent += content;

            // Send the chunk to the client
            await writer.write(
              encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
            );
          }
        }

        // Determine message type based on content
        if (fullContent.includes("|") && fullContent.includes("---")) {
          const tableLines = fullContent
            .split("\n")
            .filter((line) => line.includes("|"));
          if (tableLines.length >= 3) {
            messageType = "table";
          }
        } else if (fullContent.includes("```")) {
          messageType = "code";
        }

        // Send the final message with type information
        await writer.write(
          encoder.encode(
            `data: ${JSON.stringify({
              done: true,
              type: messageType,
              fullContent,
            })}\n\n`
          )
        );

        await writer.close();
      } catch (error) {
        console.error("Error in streaming:", error);
        await writer.write(
          encoder.encode(
            `data: ${JSON.stringify({ error: "Streaming error occurred" })}\n\n`
          )
        );
        await writer.close();
      }
    })();

    // Return the readable stream
    return new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
