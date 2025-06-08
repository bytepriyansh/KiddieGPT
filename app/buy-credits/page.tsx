"use client"

import React, { useContext, useEffect, useState } from 'react'
import Header from '../_components/header'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'
import { db } from '@/config/db'
import { Users } from '@/config/schema'
import { eq, sql } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useRouter } from 'next/navigation'

const BuyCredits = () => {
  const Options = [
    { id: 1, price: 1.99, credits: 10, quote: "Cheaper than your lunchbox 🍱" },
    { id: 2, price: 3.99, credits: 30, quote: "More stories than bedtime 🛌" },
    { id: 3, price: 6.99, credits: 75, quote: "Like magic beans but better 🫘✨" },
    { id: 4, price: 9.99, credits: 150, quote: "Story explosion incoming 💥📚" },
  ]

  const [selectedOptionId, setSelectedOptionId] = useState<number>(0)
  const [selectedPrice, setSelectedPrice] = useState<number>(0)
  const router = useRouter()

  const { user } = useUser()
  const { userDetail, setUserDetail } = useContext(UserDetailContext)

  useEffect(() => {
    const selected = Options.find(opt => opt.id === selectedOptionId)
    if (selected) setSelectedPrice(selected.price)
  }, [selectedOptionId])



  const onPaymentApproved = async () => {
    const selected = Options.find(opt => opt.id === selectedOptionId)
    if (!selected || !user?.primaryEmailAddress?.emailAddress) return

    try {
      // Update credits in DB
      const result = await db.update(Users)
        .set({
          credits: sql.raw(`credits + ${selected.credits}`),
        })
        .where(eq(Users.userEmail, user.primaryEmailAddress.emailAddress))
        .returning()
        .execute()

      const updatedUser = result[0]

      setUserDetail((prev: any) => ({
        ...prev,
        credits: updatedUser.credits
      }))

      toast.success(`🎉 Successfully added ${selected.credits} credits!`)
      router.replace("/dashboard")
    } catch (error) {
      console.error("❌ Failed to update credits:", error)
      toast.error("Something went wrong while adding credits.")
    }
  }

  return (
    <div className="min-h-screen bg-purple-100">
      <Header />

      <div className="px-6 md:px-20 py-10">
        <h2 className="text-3xl font-extrabold mb-8 text-purple-900">🎁 Add More Credits</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 flex flex-col gap-4">
            {Options.map((option) => {
              const isSelected = selectedOptionId === option.id
              return (
                <Card
                  key={option.id}
                  onClick={() => setSelectedOptionId(option.id)}
                  className={`
                    cursor-pointer transition transform hover:scale-105 max-w-xl
                    rounded-xl p-4 shadow-lg shadow-black/70
                    ${isSelected
                      ? 'border-4 border-yellow-700 bg-purple-300'
                      : 'border-2 border-purple-300 bg-purple-400'}
                  `}
                >
                  <CardContent className="p-0">
                    <CardTitle className="text-xl text-center font-bold text-black mb-1">
                      Buy {option.credits} Credits = {option.credits} Stories 📖
                    </CardTitle>
                    <p className="text-lg font-semibold text-center text-gray-800 mb-1">
                      ${option.price.toFixed(2)}
                    </p>
                    <p className="text-lg text-gray-800 text-center italic">{option.quote}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="col-span-1 flex flex-col justify-center items-center">
            {selectedPrice > 0 && (
              <div className="mr-50 w-full max-w-2xl">
                <PayPalButtons
                  createOrder={(data, actions) => {
                    // @ts-ignore
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: selectedPrice.toFixed(2),
                            currency_code: "USD"
                          }
                        }
                      ]
                    })
                  }}
                  // @ts-ignore
                  onApprove={(data, actions) => {
                    onPaymentApproved()
                  }}
                  onCancel={()=>toast.error("Payment Cancelled!")}
                  style={{
                    layout: "vertical",
                    shape: "rect",
                    color: "gold",
                    label: "paypal",
                    tagline: false,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyCredits
