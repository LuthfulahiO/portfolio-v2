"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "./ui/button";

const portfolioAscii = `
██      ██    ██ ████████ ██   ██ ███████ ██    ██ ██       █████  ██   ██ ██ 
██      ██    ██    ██    ██   ██ ██      ██    ██ ██      ██   ██ ██   ██ ██ 
██      ██    ██    ██    ███████ █████   ██    ██ ██      ███████ ███████ ██ 
██      ██    ██    ██    ██   ██ ██      ██    ██ ██      ██   ██ ██   ██ ██ 
███████  ██████     ██    ██   ██ ██       ██████  ███████ ██   ██ ██   ██ ██

 ██████  ███████ ███████ ███    ██ ████████
██    ██ ██      ██      ████   ██    ██   
██    ██ ███████ █████   ██ ██  ██    ██   
██    ██      ██ ██      ██  ██ ██    ██   
 ██████  ███████ ███████ ██   ████ ████████
`;

const PortfolioIntro = () => {
  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Terminal Header */}
      <div className="flex justify-between border-b border-border px-4 h-10 items-center">
        <div className="flex flex-row gap-x-2 items-center">
          <Link href="/" className="group relative">
            <div className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer flex items-center justify-center">
              <span className="absolute invisible group-hover:visible whitespace-nowrap bg-background border border-border rounded px-2 py-1 text-xs left-0 top-5 z-10">
                Home
              </span>
            </div>
          </Link>
          <Link href="/resume-generator" className="group relative">
            <div className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer">
              <span className="absolute invisible group-hover:visible whitespace-nowrap bg-background border border-border rounded px-2 py-1 text-xs left-0 top-5 z-10">
                Resume Generator
              </span>
            </div>
          </Link>
          <Link href="/chat" className="group relative">
            <div className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer">
              <span className="absolute invisible group-hover:visible whitespace-nowrap bg-background border border-border rounded px-2 py-1 text-xs left-0 top-5 z-10">
                Chat
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto p-4">
          {/* Condensed Portfolio Introduction */}
          <motion.div
            className="min-h-[calc(100vh-8rem)] flex flex-col items-start justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <pre className="font-normal text-primary text-[0.35rem] lg:text-base mb-6">
              {portfolioAscii}
            </pre>

            <motion.div
              className="text-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              After creating numerous portfolio iterations, I&apos;ve found a
              better way to showcase who I am as a professional.
            </motion.div>

            <motion.div
              className="text-lg mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Instead of a static presentation, I&apos;ve built an interactive
              AI assistant trained on my complete professional profile — my
              resume, recommendations, skills, experiences, and achievements.
              This AI provides you with a dynamic way to evaluate how my
              expertise as a product engineer, frontend developer, and founding
              engineer aligns with your needs.
            </motion.div>

            <motion.div
              className="mt-8 p-4 bg-accent/10 rounded-lg border border-border w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                className="text-lg font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Want to know if I&apos;m a good fit? Simply paste your job
                description and ask:
              </motion.div>

              <div className="flex flex-col gap-2 mt-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="text-primary"
                >
                  <span>
                    • &quot;Is Luthfulahi a good fit for this position?&quot;
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="text-primary"
                >
                  <span>
                    • &quot;Why should or shouldn&apos;t I hire him?&quot;
                  </span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.5 }}
              className="my-6 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/chat">
                <Button>Start the Conversation</Button>
              </Link>
              <Link href="/resume-generator">
                <Button>Resume Generator</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="border-t border-border px-4 h-14 flex items-center">
        <span className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Luthfulahi
        </span>
      </div>
    </div>
  );
};

export default PortfolioIntro;
