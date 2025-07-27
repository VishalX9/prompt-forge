"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Code,
  Terminal,
  User,
  Bot,
  Send,
  Zap,
  Copy,
  Check,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

// Simple utility function to combine class names
const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// Simple form validation
const validateForm = (prompt: string) => {
  return prompt.trim().length > 0;
};

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const MessageBubble: React.FC<{
  content: string;
  role: "user" | "assistant";
  timestamp: string;
}> = ({ content, role, timestamp }) => {
  const isUser = role === "user";
  const [copied, setCopied] = useState<number | null>(null);

  const extractExplanation = (text: string): { main: string; explanation: string | null } => {
    const [mainPart, ...rest] = text.split(":::explanation");
    const explanation = rest.length > 0 ? rest.join(":::explanation").trim() : null;
    return {
      main: mainPart.trim(),
      explanation,
    };
  };

  const handleCopy = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div
      className={cn(
        "w-full py-4 px-6 my-3 mx-auto max-w-3xl rounded-lg border",
        isUser
          ? "bg-[var(--page-background)] border-blue-200"
          : "bg-white/90 border-gray-200",
        "shadow-sm hover:shadow-md transition-all duration-300"
      )}
    >
      <div className="flex gap-4 items-start">
        <div className="pt-1 flex-shrink-0">
          {isUser ? (
            <User className="w-6 h-6 text-blue-600" />
          ) : (
            <Bot className="w-6 h-6 text-green-600" />
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props: {
                node?: any;
                inline?: boolean;
                className?: string;
                children?: React.ReactNode;
                [key: string]: any;
              }) {
                const { inline = false, className, children, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                const fullCode = String(children).trim();
                const { main, explanation } = extractExplanation(fullCode);
                const index = Math.random();

                if (inline) {
                  return (
                    <code
                      className={cn(
                        "bg-gray-100 px-1.5 py-0.5 rounded-md text-red-600 font-mono text-sm break-all",
                        className
                      )}
                      {...rest}
                    >
                      {children}
                    </code>
                  );
                }

                return (
                  <div className="my-4 bg-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <div className="relative group">
                      <SyntaxHighlighter
                        language={match ? match[1] : "javascript"}
                        style={oneLight}
                        PreTag="div"
                        className="rounded-t-xl text-sm !m-0 !p-4 !bg-gray-50 overflow-x-auto"
                        wrapLines={true}
                        wrapLongLines={true}
                      >
                        {main}
                      </SyntaxHighlighter>
                      <button
                        onClick={() => handleCopy(main, index)}
                        className="absolute top-3 right-3 text-gray-600 bg-gray-200/80 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-300 hover:text-green-600"
                      >
                        {copied === index ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {isUser === false && explanation && (
                      <div className="p-4 bg-white/80 border-t border-gray-200 text-gray-700 text-sm leading-relaxed">
                        <span className="block font-semibold text-green-600 mb-2 tracking-wide">
                          Explanation
                        </span>
                        <div className="pl-3 border-l-2 border-green-500/50 break-words">
                          {explanation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              },
              p: ({ children }) => (
                <p className="break-words leading-relaxed">{children}</p>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
          <div className="mt-2 text-right text-xs text-gray-500">
            {timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};

const CodePage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(prompt)) {
      return;
    }

    setIsLoading(true);

    try {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: prompt,
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      const response = await fetch("/api/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content || data.message || "No response received",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setPrompt("");
    } catch (error) {
      console.error("Error:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, something went wrong. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen" data-color="blue">
      <div
        className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:40px_40px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
        style={{ backgroundColor: "var(--page-background)" }}
      />

      {!hasMessages && (
        <div className="relative px-4 lg:px-10 py-10">
          <div className="flex items-center justify-between p-6 bg-white/80 border border-blue-200 rounded-xl shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Code className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Code Generation</h1>
                <p className="text-gray-600">Advanced AI-powered coding assistant and code generator.</p>
              </div>
            </div>
            <button className="p-2 bg-[var(--page-background)] rounded-lg hover:bg-white/50 transition-colors">
              <User className="w-6 h-6 text-blue-600" />
            </button>
          </div>
        </div>
      )}

      <div className="relative px-4 lg:px-10 pb-10">
        {!hasMessages ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-10">
            <div className="text-center space-y-6">
              <div className="relative">
                <div
                  className="w-24 h-24 mx-auto bg-[var(--page-background)] rounded-2xl flex items-center justify-center border border-blue-200 shadow-md backdrop-blur-sm"
                >
                  <Terminal className="w-12 h-12 text-green-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Code Assistant Ready
              </h2>
              <p className="text-gray-600 max-w-md mx-auto text-lg">
                Generate, debug, explain, and optimize code in any language.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl w-full px-4">
              {[
                {
                  title: "Generate Code",
                  icon: <Zap className="w-5 h-5 text-green-600" />,
                  bg: "bg-[var(--page-background)]",
                  desc: "Create functions, classes, or applications from scratch",
                },
                {
                  title: "Debug & Fix",
                  icon: <Code className="w-5 h-5 text-red-600" />,
                  bg: "bg-[var(--page-background)]",
                  desc: "Find and fix bugs, optimize performance",
                },
                {
                  title: "Explain Code",
                  icon: <Terminal className="w-5 h-5 text-purple-600" />,
                  bg: "bg-[var(--page-background)]",
                  desc: "Understand complex algorithms and logic",
                },
                {
                  title: "Code Review",
                  icon: <Code className="w-5 h-5 text-yellow-600" />,
                  bg: "bg-[var(--page-background)]",
                  desc: "Get best practices, tips, and improvements",
                },
              ].map(({ title, icon, bg, desc }) => (
                <div
                  key={title}
                  className="group p-5 bg-white/80 rounded-xl border border-blue-200 hover:border-blue-400 backdrop-blur-sm shadow transition-all duration-300 cursor-pointer hover:bg-white hover:shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${bg}`}>{icon}</div>
                    <h3 className="font-semibold text-gray-800">{title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-6xl mx-auto">
            <div className="bg-white/80 rounded-xl p-4 border border-blue-200 backdrop-blur-sm shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[var(--page-background)] rounded-lg">
                    <Terminal className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-800">
                      Coding Session
                    </h1>
                    <p className="text-sm text-gray-600">
                      {messages.length} exchanges
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-600">Active</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  content={msg.content}
                  role={msg.role}
                  timestamp={msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              ))}
            </div>
          </div>
        )}

        <div
          className={`${hasMessages ? "mt-8 max-w-6xl" : "max-w-3xl"} mx-auto`}
        >
          <div className="bg-white/90 border border-blue-200 p-5 rounded-xl shadow-xl backdrop-blur-sm">
            <form onSubmit={onSubmit} className="flex items-end gap-4">
              <div className="flex-1">
                <input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={
                    hasMessages
                      ? "Ask about code, debugging, explanations..."
                      : "Generate a Python function to sort a list..."
                  }
                  disabled={isLoading}
                  className="w-full h-14 text-base bg-gray-50 text-gray-800 border border-gray-300 rounded-xl px-4 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !validateForm(prompt)}
                className="h-14 px-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Execute
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;