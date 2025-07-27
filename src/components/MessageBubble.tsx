"use client";

import React, { useState } from "react";
import { Bot, User, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "lib/utils";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  role,
  content,
}) => {
  const isUser = role === "user";
  const [copied, setCopied] = useState<number | null>(null);

  // Extract explanation if it's present using :::explanation
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
        "w-full py-6 px-6 my-2 mx-auto max-w-4xl rounded-lg border border-neutral-700/50",
        isUser ? "bg-neutral-900/70" : "bg-neutral-950/70",
        "hover:bg-neutral-900/90 transition-all duration-300"
      )}
    >
      <div className="flex gap-4 items-start">
        <div className="pt-1 flex-shrink-0">
          {isUser ? (
            <User className="w-7 h-7 text-neutral-100" />
          ) : (
            <Bot className="w-7 h-7 text-green-400" />
          )}
        </div>
        <div className="prose prose-invert max-w-full font-sans text-neutral-200 leading-relaxed">
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
                const {
                  inline = false,
                  className,
                  children,
                  ...rest
                } = props;

                const match = /language-(\w+)/.exec(className || "");
                const fullCode = String(children).trim();
                const { main, explanation } = extractExplanation(fullCode);
                const index = Math.random();

                if (inline) {
                  return (
                    <code
                      className={cn(
                        "bg-neutral-800/70 px-2 py-1 rounded-md text-rose-300 font-mono text-sm",
                        className
                      )}
                      {...rest}
                    >
                      {children}
                    </code>
                  );
                }

                return (
                  <div className="my-4 bg-neutral-900/50 rounded-xl shadow-md overflow-hidden border border-neutral-700/50">
                    <div className="relative group">
                      <SyntaxHighlighter
                        language={match ? match[1] : "javascript"}
                        style={oneDark}
                        PreTag="div"
                        className="rounded-t-xl text-sm !m-0 !p-5 !bg-neutral-900/80"
                      >
                        {main}
                      </SyntaxHighlighter>
                      <button
                        onClick={() => handleCopy(main, index)}
                        className="absolute top-3 right-3 text-neutral-200 bg-neutral-800/90 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-neutral-700/90 hover:text-green-400"
                      >
                        {copied === index ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {isUser === false && explanation && (
                      <div className="p-5 bg-neutral-800/30 border-t border-neutral-700/60 text-neutral-300 text-sm leading-relaxed">
                        <span className="block font-semibold text-green-400 mb-3 tracking-wide">
                          Explanation
                        </span>
                        <div className="pl-2 border-l-2 border-green-500/50">
                          {explanation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};