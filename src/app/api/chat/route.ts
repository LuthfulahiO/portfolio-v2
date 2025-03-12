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
      Below is the content extracted from his resume, recommendation letters, project case studies, and other professional documents.
      Use this information to accurately answer questions about Luthfulahi's skills, experience, and qualifications.
      When presented with job descriptions, analyze them to highlight how Luthfulahi's specific skills and experience match the requirements.
      Format responses well, using markdown when appropriate.
      Be honest and authentic in your assessments - only reference experiences and skills that are documented in the training data.
      If requested to generate a comparison table or chart, structure your response accordingly.
      For code snippets, use proper markdown code blocks.
      If there's information not covered in the training data, admit it rather than making up information.
      
      TRAINING DATA:
      ${trainingData}`,
    };

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [systemMessage, ...formattedMessages],
      temperature: 0.7,
      max_tokens: 1500,
    });

    // Get generated response
    const generatedMessage = response.choices[0].message;

    // Parse response for special formats
    const processedMessage: {
      role: "assistant";
      content: string;
      type?: "text" | "table" | "code" | "comparison";
    } = {
      role: "assistant",
      content: generatedMessage.content || "",
    };

    // Check if the response contains a table (using markdown table syntax)
    if (
      processedMessage.content.includes("|") &&
      processedMessage.content.includes("---")
    ) {
      // Basic table detection
      const tableLines = processedMessage.content
        .split("\n")
        .filter((line: string) => line.includes("|"));
      if (tableLines.length >= 3) {
        // Header, separator, and at least one row
        processedMessage.type = "table";
      }
    }

    // Check if the response contains code blocks
    if (processedMessage.content.includes("```")) {
      processedMessage.type = "code";
    }

    return NextResponse.json({ message: processedMessage });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
