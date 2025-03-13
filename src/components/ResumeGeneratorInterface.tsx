"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Download, Loader2, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

type ResumeState = {
  content: string;
  status: "idle" | "loading" | "success" | "error";
  error?: string;
};

type ButtonState = {
  isGeneratingPdf: boolean;
};

type CopyState = {
  copied: boolean;
  timeoutId: NodeJS.Timeout | null;
};

const ResumeGeneratorInterface = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeState, setResumeState] = useState<ResumeState>({
    content: "",
    status: "idle",
  });
  const [buttonState, setButtonState] = useState<ButtonState>({
    isGeneratingPdf: false,
  });
  const [copyState, setCopyState] = useState<CopyState>({
    copied: false,
    timeoutId: null,
  });
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (resumeState.status === "success") {
      scrollToTop();
    }
  }, [resumeState.status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;

    setResumeState({
      content: "",
      status: "loading",
    });

    try {
      // Call the API
      const response = await fetch("/api/resume-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription,
          format: "markdown",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // Update resume state
      setResumeState({
        content: data.content,
        status: "success",
      });
    } catch (error) {
      console.error("Error:", error);
      setResumeState({
        content: "",
        status: "error",
        error: "Failed to generate resume. Please try again.",
      });
    }
  };

  const handleDownloadPDF = async () => {
    if (!resumeState.content) return;

    try {
      // Show loading state for the PDF button only
      setButtonState({
        isGeneratingPdf: true,
      });

      // Make API call to generate PDF using the already generated content
      const response = await fetch("/api/resume-generator?format=pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          content: resumeState.content, // Send the exact content that's already displayed
          skipGeneration: true // Tell the API not to regenerate content
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate PDF");
      }

      // Create blob from response and download
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Luthfulahi_Tailored_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Reset PDF button state
      setButtonState({
        isGeneratingPdf: false,
      });
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setButtonState({
        isGeneratingPdf: false,
      });
      
      // Show error message but don't change the main resume state
      alert("Failed to download PDF. Please try again.");
    }
  };

  const handleCopyMarkdown = async () => {
    if (!resumeState.content) return;
    
    try {
      await navigator.clipboard.writeText(resumeState.content);
      
      // Clear any existing timeout
      if (copyState.timeoutId) {
        clearTimeout(copyState.timeoutId);
      }
      
      // Set copied state with a new timeout
      const timeoutId = setTimeout(() => {
        setCopyState(prev => ({ ...prev, copied: false }));
      }, 2000);
      
      setCopyState({ copied: true, timeoutId });
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      alert("Failed to copy to clipboard. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] w-full max-w-6xl mx-auto pt-2 sm:pt-4 px-2 sm:px-4 overflow-hidden">
      <div className="mb-3 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Resume Generator</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Paste a job description below to generate a tailored resume using the
          STAR method based on your experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 flex-1 overflow-hidden">
        {/* Input Section */}
        <div className="flex flex-col">
          <div className="mb-2 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Job Description</h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="flex-1 p-3 rounded-lg border border-border bg-transparent resize-none mb-3 min-h-[200px]"
              disabled={resumeState.status === "loading"}
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 p-2 rounded-lg bg-primary text-primary-foreground text-sm sm:text-base disabled:opacity-50 flex items-center justify-center"
                disabled={
                  resumeState.status === "loading" || !jobDescription.trim()
                }
              >
                {resumeState.status === "loading" ? (
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-1 sm:mr-2" />
                ) : (
                  <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                )}
                <span>Generate Resume</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPDF}
                className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 disabled:opacity-50 flex items-center justify-center"
                disabled={
                  resumeState.status === "loading" || !jobDescription.trim()
                }
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Output Section */}
        <div className="flex flex-col">
          <div className="mb-2 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Generated Resume</h2>
            {resumeState.status === "success" && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <button
                  onClick={handleCopyMarkdown}
                  className="flex items-center text-xs sm:text-sm text-primary hover:underline"
                  disabled={copyState.copied}
                >
                  {copyState.copied ? (
                    <>
                      <Check className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                      Copy Markdown
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center text-xs sm:text-sm text-primary hover:underline"
                  disabled={buttonState.isGeneratingPdf}
                >
                  {buttonState.isGeneratingPdf ? (
                    <>
                      <Loader2 className="h-3 sm:h-4 w-3 sm:w-4 mr-1 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                      Download PDF
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto p-2 sm:p-4 rounded-lg border border-border bg-muted/30 max-h-[calc(100vh-12rem)] md:max-h-[calc(100vh-15rem)] shadow-sm"
            style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'thin' }}
          >
            <AnimatePresence>
              {resumeState.status === "loading" ? (
                <motion.div
                  className="flex justify-center items-center h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="mt-2 text-muted-foreground">
                      Generating your tailored resume...
                    </p>
                  </div>
                </motion.div>
              ) : resumeState.status === "error" ? (
                <motion.div
                  className="flex justify-center items-center h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-red-500">{resumeState.error}</div>
                </motion.div>
              ) : resumeState.status === "success" ? (
                <motion.div
                  className="prose prose-invert max-w-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="whitespace-pre-wrap">
                    <ReactMarkdown>{resumeState.content}</ReactMarkdown>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="flex justify-center items-center h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-muted-foreground">
                    Your tailored resume will appear here.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeGeneratorInterface;
