// components/summary-modal.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, ExternalLink } from "lucide-react";

interface SummaryModalProps {
  open: boolean;
  onClose: () => void;
  paper: {
    title: string;
    abstract: string;
    pdfUrl: string;
    summary?: string;
  };
}

export function SummaryModal({ open, onClose, paper }: SummaryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl line-clamp-2">{paper.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <a
              href={paper.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink className="mr-1" size={14} />
              View PDF
            </a>
          </div>

          {paper.summary ? (
            <div className="space-y-2">
              <h3 className="font-semibold">Summary</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {paper.summary}
              </p>
            </div>
          ) : null}

          <div className="space-y-2">
            <h3 className="font-semibold">Abstract</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {paper.abstract}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}