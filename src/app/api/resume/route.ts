import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    // Default resume path (standard resume)
    const resumePath = path.join(process.cwd(), "public", "training_data", "resume.pdf");
    
    // Read the resume file
    const resumeBuffer = fs.readFileSync(resumePath);

    // Return the resume file with appropriate headers
    return new NextResponse(resumeBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Luthfulahi_Resume.pdf"',
      },
    });
  } catch (error) {
    console.error("Error retrieving resume:", error);
    return NextResponse.json(
      { error: "An error occurred while retrieving the resume" },
      { status: 500 }
    );
  }
}
