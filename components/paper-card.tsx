// components/paper-card.tsx
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { FileText, ExternalLink, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PaperCardProps {
  title: string;
  abstract: string;
  pdfUrl: string;
  summary?: string; // Add summary prop
}

export function PaperCard({ title, abstract, pdfUrl, summary }: PaperCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card 
        className="overflow-hidden group hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
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
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                onClick={(e) => e.stopPropagation()} // Prevent modal from opening
              >
                <ExternalLink className="mr-1" size={14} />
                View PDF
              </a>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-4">
            {abstract}
          </p>
        </div>
      </Card>

      {/* Paper Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{title}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {summary && (
              <div>
                <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Summary</h4>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {summary}
                </p>
              </div>
            )}

            {/* <div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Abstract</h4>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {abstract}
              </p>
            </div> */}

            <div className="pt-4">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="mr-2" size={16} />
                View Full Paper
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}