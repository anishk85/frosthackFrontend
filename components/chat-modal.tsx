"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Send, Mic, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPaper, updateKValue, setGenerateNew } from "@/lib/slices/chatSlice";
import { format } from "date-fns";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  paper: {
    title: string;
    pdfUrl: string;
    abstract: string;
  };
}

export function ChatModal({ open, onClose, paper }: ChatModalProps) {
  const dispatch = useDispatch();
  const { kValue, generateNew } = useSelector(selectCurrentPaper);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Speech recognition hook
  const {
    text,
    isListening,
    error,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  // Update input when speech is recognized
  useEffect(() => {
    if (text) {
      setInput(text);
    }
  }, [text]);

  // Show error toast if speech recognition fails
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Speech Recognition Error",
        description: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (open) {
      // Reset messages when opening modal
      setMessages([
        {
          id: generateId(),
          role: "assistant",
          content: `Hello! Ask me anything about "${paper.title}"`,
          timestamp: new Date(),
        },
      ]);
      // Set generateNew to true when opening
      dispatch(setGenerateNew(true));
    } else {
      // Set generateNew to false when closing
      dispatch(setGenerateNew(false));
    }
  }, [open, dispatch, paper.title]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const agentChatUrl = process.env.NEXT_PUBLIC_AGENT_CHAT_URL;
      const response = await fetch(agentChatUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_query: input,
          k: kValue,
          generate_new: generateNew,
          pdf_url: paper.pdfUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from the server.");
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: data.response || "I couldn't process that request.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch response. Please try again.",
      });
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const parseContent = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*)/g); // Split by bold markers
    return parts.map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={index}>{part.slice(2, -2)}</strong>
      ) : (
        part
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Chat about: {paper.title}</span>
            <div className="flex items-center gap-2">
              <select
                value={kValue}
                onChange={(e) => dispatch(updateKValue(Number(e.target.value)))}
                className="bg-background border rounded px-2 py-1 text-sm"
              >
                {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => (
                  <option key={num} value={num}>
                    k={num}
                  </option>
                ))}
              </select>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 p-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.role === "assistant" && (
                    <Avatar className="h-6 w-6">
                      <div className="bg-blue-600 text-white w-full h-full flex items-center justify-center text-xs">
                        AI
                      </div>
                    </Avatar>
                  )}
                  <span className="text-sm font-medium">
                    {message.role === "user" ? "You" : "AI Assistant"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {format(message.timestamp, "hh:mm a")}
                  </span>
                </div>
                <p className="text-sm">{parseContent(message.content)}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <div className="bg-blue-600 text-white w-full h-full flex items-center justify-center text-xs">
                      AI
                    </div>
                  </Avatar>
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-2 border-t">
          <div className="flex gap-2">
            {hasRecognitionSupport && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleListening}
                      className={
                        isListening
                          ? "text-red-500 border-red-500 animate-pulse"
                          : ""
                      }
                      disabled={isLoading}
                    >
                      {isListening ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <Mic size={18} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isListening ? "Stop recording" : "Start recording"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask about ${paper.title}...`}
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin mr-2" size={18} />
              ) : (
                <Send size={18} className="mr-2" />
              )}
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}