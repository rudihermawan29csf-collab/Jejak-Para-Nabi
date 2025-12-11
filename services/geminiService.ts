import { GoogleGenAI, Modality } from "@google/genai";

const getClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
}

export const getGeminiHelp = async (
  prophetName: string,
  sceneContext: string,
  userQuestion: string
): Promise<string> => {
  const ai = getClient();

  try {
    const prompt = `
      Kamu adalah asisten bijak dalam game edukasi Islam bernama "Jejak Para Nabi".
      Karakter pemain bernama Aqil (seorang remaja).
      
      Konteks Saat Ini:
      Zaman: ${prophetName}
      Situasi: ${sceneContext}
      
      Pertanyaan Pemain: "${userQuestion}"
      
      Tugasmu:
      Jawablah dengan singkat (maksimal 3 kalimat), bijak, dan mendidik.
      Gunakan gaya bahasa seorang mentor yang lembut.
      Hubungkan jawaban dengan nilai Iman, Akhlak, atau Keberanian.
      Jangan berikan spoiler tentang apa yang akan terjadi selanjutnya di game, fokus pada hikmah saat ini.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Maaf, aku tidak bisa mendengar suaramu saat ini.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, koneksi ke pusat hikmah terganggu.";
  }
};

export const generateClaymationImage = async (description: string): Promise<string | null> => {
  const ai = getClient();
  
  try {
    // Using gemini-2.5-flash-image for image generation as per instructions for general tasks
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { 
            text: `Create a Claymation style image. Stop motion animation style, plasticine texture, handmade look, soft cinematic lighting, miniature diorama feel. 
            
            IMPORTANT RELIGIOUS GUIDELINE: If the scene description mentions 'Prophet', 'Nabi', or 'Muhammad', NEVER depict him as a human person with a face or body. Instead, visualize him as a glowing, radiant golden light or aura (sosok cahaya) to respect Islamic aniconism.
            
            Scene: ${description}` 
          }
        ]
      },
      // Note: responseMimeType is not supported for this model family
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};

export const generateSpeech = async (text: string): Promise<ArrayBuffer | null> => {
  const ai = getClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Puck' }, // Puck for a clear narrator voice
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    }
    return null;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};