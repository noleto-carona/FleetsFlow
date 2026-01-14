
import { GoogleGenAI } from "@google/genai";
import { SearchResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getVesselIntel = async (query: string): Promise<SearchResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a brief operational summary and status report for the vessel named "${query}". If it's a real ship, provide current known specs. If it sounds like a fictitious name, generate a realistic maritime intelligence report. Keep it professional and concise.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No intelligence data available for this vessel.";
    const links = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as any[]) || [];

    return { text, links };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { 
      text: "Error connecting to fleet intelligence network.", 
      links: [] 
    };
  }
};
