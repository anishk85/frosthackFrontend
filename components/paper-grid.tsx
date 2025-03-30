// components/paper-grid.tsx
import { PaperCard } from "@/components/paper-card";
import { Paper } from "@/lib/slices/researchSlice";
import { Loader2 } from "lucide-react";

interface PaperGridProps {
  papers: Paper[];
  loading: boolean;
}

export function PaperGrid({ papers, loading }: PaperGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (papers.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {papers.map((paper, index) => (
        <PaperCard
          key={index}
          title={paper.title}
          abstract={paper.abstract}
          pdfUrl={paper.pdf_url}
          summary={paper.summary} 
        />
      ))}
    </div>
  );
}