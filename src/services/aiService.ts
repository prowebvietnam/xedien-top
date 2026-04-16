import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateEVInsight = async (vehicleName: string, specs: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Phân tích ưu nhược điểm của xe điện ${vehicleName} dựa trên thông số: ${JSON.stringify(specs)}. 
      Viết bằng tiếng Việt, phong cách chuyên nghiệp, khách quan, tối ưu SEO.`,
    });

    return response.text;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return null;
  }
};

export const suggestVehicle = async (budget: number, needs: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          text: `Gợi ý 3 mẫu xe điện tại Việt Nam cho người dùng có ngân sách khoảng ${budget} VNĐ và nhu cầu: ${needs}.
          Trả về dưới dạng JSON array với các trường: name, brand, reason, estimatedPrice.`
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              brand: { type: Type.STRING },
              reason: { type: Type.STRING },
              estimatedPrice: { type: Type.NUMBER }
            },
            required: ["name", "brand", "reason", "estimatedPrice"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("AI Suggestion Error:", error);
    return [];
  }
};
