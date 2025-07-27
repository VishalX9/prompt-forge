"use client";

import * as z from "zod";
import { MessageSquare, User, Bot, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/components/heading";
import { formSchema } from "./constants";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; 


interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const ConversationPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const router = useRouter();
  
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: values.prompt,
        role: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);

      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: values.prompt,
          history: messages,
        }),
      });

      if (!response.ok) {
      
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content || data.message || 'No response received',
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      form.reset();
      router.refresh();

    } catch (error: any) {
      console.error('Error:', error);

 
    

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, something went wrong. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {!hasMessages && (
        <div className="px-4 lg:px-10 py-8">
          <Heading
            title="Conversation"
            description="Our most advanced conversation model."
            icon={<MessageSquare className="w-7 h-7" />}
            iconColor="text-violet-600"
            bgColor="bg-gradient-to-br from-violet-50 to-purple-50"
          />
        </div>
      )}

      <div className="px-4 lg:px-10 pb-6">
        {!hasMessages ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-violet-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Start a conversation</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Ask me anything! I'm here to help with questions, creative tasks, analysis, and more.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-violet-300 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 mb-2">💡 Creative Writing</h3>
                <p className="text-sm text-gray-600">Help me write a story, poem, or creative content</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-violet-300 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 mb-2">🔍 Analysis & Research</h3>
                <p className="text-sm text-gray-600">Analyze data, research topics, or solve problems</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-violet-300 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 mb-2">💻 Code & Tech</h3>
                <p className="text-sm text-gray-600">Write code, debug, or explain technical concepts</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-violet-300 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 mb-2">📚 Learning & Education</h3>
                <p className="text-sm text-gray-600">Explain concepts, help with homework, or teach new skills</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-violet-100 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Conversation</h1>
                  <p className="text-sm text-gray-600">{messages.length} messages</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-violet-600" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-violet-600 text-white rounded-br-md'
                        : 'bg-white text-gray-900 border border-gray-200 shadow-sm rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-violet-200' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={`${hasMessages ? 'mt-8 max-w-4xl mx-auto' : 'max-w-2xl mx-auto'}`}>
          <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-3 items-end"
              >
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          className="bg-gray-50 text-gray-900 border border-gray-300 focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:border-violet-500 h-12 text-base placeholder:text-gray-500 rounded-xl transition-all duration-200 resize-none"
                          disabled={isLoading}
                          placeholder={hasMessages ? "Continue the conversation..." : "How do I calculate the radius of a circle?"}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  className="h-12 px-6 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-violet-500/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
