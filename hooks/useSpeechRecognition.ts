// hooks/useSpeechRecognition.ts
import { useState, useEffect, useCallback } from "react";

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const recognition = typeof window !== "undefined" && 
    "webkitSpeechRecognition" in window 
    ? new window.webkitSpeechRecognition() 
    : null;

  const startListening = useCallback(() => {
    if (!recognition) {
      setError("Speech recognition not supported in your browser");
      return;
    }

    try {
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };
      
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
      };

      recognition.onerror = (event) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setError(`Error starting speech recognition: ${err}`);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
    }
  }, [recognition, isListening]);

  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  return { 
    text, 
    isListening, 
    error,
    startListening, 
    stopListening,
    hasRecognitionSupport: !!recognition
  };
};

export default useSpeechRecognition;