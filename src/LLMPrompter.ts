import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyD-BUkut0_IhIXKQQkr3JSoU3ijNj_KHO8');

export class LLMPrompter {
  static createPrompt(length: number, width: number, height: number) {
    return `I want a 3D Model for a room of length ${length} meters, width ${width} meters and height ${height} meters. I would like you to return the 3D model as an ASCII STL file, so I can inspect it`;
  }

  static async prompt2STL(prompt: string) {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    console.log(result);
    const val = result.response.candidates[0].content.parts[0].text;
    console.log(val);
    return val;
  }
}

(window as any).LLMPrompter = LLMPrompter;
