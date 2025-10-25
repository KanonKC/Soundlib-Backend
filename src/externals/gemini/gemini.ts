import { GoogleGenAI, Modality } from '@google/genai';
import * as fs from 'node:fs';

async function main() {
    const ai = new GoogleGenAI({
        apiKey: "AIzaSyB4VvhXuXcEs1r4fh8GcsPsDxzvd0e4YpU"
    });

    const prompt = 'Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme';

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: prompt,
    });
    for (const part of response?.candidates?.[0]?.content?.parts ?? []) {
        if (part.text) {
            console.log(part.text);
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            if (imageData) {
                const buffer = Buffer.from(imageData, 'base64');
                fs.writeFileSync('gemini-native-image.png', buffer);
                console.log('Image saved as gemini-native-image.png');
            }
        }
    }
}

main();
