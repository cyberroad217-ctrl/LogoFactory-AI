
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Category } from "../types";

// Always use a named parameter and obtain the API key exclusively from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 1. Core Metadata Factory
export const generateBundleMetadata = async (category: Category) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a professional marketplace bundle metadata for an AI-generated logo collection in the ${category} industry. Include a pricing strategy between $29-$199.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          price: { type: Type.NUMBER },
          seoTags: { type: Type.ARRAY, items: { type: Type.STRING } },
          brandVoiceScript: { type: Type.STRING },
          blogArticle: { type: Type.STRING }
        },
        required: ["title", "description", "price", "seoTags", "brandVoiceScript", "blogArticle"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

// 2. Brand Voice Synthesizer (TTS)
export const generateBrandVoiceAudio = async (text: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Say with a high-end professional brand tone: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

// 3. Motion Studio Prompt Engine
export const generateAnimationPrompt = async (logoDescription: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a cinematic, hyper-realistic video generation prompt for an intro animation of a logo described as: ${logoDescription}. Focus on motion graphics, light rays, and professional SFX textures.`,
  });
  return response.text;
};

// 4. Legal-Check Trademark Analysis
export const analyzeTrademarkSafety = async (category: string, title: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Verify the trademark safety for a new brand named "${title}" in the ${category} sector. Perform a simulated search for naming conflicts or visual identity overlaps in current news and business directories.`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  return {
    report: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

// 5. Ad-Tech Campaign Generator
export const generateAdCampaign = async (bundleTitle: string, category: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create an aggressive, high-converting social media ad campaign for a logo bundle called "${bundleTitle}". Target industry: ${category}. Use psychological triggers for branding urgency.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING },
          hook: { type: Type.STRING },
          cta: { type: Type.STRING },
          platform: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

// 6. Local Brand Research
export const researchLocalCompetitors = async (category: string, lat: number, lng: number) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite-latest",
    contents: `Research local ${category} branding trends and existing competitor saturation in this geolocation to identify whitespace for new logo packages.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: { latitude: lat, longitude: lng }
        }
      }
    },
  });
  return {
    analysis: response.text,
    places: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

// --- NEW FUNCTIONS (7-12) ---

// 7. Social Content Calendar Agent
export const generateSocialCalendar = async (brandName: string, category: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a 7-day social media content calendar for a brand named "${brandName}" in the ${category} industry.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.STRING },
            platform: { type: Type.STRING },
            content: { type: Type.STRING },
            visualHook: { type: Type.STRING }
          }
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};

// 8. Domain Scout Agent
export const brainstormDomainNames = async (brandName: string, category: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest 5 modern domain name options for "${brandName}" in ${category}. Predict availability and provide SEO reasoning.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            domain: { type: Type.STRING },
            availabilitySim: { type: Type.STRING },
            reasoning: { type: Type.STRING }
          }
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};

// 9. Audience Persona Auditor
export const brandPersonaAudit = async (brandDescription: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the ideal audience persona for this brand: ${brandDescription}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          demographic: { type: Type.STRING },
          psychographic: { type: Type.STRING },
          painPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
          brandingHook: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

// 10. Pitch Deck Narrative Agent
export const generatePitchDeckOutline = async (brandName: string, mission: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a 10-slide high-level pitch deck narrative for a brand named "${brandName}" with mission: "${mission}".`,
  });
  return response.text;
};

// 11. Marketing Newsletter Engine
export const generateNewsletterDraft = async (bundleTitle: string, newFeatures: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write an engaging email newsletter announcing the "${bundleTitle}" with these new features: ${newFeatures}.`,
  });
  return response.text;
};

// 12. Color Strategy remixer
export const generateColorRemixStrategy = async (currentCategory: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest 3 trending color palettes and geometric remix strategies for the ${currentCategory} industry in 2024.`,
  });
  return response.text;
};

// --- SIMULATED AGI LIVE GENERATION ---
export const generateLiveLogoThinking = async (agentName: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are AGI Agent ${agentName}. Briefly describe one unique logo concept you are generating right now for the global gallery. Keep it under 15 words.`,
  });
  return response.text;
}

// Standard PCM/Base64 decoding helpers for TTS responses
export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
