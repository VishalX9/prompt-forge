'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EmojiPromptPage() {
  const [promptText, setPromptText] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const color = 'blue';
    document.body.setAttribute('data-color', color);
  }, []);

  const generateEmoji = async () => {
    setLoading(true);
    setError(null);
    setImage(null);
    setDescription(null);
    try {
      const response = await fetch('/api/emoji', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ promptText: promptText.trim() }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const textResponse = await response.text();
        throw new Error(`Non-JSON response: ${textResponse}`);
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.message || `HTTP ${response.status}`);
      }

      setImage(data.image || null);
      setDescription(data.description || '');
    } catch (err: any) {
      console.error('Emoji generation error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      data-color="blue" 
    >
   
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
     
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
            <span className="text-3xl">🪄</span>
          </div>
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 mb-4 tracking-tight">
            AI Emoji Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your wildest ideas into custom emojis with the power of artificial intelligence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-2xl hover:shadow-purple-400/20 transition-all duration-500">
            <div className="space-y-6">
              <div>
                <label className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">💭</span>
                  Describe Your Emoji
                </label>
                <div className="relative">
                  <textarea
                    placeholder="Paint your emoji with words... 🎨
✨ 'A sleepy robot drinking coffee in space'
🌟 'A dancing taco with sunglasses'
🚀 'A ninja cat coding on a laptop'"
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    rows={6}
                    className="w-full p-4 bg-white/50 backdrop-blur border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-300/50 focus:border-purple-400 text-gray-800 placeholder-gray-400 text-lg transition-all duration-300 resize-none"
                  />
                  <div className="absolute bottom-4 right-4 text-gray-500 text-sm">
                    {promptText.length}/500
                  </div>
                </div>
              </div>

              <button
                onClick={generateEmoji}
                disabled={loading || !promptText.trim()}
                className="group w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-8 py-4 rounded-2xl hover:from-purple-400 hover:via-pink-400 hover:to-red-400 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-purple-400/50 transform hover:scale-105 disabled:transform-none relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Crafting Magic...
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">🧠</span>
                      Generate Emoji
                      <span className="text-2xl">✨</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {image && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-2xl transform animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <span className="text-3xl">🎉</span>
                  Your Custom Emoji
                </h3>
                <div className="bg-white/50 backdrop-blur rounded-2xl p-6 border border-gray-100 text-center">
                  <div className="mb-6 transform hover:scale-110 transition-transform duration-300">
                    <img
                      src={image}
                      alt="Generated emoji"
                      className="w-40 h-40 object-contain mx-auto rounded-2xl shadow-2xl"
                    />
                  </div>
                  {description && (
                    <p className="text-gray-600 text-lg italic leading-relaxed">
                      "{description}"
                    </p>
                  )}
                  <div className="mt-6 flex gap-3 justify-center">
                    <button className="px-6 py-2 bg-white/50 hover:bg-white/70 text-gray-800 rounded-xl transition-colors duration-300 border border-gray-200">
                      Download
                    </button>
                    <button className="px-6 py-2 bg-white/50 hover:bg-white/70 text-gray-800 rounded-xl transition-colors duration-300 border border-gray-200">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-100/80 backdrop-blur-xl border border-red-300/30 p-6 rounded-2xl transform animate-fade-in">
                <div className="flex items-center gap-3 text-red-600 font-semibold text-lg mb-2">
                  <span className="text-2xl">❌</span>
                  Something went wrong
                </div>
                <div className="text-red-500">{error}</div>
              </div>
            )}

            {loading && (
              <div className="bg-blue-100/80 backdrop-blur-xl border border-blue-300/30 p-6 rounded-2xl transform animate-fade-in">
                <div className="flex items-center gap-3 text-blue-600 font-semibold text-lg mb-2">
                  <div className="w-6 h-6 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
                  AI is working its magic
                </div>
                <div className="text-blue-500">Transforming your idea into a unique emoji...</div>
              </div>
            )}

            {!image && !error && !loading && (
              <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 text-center">
                <div className="text-6xl mb-4">🎭</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Ready to Create?</h3>
                <p className="text-gray-600 text-lg">
                  Your custom emoji will appear here once generated. Let your imagination run wild!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white/50 backdrop-blur rounded-2xl border border-gray-100">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="text-gray-800 font-semibold mb-2">Lightning Fast</h4>
            <p className="text-gray-600 text-sm">Generate unique emojis in seconds</p>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur rounded-2xl border border-gray-100">
            <div className="text-4xl mb-3">🎨</div>
            <h4 className="text-gray-800 font-semibold mb-2">Unlimited Creativity</h4>
            <p className="text-gray-600 text-sm">Any idea, any style, any emotion</p>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur rounded-2xl border border-gray-100">
            <div className="text-4xl mb-3">🌟</div>
            <h4 className="text-gray-800 font-semibold mb-2">High Quality</h4>
            <p className="text-gray-600 text-sm">Crisp, detailed, professional results</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}