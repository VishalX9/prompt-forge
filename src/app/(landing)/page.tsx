import Link from "next/link";
import { Sparkles, Code, MessageCircle, Image, Zap, ArrowRight, CheckCircle } from "lucide-react";

const LandingPage = () => {
    const features = [
        {
            icon: Image,
            title: "Image Generation",
            description: "Transform your ideas into stunning visuals with AI-powered image creation",
            gradient: "from-slate-500 to-sky-700"
        },
        {
            icon: Code,
            title: "Code Generation",
            description: "Generate clean, efficient code in any programming language instantly",
            gradient: "from-gray-600 to-cyan-600"
        },
        {
            icon: MessageCircle,
            title: "Smart Conversation",
            description: "Engage in intelligent conversations with context-aware AI assistance",
            gradient: "from-slate-400 to-sky-600"
        },
        {
            icon: Zap,
            title: "Advanced AI Tools",
            description: "Access cutting-edge AI capabilities for complex problem-solving",
            gradient: "from-gray-700 to-cyan-700"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">

            <section className="px-6 pt-20 pb-20 text-center">
                <div className="max-w-4xl mx-auto">
                    <img 
                        src="/logo.png" 
                        alt="Prompt Forge Logo" 
                        className="mx-auto mb-8 w-40 h-40 object-contain"
                    />
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-sky-800 to-cyan-700 bg-clip-text text-transparent leading-tight">
                        Forge the Future with AI
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Unleash your creativity with our powerful AI toolkit. Generate images, write code, have conversations, and solve complex problems—all in one place.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/sign-up">
                            <button className="px-8 py-4 bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-xl hover:from-sky-700 hover:to-cyan-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-xl flex items-center space-x-2">
                                <span>Start Creating</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                        <Link href="/sign-in">
                            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all font-semibold text-lg">
                                Login to Continue
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="px-6 py-20 bg-white/50">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-4xl font-bold text-center mb-16 text-gray-900">
                        Everything You Need to Create
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h4>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-12 text-gray-900">Why Choose Prompt Forge?</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Lightning Fast", description: "Get results in seconds, not hours" },
                            { title: "Professional Quality", description: "Enterprise-grade AI for exceptional output" },
                            { title: "All-in-One Platform", description: "Everything you need in a single interface" }
                        ].map((benefit, index) => (
                            <div key={index} className="flex flex-col items-center p-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-sky-600 to-cyan-600 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2 text-gray-900">{benefit.title}</h4>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-20 bg-gradient-to-r from-gray-900 to-sky-900">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Ideas?</h3>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of creators, developers, and innovators using Prompt Forge
                    </p>
                    <Link href="/sign-up">
                        <button className="px-10 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold text-lg shadow-xl">
                            Get Started for Free
                        </button>
                    </Link>
                </div>
            </section>

            <footer className="px-6 py-12 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-sky-600 to-cyan-600 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold">Prompt Forge</h1>
                    </div>
                    <p className="text-gray-400">Empowering creativity through artificial intelligence</p>
                    <p className="text-white" > Created By-Vishal Jaiswal</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;