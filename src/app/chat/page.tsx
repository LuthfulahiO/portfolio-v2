"use client";

import { motion } from "motion/react";
import ChatInterface from "@/components/ChatInterface";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Terminal Header */}
      <div className="flex justify-between border-b border-border px-4 h-10 items-center">
        <div className="flex flex-row gap-x-2 items-center">
          <Link href="/" className="group relative">
            <div className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer flex items-center justify-center">
              <span className="absolute invisible group-hover:visible whitespace-nowrap bg-background border border-border rounded px-2 py-1 text-xs left-0 top-5 z-10">Home</span>
            </div>
          </Link>
          <Link href="/resume-generator" className="group relative">
            <div className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer">
              <span className="absolute invisible group-hover:visible whitespace-nowrap bg-background border border-border rounded px-2 py-1 text-xs left-0 top-5 z-10">Resume Generator</span>
            </div>
          </Link>
          <Link href="/chat" className="group relative">
            <div className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer">
              <span className="absolute invisible group-hover:visible whitespace-nowrap bg-background border border-border rounded px-2 py-1 text-xs left-0 top-5 z-10">Chat</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
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

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          <ChatInterface />
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
