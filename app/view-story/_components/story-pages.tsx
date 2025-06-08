import { useState, useEffect } from "react";
import { IoMdPlayCircle } from "react-icons/io";

const StoryPages = ({ storyChapters }: any) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const playSpeech = (text: string) => {
        if (!text) return;

        const synth = window.speechSynthesis;

        if (synth.speaking) {
            synth.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        synth.speak(utterance);
    };

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    return (
        <div className="h-full flex flex-col justify-start">
            <h2 className="flex items-center text-3xl font-bold mb-4 text-purple-800">
                <span>
                 {storyChapters?.chapterTitle}
                </span>
                <IoMdPlayCircle
                    onClick={() => !isSpeaking && playSpeech(storyChapters?.chapterText)}
                    className={`ml-3 cursor-pointer transition-colors duration-200 ${isSpeaking ? "text-purple-400" : "text-purple-600 hover:text-purple-800"
                        }`}
                    size={35}
                    aria-label="Play chapter"
                    role="button"
                    title={isSpeaking ? "Speaking..." : "Play chapter"}
                />
            </h2>
            <p className="text-lg mt-15 text-gray-800 bg-slate-100 rounded-lg p-6 shadow-inner leading-relaxed tracking-wide">
                {storyChapters?.chapterText}
            </p>
        </div>
    );
};

export default StoryPages;
