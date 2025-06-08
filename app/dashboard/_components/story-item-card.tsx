"use client"

import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"

type StoryItemType = {
  story: {
    id: number,
    storyType: string,
    ageGroup: string,
    coverImage: string,
    imageStyle: string,
    userEmail: string,
    userName: string,
    output: {
      title: string,
      coverImage: string
    },
    storyId: string,
    storySubject: string
  }
}

const StoryItemCard = ({ story }: StoryItemType) => {


  const router = useRouter()

  return (
    <Card
      onClick={() => router.push(`/view-story/${story?.storyId}`)}
      className="w-full max-w-sm gap-1 rounded-xl overflow-hidden shadow-xl  border border-purple-300 bg-gradient-to-r from-purple-200 to-purple-300 hover:shadow-purple-300 transition duration-300">
      <div className="overflow-hidden">
        <div className="overflow-hidden cursor-pointer">
          <Image
            onClick={() => router.push(`/view-story/${story?.storyId}`)}
            src={story?.coverImage}
            alt={story?.output?.title || "Story Cover"}
            width={500}
            height={300}
            className="w-full object-contain max-h-100 p-2 rounded-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      <CardContent className="p-6 space-y-3">
        <CardTitle className="text-2xl font-bold text-purple-800">
          {story?.output?.title}
        </CardTitle>
      </CardContent>


    </Card>
  )
}

export default StoryItemCard
