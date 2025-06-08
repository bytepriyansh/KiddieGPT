"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 p-6">
            <div className="max-w-3xl w-full text-center space-y-8">

            
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800 bg-clip-text text-transparent animate-shimmer">
                    Oops! This Page Got Lost in a Storybook 📖✨
                </h1>

                <p className="text-purple-800 text-lg md:text-xl px-4 max-w-xl mx-auto">
                    It seems like this page wandered off into a fairy tale. Maybe a wizard turned it invisible or a dragon flew away with it! Don’t worry — we can guide you home. 🧙‍♂️🐉
                </p>

                <Link href="/" className="inline-block">
                    <button className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-purple-700 text-white rounded-xl shadow-md hover:bg-purple-800 hover:shadow-lg transition duration-300 text-lg font-medium">
                        <Sparkles className="h-5 w-5" />
                        Return to Home
                    </button>
                </Link>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: -700px 0;
          }
          100% {
            background-position: 700px 0;
          }
        }
        .animate-shimmer {
          background-size: 1400px 100%;
          animation: shimmer 4s linear infinite;
        }
      `}</style>
        </div>
    );
}
