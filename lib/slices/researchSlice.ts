import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchResearchPapers } from "@/services/apiConnector";
import { toast } from "react-hot-toast";

// Async thunk to fetch research papers
export const getResearchPapers = createAsyncThunk(
  "research/fetchPapers",
  async ({ query, max_papers }: { query: string; max_papers: number }, { rejectWithValue }) => {
    try {
      const papers = await fetchResearchPapers(query, max_papers);
      toast.success(`Found ${papers.length} research papers`);
      
      return {papers}; 
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Research slice
const researchSlice = createSlice({
  name: "research",
  initialState: {
    papers: [],
    loading: false,
    error: null,
    query: "",
    count: 2,
    lastFetched: 0, // Default as number
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    clearResults: (state) => {
      state.papers = [];
      state.query = "";
      state.error = null;
      state.lastFetched = 0; // Reset timestamp
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResearchPapers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResearchPapers.fulfilled, (state, action) => {
        state.loading = false;
        state.papers = action.payload.papers;
        // state.lastFetched = action.payload.lastFetched; // Store numeric timestamp
      })
      .addCase(getResearchPapers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQuery, setCount, clearResults } = researchSlice.actions;
export const selectResearch = (state: { research: any }) => state.research;
export default researchSlice.reducer;
