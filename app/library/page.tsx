// app/library/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResearchPapers, selectResearch } from "@/lib/slices/researchSlice";
import { AppSidebar } from "@/components/app-sidebar";
import { PaperGrid } from "@/components/paper-grid";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Loader2 } from "lucide-react";
import { selectCurrentToken } from "@/lib/slices/authSlice";
import { useRouter } from "next/navigation";

export default function LibraryPage() {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { papers, loading } = useSelector(selectResearch);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPapers, setMaxPapers] = useState(5); // Default value
  const [error, setError] = useState("");
  const token = useSelector(selectCurrentToken);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query");
      return;
    }

    if (maxPapers > 10) {
      setError("Maximum papers cannot exceed 10");
      return;
    }

    setError("");
    dispatch(getResearchPapers({ query: searchQuery, max_papers: maxPapers }));
  };

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined" && !token) {
      console.log("No token found, redirecting to /login");
      router.replace("/login");
    }
  }, [token, router]);

  if (!isClient) return null;

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search papers by title, author, or keywords..."
                  className="pl-10 py-6 bg-white dark:bg-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>

              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={maxPapers}
                  onChange={(e) => setMaxPapers(Math.min(10, parseInt(e.target.value) || 1))}
                  className="py-6 bg-white dark:bg-gray-800"
                  placeholder="Max papers (1-10)"
                />
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="py-6"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <PaperGrid papers={papers} loading={loading} />
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}