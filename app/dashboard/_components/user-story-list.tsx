"use client"

import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import StoryItemCard from './story-item-card'
import CustomLoader from '@/app/create-story/_components/custom-loader'

type StoryItemType = {
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

const UserStoryList = () => {
    const [storyList, setStoryList] = useState<StoryItemType[]>([])
    const { user } = useUser()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        user && getUserStory()
    }, [user])

    const getUserStory = async () => {
        setLoading(true)
        const result: any = await db.select().from(StoryData)
            .where(eq(StoryData.userEmail, user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? ""))
            .orderBy(desc(StoryData?.id))
        console.log("Fetched stories:", result)
        setStoryList(result)
        setLoading(false)
    }

    return (
        <div className="min-h-screen px-6 py-10">
            <h1 className="text-3xl md:text-4xl text-purple-800 font-bold mb-10 text-center">
                Your Magical Story Collection ✨
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {storyList?.map((item: StoryItemType) => (
                    <StoryItemCard key={item.id} story={item} />
                ))}
                <CustomLoader isOpen={loading} />
            </div>
        </div>
    )
}

export default UserStoryList
