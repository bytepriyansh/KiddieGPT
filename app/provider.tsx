"use client"

import { db } from '@/config/db'
import { Users } from '@/config/schema'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Provider = ({ children }: { children: React.ReactNode }) => {

    const [userDetail, setUserDetail] = useState<any>("")
    const { user } = useUser()

    useEffect(() => {
        user && saveUserInfonotExists()
    }, [user])

    const saveUserInfonotExists = async () => {
        // check if user exisrts
        const userResp = await db.select().from(Users)
            .where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? ""))
        console.log("Exsiting User:", userResp)

        // if not then add it 
        if (!userResp[0]) {
            const result = await db.insert(Users).values({
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userImage: user?.imageUrl,
                userName: user?.fullName
            }).returning({
                userEmail: Users?.userEmail,
                userName: Users?.userName,
                userImage: Users?.userImage,
                credits: Users?.credits
            })

            console.log("New useR: ", result[0])
            setUserDetail(result[0])
        } else {
            setUserDetail(userResp[0])
        }

    }

    return (
        <div>
            <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
                    {children}
                </PayPalScriptProvider>
            </UserDetailContext.Provider>
        </div>
    )
}

export default Provider