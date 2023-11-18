import OpenAI from "openai";
import { ChatCompletion } from "openai/resources/index.mjs";

export class OpenAIHelper {
    private openai: OpenAI;

    constructor(private _openai?: OpenAI) {
        if (_openai) {
            this.openai = _openai;
        } else {
            this.openai = this.createOpenAIInstance();
        }
    }

    private createOpenAIInstance = () => {
        return new OpenAI({
            apiKey: import.meta.env.VITE_OPEN_AI_KEY,
            dangerouslyAllowBrowser: true,
        });
    };

    public askChatGPTAboutImage = async ({
        base64Image,
        maxTokens = 350,
        prompt,
    }: {
        base64Image: string;
        prompt: string;
        maxTokens?: number;
    }) => {
        return await this.openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            max_tokens: maxTokens,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: prompt,
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: base64Image,
                            },
                        },
                    ],
                },
            ],
        });
    };

    public getResponseJSONString = (response: ChatCompletion) => {
        return response.choices[0].message.content;
    };

    private cleanChatGPTJSONString = (jsonString: string) => {
        return jsonString.replace("```json", "").replace("```", "");
    };

    public parseChatGPTJSONString = <Response>(
        jsonString?: string | null
    ): Response | undefined => {
        if (!jsonString) {
            return;
        }
        const content = this.cleanChatGPTJSONString(jsonString);
        if (content) {
            try {
                const parsed = JSON.parse(content);
                return parsed;
            } catch (e) {
                console.error("Failing parsing Chat GPT response:", e);
            }
        }
        return;
    };
}
