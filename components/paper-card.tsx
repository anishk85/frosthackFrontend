// components/paper-card.tsx
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FileText, ExternalLink, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatModal } from "@/components/chat-modal";
import { SummaryModal } from "@/components/summary-modal";
import { useDispatch } from "react-redux";
import { startNewChat } from "@/lib/slices/chatSlice";

interface PaperCardProps {
  title: string;
  abstract: string;
  pdfUrl: string;
  summary?: string;
}

export function PaperCard({ title, abstract, pdfUrl, summary }: PaperCardProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCardClick = () => {
    setSummaryOpen(true);
  };

  const handleChatOpen = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    dispatch(startNewChat({ 
      pdfUrl,
      kValue: 15,
      generateNew: true
    }));
    setChatOpen(true);
  };

  const handleChatClose = () => {
    setChatOpen(false);
  };

  const handleSummaryClose = () => {
    setSummaryOpen(false);
  };

  return (
    <>
      <Card 
        className="overflow-hidden group hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-start mb-4">
            <div className="mr-4 p-2 bg-gray-100 dark:bg-gray-700 rounded">
              <FileText className="text-gray-600 dark:text-gray-300" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2">
                {title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="mr-1" size={14} />
                  View PDF
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm h-8"
                  onClick={handleChatOpen}
                >
                  <MessageSquare className="mr-1" size={14} />
                  Chat with AI
                </Button>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-4">
            {abstract}
          </p>
        </div>
      </Card>

      <SummaryModal
        open={summaryOpen}
        onClose={handleSummaryClose}
        paper={{ title, pdfUrl, abstract, summary }}
      />

      <ChatModal
        open={chatOpen}
        onClose={handleChatClose}
        paper={{ title, pdfUrl, abstract }}
      />
    </>
  );
}