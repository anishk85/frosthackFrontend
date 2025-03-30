// lib/slices/chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  currentPaper: {
    pdfUrl: string | null;
    kValue: number;
    generateNew: boolean;
  };
}

const initialState: ChatState = {
  currentPaper: {
    pdfUrl: null,
    kValue: 15, // Default to 15 as per your API example
    generateNew: true // Start with true when opening chat
  }
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    startNewChat: (state, action: PayloadAction<{
      pdfUrl: string;
      kValue?: number;
      generateNew?: boolean;
    }>) => {
      state.currentPaper = {
        pdfUrl: action.payload.pdfUrl,
        kValue: action.payload.kValue ?? 15,
        generateNew: action.payload.generateNew ?? true
      };
    },
    updateKValue: (state, action: PayloadAction<number>) => {
      state.currentPaper.kValue = action.payload;
    },
    setGenerateNew: (state, action: PayloadAction<boolean>) => {
      state.currentPaper.generateNew = action.payload;
    },
    resetChat: (state) => {
      state.currentPaper = initialState.currentPaper;
    }
  }
});

export const { 
  startNewChat, 
  updateKValue, 
  setGenerateNew,
  resetChat
} = chatSlice.actions;

export const selectCurrentPaper = (state: { chat: ChatState }) => 
  state.chat.currentPaper;

export default chatSlice.reducer;