import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { renderToStream } from "@react-pdf/renderer";
import { createPdfFromMarkdown } from "@/utils/pdfGenerator";

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

// Function to generate PDF from content
async function generatePDF(content: string): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a PDF document from markdown content
      const pdfDocument = createPdfFromMarkdown(content);

      // Render to a buffer
      const stream = await renderToStream(pdfDocument);
      const chunks: Uint8Array[] = [];

      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(pdfBuffer);
      });
      stream.on("error", (error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      jobDescription,
      content,
      skipGeneration = false,
      format = "markdown",
    } = body;

    // If skipGeneration is true, use the provided content directly
    // This ensures what the user sees is what gets downloaded
    let resumeContent = "";

    if (skipGeneration) {
      if (!content) {
        return NextResponse.json(
          { error: "Content is required when skipGeneration is true" },
          { status: 400 }
        );
      }
      resumeContent = content;
    } else {
      if (!jobDescription) {
        return NextResponse.json(
          { error: "Invalid request: jobDescription is required" },
          { status: 400 }
        );
      }
    }

    // Only call OpenAI if skipGeneration is false
    if (!skipGeneration) {
      // Load training data
      const trainingData = loadTrainingData();

      // System message to instruct the AI to generate a STAR method resume
      const systemMessage = {
        role: "system" as const,
        content: `You are a professional resume writer specializing in creating tailored resumes using the STAR (Situation, Task, Action, Result) method. 
        
        Below is the content extracted from Luthfulahi's resume, recommendation letters, project case studies, and other professional documents.
        Use this information to create a tailored resume that matches the job description provided.
        
        Follow these guidelines:
        1. Use the STAR method for all work experiences and achievements
        2. Format the resume professionally using markdown
        3. Highlight skills and experiences that directly match the job description
        4. Be truthful and only include information from the provided training data
        5. Create a well-structured resume with clear sections (Personal Information, Summary, Skills, Experience, Education, etc.)
        6. For each experience, clearly state the Situation, Task, Action, and Result
        7. Make the resume ATS-friendly with relevant keywords from the job description
        
        TRAINING DATA:
        ${trainingData}`,
      };

      // User message with the job description
      const userMessage = {
        role: "user" as const,
        content: `Please create a tailored resume for this job description:\n\n${jobDescription}`,
      };

      // Call OpenAI API
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [systemMessage, userMessage],
        temperature: 0.7,
      });

      // Update the existing resumeContent variable
      resumeContent = response.choices[0].message.content || "";
    }
    // If skipGeneration is true, we're already using the content provided by the user

    // If format is PDF, generate and return PDF
    if (format === "pdf") {
      try {
        const pdfBuffer = await generatePDF(resumeContent);
        return new NextResponse(pdfBuffer, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition":
              'attachment; filename="Luthfulahi_Tailored_Resume.pdf"',
          },
        });
      } catch (error) {
        console.error("Error generating PDF:", error);
        return NextResponse.json(
          {
            error: "An error occurred while generating the PDF",
            content: resumeContent,
          },
          { status: 500 }
        );
      }
    }

    // Return markdown content by default
    return NextResponse.json({
      content: resumeContent,
      message: "Resume generated successfully",
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
