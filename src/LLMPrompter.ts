import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyD-BUkut0_IhIXKQQkr3JSoU3ijNj_KHO8');

export class LLMPrompter {
  static createPrompt(length: number, width: number, height: number) {
    return `I want a 3D Model for a room of length ${length} meters, width ${width} meters and height ${height} meters. I would like you to return the 3D model as an ASCII STL file, so I can inspect it`;
  }

  static queryForSTL(prompt: string) {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    return model.generateContent(prompt);
  }
}

(window as any).LLMPrompter = LLMPrompter;
