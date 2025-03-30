import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startNewChat,
  addMessage,
  clearChatMemory,
  updateKValue,
  toggleGenerateNew,
  selectCurrentChat,
  selectChatSettings,
} from "@/lib/slices/chatSlice";

interface UseChatOptions {
  paperId: string; // PDF URL
  initialContext: string;
}

export const useChat = ({ paperId, initialContext }: UseChatOptions) => {
  const dispatch = useDispatch();
  const messages = useSelector(selectCurrentChat);
  const { kValue, generateNew } = useSelector(selectChatSettings);

  useEffect(() => {
    dispatch(startNewChat({ paperId }));
    return () => {
      // Cleanup if needed
    };
  }, [paperId, dispatch]);

  const sendMessage = async (content: string) => {
    dispatch(
      addMessage({
        paperId,
        message: {
          role: "user",
          content,
        },
      })
    );

    try {
      const response = await fetch("http://192.168.193.251:5000/agent/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_query: content,
          k: kValue,
          generate_new: generateNew,
          pdf_url: paperId,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      dispatch(
        addMessage({
          paperId,
          message: {
            role: "assistant",
            content: data.response || "I couldn't process that request.",
          },
        })
      );
    } catch (error) {
      console.error("Error:", error);
      dispatch(
        addMessage({
          paperId,
          message: {
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again.",
          },
        })
      );
    }
  };

  const clearChat = () => {
    dispatch(clearChatMemory(paperId));
  };

  const setKValue = (k: number) => {
    dispatch(updateKValue(k));
  };

  const setGenerateNew = (enabled: boolean) => {
    dispatch(toggleGenerateNew(enabled));
  };

  return {
    messages,
    sendMessage,
    clearChat,
    kValue,
    setKValue,
    generateNew,
    setGenerateNew,
  };
};