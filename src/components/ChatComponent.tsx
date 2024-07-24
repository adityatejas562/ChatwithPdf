// components/ChatComponent.tsx
"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat, useCompletion } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId
    },
    initialMessages: data || [],
  });

  const {
    completion,
    input: completionInput,
    stop,
    isLoading: isCompletionLoading,
    handleInputChange: handleCompletionInputChange,
    handleSubmit: handleCompletionSubmit
  } = useCompletion({
    api:'/api/chat'
  });

  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      className="relative max-h-screen overflow-scroll"
      id="message-container"
    >
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>

      {/* message list */}
      <MessageList messages={messages} isLoading={isLoading} />

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white"
      >
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full"
          />
          <Button className="bg-blue-600 ml-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <div className="mt-4">
        <form onSubmit={handleCompletionSubmit} className="flex items-center gap-3 mb-8">
          <label className="grow">
            <input
              className="w-full max-w-md bottom-0 border border-gray-300 rounded shadow-xl p-2"
              value={completionInput}
              onChange={handleCompletionInputChange}
              placeholder="Ask anything..."
            />
          </label>
          <button type="button" onClick={stop}>
            Stop
          </button>
          <button disabled={isCompletionLoading} type="submit">
            Send
          </button>
        </form>
        <output>Completion result: {completion}</output>
      </div>
    </div>
  );
};

export default ChatComponent;
