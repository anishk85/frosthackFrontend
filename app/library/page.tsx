// app/library/page.tsx
"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResearchPapers, selectResearch } from "@/lib/slices/researchSlice";
import { AppSidebar } from "@/components/app-sidebar";
import { PaperGrid } from "@/components/paper-grid";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Loader2 } from "lucide-react";

export default function LibraryPage() {
  const dispatch = useDispatch();
  const { papers, loading } = useSelector(selectResearch);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(getResearchPapers({ query: searchQuery, k: 2 }));
    }
  };

  return (
    <div className="flex h-screen">
      <AppSidebar />
      <SidebarInset>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Research Library
              </h1>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                <span>Filters</span>
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search papers by title, author, or keywords..."
                className="pl-10 py-6 bg-white dark:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              {loading && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin" size={18} />
              )}
            </div>

            <PaperGrid papers={papers} loading={loading} />
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}