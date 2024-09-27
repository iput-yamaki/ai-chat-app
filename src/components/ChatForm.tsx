// ChatForm.tsx
"use client";
import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ChatMessage from './ChatMessage';

const API_URL = "https://api.openai.com/v1/completions";
// ChatForm.tsx
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

interface ChatFormProps {
  chatId?: string;
}

const ChatForm = ({ chatId }: ChatFormProps) => {
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const conversationSchema = z.object({
    prompt: z.string().min(1, { message: "一文字以上入力してください。" })
  });

  const form = useForm<z.infer<typeof conversationSchema>>({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(conversationSchema),
  });

  const fetchResponseFromOpenAI = async (prompt: string) => {
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.response;
      } else {
        return data.message || '応答を取得できませんでした。';
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      return 'エラーが発生しました。';
    }
  };
  

  const onSubmit = async (values: z.infer<typeof conversationSchema>) => {
    setChatHistory((prev) => [...prev, `You: ${values.prompt}`]);
    const response = await fetchResponseFromOpenAI(values.prompt);
    setChatHistory((prev) => [...prev, `Bot: ${response}`]);
    form.reset();
  };

  return (
    <div className="bg-white p-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormControl>
                    <Textarea {...field} className="bg-slate-200" rows={1} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" variant={"ghost"}>
              <Send />
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-4">
        {chatHistory.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
    </div>
  );
};

export default ChatForm;
