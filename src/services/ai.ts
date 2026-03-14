import api from "./api";

export interface AiSuggestionData {
  warrantyDetails?: {
    name: string;
    serial_number: string;
  };
  claimPredictor: number;
  documentSuggestions: string[];
  rejectionReasons: string[];
}

export const getAiSuggestions = async (searchQuery: string): Promise<AiSuggestionData> => {
  const response = await api.post("/ai/suggestions", { searchQuery });
  return response.data.data;
};
