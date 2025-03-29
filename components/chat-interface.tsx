// components/chat-interface.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Mic, Send, Volume2, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  timestamp: Date;
};

type Citation = {
  id: number;
  title: string;
  authors: string[];
  year: string;
  journal?: string;
  quote?: string;
  url?: string;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your research assistant. Ask me anything about academic papers in the library.",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setInput("");

    setTimeout(() => {
      const newAiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content:
          "Based on recent research, transformer models have shown significant improvements in genomic sequence analysis.",
        citations: [
          {
            id: 1,
            title: "Transformers in Genomics: Novel Attention Mechanisms for DNA Sequence Analysis",
            authors: ["Zhang, L.", "Johnson, K.", "Patel, S."],
            year: "2023",
            journal: "Nature Biotechnology",
            quote:
              "Our attention mechanism demonstrated a 27% improvement in prediction accuracy.",
          },
        ],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newAiMessage]);
    }, 1500);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!mounted) {
    return (
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
        {/* Loading skeleton */}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-4 border-b bg-white dark:bg-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Research Assistant</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2">
            <Switch 
              id="simple-mode" 
              checked={isSimpleMode} 
              onCheckedChange={setIsSimpleMode} 
            />
            <Label htmlFor="simple-mode">Explain Simply</Label>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            isSimpleMode={isSimpleMode} 
          />
        ))}
      </div>

      <div className="p-4 border-t bg-white dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleRecording}
            className={isRecording ? "text-red-500 border-red-500" : ""}
          >
            <Mic size={18} />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about research papers..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!input.trim()}>
            <Send size={18} className="mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ 
  message, 
  isSimpleMode 
}: { 
  message: Message; 
  isSimpleMode: boolean 
}) {
  return (
    <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-3xl ${
          message.role === "user"
            ? "bg-blue-600 text-white rounded-t-lg rounded-bl-lg"
            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-t-lg rounded-br-lg shadow-sm"
        } p-4`}
      >
        {message.role === "assistant" && (
          <div className="flex items-center mb-2">
            <Avatar className="h-6 w-6 mr-2">
              <div className="bg-blue-600 text-white w-full h-full flex items-center justify-center text-xs font-bold">
                AI
              </div>
            </Avatar>
            <span className="text-sm font-medium">Research Assistant</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              {format(message.timestamp, "hh:mm a")}
            </span>
          </div>
        )}

        <div className="text-sm">
          {isSimpleMode && message.role === "assistant"
            ? simplifyText(message.content)
            : message.content
          }
        </div>

        {message.citations && (
          <CitationsSection citations={message.citations} />
        )}
      </div>
    </div>
  );
}

function CitationsSection({ citations }: { citations: Citation[] }) {
  return (
    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400">CITATIONS</h4>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Volume2 size={14} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Read aloud</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {citations.map((citation, index) => (
        <CitationCard key={citation.id} citation={citation} index={index + 1} />
      ))}
    </div>
  );
}

function CitationCard({ citation, index }: { citation: Citation; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="mb-2 overflow-hidden">
      <CardContent className="p-3">
        <div className="flex justify-between">
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="h-5 min-w-5 flex items-center justify-center rounded-full p-0 text-xs">
              {index}
            </Badge>
            <div>
              <h4 className="text-sm font-medium">{citation.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {citation.authors.join(", ")} • {citation.year} • {citation.journal}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-2" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>
        </div>

        {expanded && (
          <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
            <blockquote className="text-xs italic border-l-2 border-gray-300 dark:border-gray-600 pl-2 my-1 text-gray-600 dark:text-gray-300">
              "{citation.quote}"
            </blockquote>
            <div className="flex justify-end mt-1">
              <Button variant="link" size="sm" className="h-6 p-0 text-xs">
                <ExternalLink size={12} className="mr-1" />
                View Paper
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function simplifyText(text: string): string {
  // Simple text simplification logic
  return text
    .replace("significant improvements", "big improvements")
    .replace("leverage attention mechanisms", "use special techniques")
    .replace("long-range dependencies", "connections across long distances");
}