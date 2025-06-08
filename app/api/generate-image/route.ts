import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { prompt } = data;

    try {
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN!,
        });

        const prediction = await replicate.predictions.create({
            model: "black-forest-labs/flux-schnell",
            input: {
                prompt: prompt,
                output_format: "png",
                output_quality: 80,
                aspect_ratio: "1:1"
            }
        });

        while (
            prediction.status !== "succeeded" &&
            prediction.status !== "failed" &&
            prediction.status !== "canceled"
        ) {
            await new Promise((r) => setTimeout(r, 1000));
            const newPrediction = await replicate.predictions.get(prediction.id);
            prediction.status = newPrediction.status;
            prediction.output = newPrediction.output;
        }

        if (prediction.status === "succeeded" && Array.isArray(prediction.output)) {
            return NextResponse.json({
                success: true,
                imageUrl: prediction.output[0],
            });
        } else {
            throw new Error("No valid image URL from Replicate");
        }
    } catch (err) {
        console.error("❌ Error in Replicate image generation:", err);
        return NextResponse.json(
            { success: false, error: "Failed to generate image" },
            { status: 500 }
        );
    }
}
