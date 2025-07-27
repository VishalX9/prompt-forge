"use client";

import React, { useState, useEffect } from "react";
import {
  Camera,
  Brush,
  User,
  Sparkles,
  Send,
  Download,
  Heart,
  Share2,
  Zap,
  Wand2,
  Palette,
  ImageIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

interface ImageGeneration {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: Date;
  liked: boolean;
}

const ImageCard: React.FC<{
  generation: ImageGeneration;
  onLike: (id: string) => void;
  onDownload: (url: string, prompt: string) => void;
}> = ({ generation, onLike, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={generation.imageUrl}
          alt={generation.prompt}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white text-sm font-medium line-clamp-2 mb-3">
              {generation.prompt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onLike(generation.id)}
                  className={cn(
                    "p-2 rounded-full transition-all duration-200",
                    generation.liked
                      ? "bg-red-500 text-white"
                      : "bg-white/20 text-white hover:bg-white/30"
                  )}
                >
                  <Heart
                    className={cn("w-4 h-4", generation.liked ? "fill-current" : "")}
                  />
                </button>
                <button
                  className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => onDownload(generation.imageUrl, generation.prompt)}
                className="px-4 py-2 bg-white text-gray-800 rounded-full text-sm font-medium hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{generation.timestamp.toLocaleDateString()}</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            AI Generated
          </span>
        </div>
      </div>
    </div>
  );
};

const StylePreset: React.FC<{
  name: string;
  preview: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ name, preview, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "relative overflow-hidden rounded-xl border-2 transition-all duration-300 group",
      isSelected
        ? "border-violet-500 shadow-lg shadow-violet-500/25"
        : "border-gray-200 hover:border-violet-300"
    )}
  >
    <div className="w-20 h-20 bg-[var(--page-background)] flex items-center justify-center">
      <div className="text-2xl">{preview}</div>
    </div>
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
    <div className="p-2 bg-white">
      <p className="text-xs font-medium text-gray-700 truncate">{name}</p>
    </div>
  </button>
);

const ImageGeneratorPage = () => {
  const router = useRouter();
  const [generations, setGenerations] = useState<ImageGeneration[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("photorealistic");

  const stylePresets = [
    { id: "photorealistic", name: "Photo", preview: "📸", color: "blue" },
    { id: "artistic", name: "Artistic", preview: "🎨", color: "purple" },
    { id: "anime", name: "Anime", preview: "🌸", color: "pink" },
    { id: "digital", name: "Digital", preview: "💎", color: "cyan" },
    { id: "vintage", name: "Vintage", preview: "📻", color: "brown" },
    { id: "abstract", name: "Abstract", preview: "🌀", color: "green" },
  ];

  useEffect(() => {
    const selectedPreset = stylePresets.find((style) => style.id === selectedStyle);
    const color = selectedPreset?.color || "blue";
    document.body.setAttribute("data-color", color);
  }, [selectedStyle]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `${prompt}, ${selectedStyle} style`,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      const imageUrl = data.image ?? "/placeholder.jpg";

      if (!imageUrl) {
        throw new Error("No image URL returned from API");
      }

      const newGeneration: ImageGeneration = {
        id: Date.now().toString(),
        prompt: prompt,
        imageUrl: imageUrl,
        timestamp: new Date(),
        liked: false,
      };

      setGenerations((prev) => [newGeneration, ...prev]);
      setPrompt("");
    } catch (error) {
      console.error("Generation failed:", error);
      alert(
        `Failed to generate image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsGenerating(false);
      router.refresh();
    }
  };

  const handleLike = (id: string) => {
    setGenerations((prev) =>
      prev.map((gen) => (gen.id === id ? { ...gen, liked: !gen.liked } : gen))
    );
  };

  const handleDownload = (imageUrl: string, prompt: string) => {
    try {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `ai-art-${prompt.slice(0, 20).replace(/\s+/g, "-")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image");
    }
  };

  return (
    <div className="min-h-screen" data-color="blue">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 animate-pulse"
          style={{ backgroundColor: "var(--page-background)" }}
        />
        <div
          className="absolute top-40 right-20 w-24 h-24 rounded-full opacity-30 animate-bounce"
          style={{ backgroundColor: "var(--page-background)", animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-16 h-16 rounded-full opacity-25 animate-pulse"
          style={{ backgroundColor: "var(--page-background)", animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 text-center py-12 px-4">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
          <Wand2 className="w-6 h-6 text-violet-600" />
          <span className="font-semibold text-gray-800">AI Image Studio</span>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Dream It, Create It
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your wildest imagination into stunning visual masterpieces with the power of AI
        </p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-violet-600" />
              Choose Your Style
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {stylePresets.map((style) => (
                <StylePreset
                  key={style.id}
                  name={style.name}
                  preview={style.preview}
                  isSelected={selectedStyle === style.id}
                  onClick={() => setSelectedStyle(style.id)}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision... A majestic dragon soaring through clouds at sunset, fantasy art style, highly detailed..."
                className="w-full h-32 p-6 pr-20 text-lg bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all duration-300 resize-none outline-none"
                disabled={isGenerating}
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <span className="text-sm text-gray-400">{prompt.length}/500</span>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className={cn(
                    "p-3 rounded-xl transition-all duration-300 flex items-center gap-2 font-semibold",
                    isGenerating || !prompt.trim()
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                  )}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Generate
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-12">
        {generations.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-[var(--page-background)] rounded-full flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">Your Gallery Awaits</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Start creating amazing images by describing what you want to see. Your generated artwork will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Camera className="w-8 h-8 text-violet-600" />
                Your Creations
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Sparkles className="w-4 h-4" />
                {generations.length} images generated
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {generations.map((generation) => (
                <ImageCard
                  key={generation.id}
                  generation={generation}
                  onLike={handleLike}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageGeneratorPage;