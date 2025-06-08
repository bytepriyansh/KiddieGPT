"use client"

import { Button } from '@/components/ui/button'
import AgeGroup from './_components/age-group'
import ImageStyle from './_components/image-style'
import StorySubjectInput from './_components/story-subject-input'
import StoryType from './_components/story-type'
import { useContext, useEffect, useState } from 'react'
import { generateKidsStoryAI } from '@/config/gemini-config'
import { toast } from 'react-toastify'
import { db } from '@/config/db'
import { StoryData, Users } from '@/config/schema'
import axios from "axios"
import { v4 as uuidv4 } from 'uuid'
import CustomLoader from './_components/custom-loader'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from '@/context/UserDetailContext'
import { eq } from 'drizzle-orm'

export interface fieldData {
  fieldName: string,
  fieldValue: string
}

export interface formDataType {
  storySubject: string,
  storyType: string,
  ageGroup: string,
  imageStyle: string
}

const CreateStory = () => {
  const [formData, setFormData] = useState<formDataType>({
    storySubject: '',
    storyType: '',
    ageGroup: '',
    imageStyle: ''
  })

  const { userDetail, setUserDetail } = useContext(UserDetailContext)

  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null)
  const router = useRouter()

  const onHandleUserSelection = (data: fieldData) => {
    setFormData(prev => ({
      ...prev,
      [data.fieldName]: data.fieldValue
    }))
  }

  useEffect(() => {
    console.log('Updated formData:', formData)
  }, [formData])

  const saveToDatabaseTheGeneratedStory = async (output: string, imageUrl: string) => {
    const recordId = uuidv4()
    setLoading(true)
    try {
      const result = await db.insert(StoryData).values({
        storyId: recordId,
        ageGroup: formData.ageGroup,
        storySubject: formData.storySubject,
        storyType: formData.storyType,
        imageStyle: formData.imageStyle,
        output: output,
        coverImage: imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        userImage: user?.imageUrl
      }).returning({ storyId: StoryData.storyId })

      setLoading(false)
      return result
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Error in saving to db")
      throw error
    }
  }

  const generateStoryFromAI = async () => {

    if (userDetail.credits <= 0) {
      toast.error("You don't have enough credits")
      return
    }

    if (!formData.ageGroup || !formData.storyType || !formData.storySubject || !formData.imageStyle) {
      toast.error("Please fill all fields before generating a story")
      return
    }

    setLoading(true)

    const CREATE_STORY_PROMPT = `
Create a 5-chapter kids story for children aged {ageGroup}.
The story should be {storyType}.
The main character is a {storySubject}.
The language should be simple and child-friendly.

Include:
- A creative story title
- 5 chapters with little descriptive and long story, fun story text
- A {imageStyle}-style image prompt for each chapter
- A cover image prompt in {imageStyle} style with the story title

Format everything in clean JSON with keys: title, coverImage, chapters.`

    const FINAL_PROMPT = CREATE_STORY_PROMPT
      .replace("{ageGroup}", formData.ageGroup)
      .replace("{storyType}", formData.storyType)
      .replace("{storySubject}", formData.storySubject)
      .replace(/{imageStyle}/g, formData.imageStyle)

    try {
      const story = await generateKidsStoryAI(FINAL_PROMPT)
      const parsedStory = typeof story === 'string' ? JSON.parse(story) : story

      const imagePrompt = `${parsedStory.coverImage} in ${formData.imageStyle} style. Text: "${parsedStory.title}" in bold, centered at the top like a storybook cover. Clean background, well-lit, high-quality illustration.`

      const imageResp = await axios.post("/api/generate-image", { prompt: imagePrompt })

      if (!imageResp.data.success || !imageResp.data.imageUrl) {
        throw new Error(imageResp.data.error || "Image generation failed")
      }

      const AIimageUrl = imageResp.data.imageUrl
      console.log("Generated Image URL:", AIimageUrl)

      setCoverImageUrl(AIimageUrl)

      const imageResult = await axios.post("/api/save-image", {
        url: AIimageUrl
      })

      const firebaseStorageImageurl = imageResult.data.imageUrl

      // SAVE TO DATABASE
      const result = await saveToDatabaseTheGeneratedStory(JSON.stringify(parsedStory), firebaseStorageImageurl)


      toast.success("🦄 Story Generated Successfully!", {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      })

      await updateUserCredits()
      router.replace(`/view-story/${result[0]?.storyId}`)
    } catch (error) {
      console.error(error)
      toast.error("Failed to generate story or image")
    } finally {
      setLoading(false)
    }
  }

  // NOTE: THE CREDIT THING 

  const updateUserCredits = async () => {
    const result = await db.update(Users).set({
      credits: Number(userDetail?.credits - 1)
    }).where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? ""))
      .returning({ id: Users.id })
  }

  return (
    <section className="w-full mt-6 bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 px-6 py-16 md:py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-purple-800 leading-tight mb-4">
          Create Your Magical Story
        </h2>
        <p className="text-purple-700 text-lg md:text-xl max-w-3xl mx-auto mb-6">
          ✨ Unlock your creativity with the power of AI! Craft personalized stories that spark imagination and wonder. Let our magical AI bring your ideas to life — one story at a time.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-14'>
          <StorySubjectInput userSelection={onHandleUserSelection} />
          <StoryType userSelection={onHandleUserSelection} />
          <AgeGroup userSelection={onHandleUserSelection} />
          <ImageStyle userSelection={onHandleUserSelection} />
        </div>

        <div className="flex flex-col items-center mt-10 gap-3">
          <Button
            disabled={loading}
            onClick={generateStoryFromAI}
            className="px-10 py-5 text-xl cursor-pointer font-semibold rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white 
     shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            ✨ Generate Story
          </Button>

          <span className="mt-2 text-xl text-black bg-yellow-600 px-4 py-2 rounded-md border border-yellow-500 shadow-sm">
            ⚠️ 1 shiny magic bean will be used to grow your story 🌱✨ — spend it like a true bedtime hero!
          </span>


          <CustomLoader isOpen={loading} />
        </div>
      </div>
    </section>
  )
}

export default CreateStory