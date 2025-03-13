"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import ResumeGeneratorInterface from "@/components/ResumeGeneratorInterface";

export default function ResumeGeneratorPage() {
  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Terminal Header */}
      <div className="flex justify-between border-b border-border px-4 h-10 items-center">
        <div className="flex flex-row gap-x-2 items-center">
          <div className="h-2 w-2 rounded-full bg-red-500"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Intro</span>
          </Link>
          <Link 
            href="/api/resume"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
          >
            <Download className="h-4 w-4" />
            <span>Download Resume</span>
          </Link>
        </div>
      </div>

      {/* Resume Generator Interface */}
      <div className="flex-1 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          <ResumeGeneratorInterface />
        </motion.div>
      </div>

      {/* Terminal Footer */}
      <div className="border-t border-border px-4 h-14 flex items-center">
        <span className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Luthfulahi - AI-Powered Portfolio
        </span>
      </div>
    </div>
  );
}
