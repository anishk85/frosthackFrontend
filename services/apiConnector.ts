// services/apiConnector.ts
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // withCredentials: true,
});

export const apiConnector = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  bodyData?: any,
  headers?: any,
  params?: any
) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData,
      headers,
      params,
    });
    return response;
  } catch (error: any) {
    if (error.response) {
        console.error("API Error:", url, error.response?.data || error.message);
    //   console.error("API Error:", url, error.response.data);
      throw new Error(error.response.data.message || "API request failed");
    }
    throw error;
  }
};

// services/apiConnector.ts
export const fetchResearchPapers = async (query: string, max_papers: number) => {
  // const endpoint = "http://172.16.8.46:5000/agent/fetch_docs";
  const endpoint = "http://192.168.193.251:5000/agent/fetch_docs";

  

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, max_papers }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Research API Error:", error);
    throw new Error("Failed to fetch research papers.");
  }
};