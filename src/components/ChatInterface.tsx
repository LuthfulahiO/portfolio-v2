"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useIsMobile } from "@/hooks/use-mobile";

type Message = {
  role: "user" | "assistant";
  content: string;
  type?: "text" | "table" | "code" | "comparison";
  data?: {
    headers?: string[];
    rows?: string[][];
    [key: string]: unknown;
  };
};

const ChatInterface = () => {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm Luthfulahi's AI portfolio assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setStreamingMessage("");

    try {
      // Call the API with the entire conversation history
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let messageType: "text" | "table" | "code" | "comparison" = "text";
      let fullContent = "";

      if (!reader) {
        throw new Error("No reader available");
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decode the chunk and process it
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.substring(6));

              if (data.error) {
                throw new Error(data.error);
              }

              if (data.done) {
                // Final message with type information
                messageType = data.type;
                fullContent = data.fullContent;

                // Add the complete message to the messages array
                setMessages((prev) => [
                  ...prev,
                  {
                    role: "assistant",
                    content: fullContent,
                    type: messageType,
                  },
                ]);

                // Clear streaming message
                setStreamingMessage("");
              } else if (data.content) {
                // Update the streaming message
                setStreamingMessage((prev) => prev + data.content);
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again.",
        },
      ]);
      setStreamingMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message: Message, index: number) => {
    const isUser = message.role === "user";

    return (
      <motion.div
        key={index}
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`max-w-[80%] px-4 py-3 rounded-lg ${
            isUser ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          {message.type === "table" &&
          message.data &&
          message.data.headers &&
          message.data.rows ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr>
                    {message.data.headers.map((header: string, i: number) => (
                      <th
                        key={i}
                        className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {message.data.rows.map((row: string[], i: number) => (
                    <tr key={i} className="border-t border-border">
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-2 text-sm">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : message.type === "code" ? (
            <pre className="p-4 bg-background rounded-md overflow-x-auto">
              <code>{message.content}</code>
            </pre>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none overflow-auto markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-4xl mx-auto pt-4 px-4">
      <div className="flex-1 overflow-y-auto mb-4 px-2 hide-scrollbar">
        <AnimatePresence>
          {messages.map((message, index) => renderMessage(message, index))}
        </AnimatePresence>
        {streamingMessage && (
          <motion.div
            className="flex justify-start mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-[80%] px-4 py-3 rounded-lg bg-muted">
              <div className="prose prose-sm dark:prose-invert max-w-none overflow-auto markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {streamingMessage}
                </ReactMarkdown>
              </div>
            </div>
          </motion.div>
        )}
        {isLoading && !streamingMessage && (
          <motion.div
            className="flex justify-start mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-[80%] px-4 py-3 rounded-lg bg-muted">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length > 4 ? null : (
        <div className="mb-2 text-xs text-muted-foreground px-1">
          <span>
            💡 Tip: You can paste a job description and ask questions like
            &ldquo;His he a good fit for this role?&rdquo; or &ldquo;What are
            his strengths and weaknesses?&rdquo;
          </span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex items-end rounded-lg border border-border p-2"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            // Prevent form submission on Enter
            e.preventDefault();
          }
        }}
      >
        <div className="relative flex-1">
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // Auto-resize the textarea
              e.target.style.height = "44px";
              const newHeight = Math.min(e.target.scrollHeight, 250);
              e.target.style.height = `${newHeight}px`;
            }}
            onKeyDown={(e) => {
              // Only submit when pressing Enter without shift key
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.trim()) handleSubmit(e);
              }
              // Allow new line when pressing Shift+Enter
              if (e.key === "Enter" && e.shiftKey) {
                // Default behavior creates new line
              }
            }}
            placeholder={
              isMobile
                ? "Ask me anything about Luthfulahi..."
                : "Ask me anything about Luthfulahi... (Shift+Enter for new line)"
            }
            className="w-full bg-transparent outline-none px-2 resize-none overflow-y-auto hide-scrollbar min-h-[44px] max-h-[250px]"
            disabled={isLoading}
            rows={1}
          />
        </div>
        <button
          type="submit"
          className="p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 ml-2"
          disabled={isLoading || !input.trim()}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
