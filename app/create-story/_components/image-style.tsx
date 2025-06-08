"use client"

import { Label } from '@/components/ui/label'
import Image from 'next/image'
import React, { useState } from 'react'

export interface OptionFeild {
    label: string,
    imageUrl: string,
    isFree: boolean
}

const ImageStyle = ({ userSelection }:any) => {
    const optionsList = [
        { label: 'Papercut', imageUrl: '/paperCut.png', isFree: true },
        { label: 'Pixel', imageUrl: '/pixel.png', isFree: true },
        { label: 'Watercolor', imageUrl: '/watercolor.png', isFree: true },
        { label: '3D', imageUrl: '/3D.png', isFree: true },
    ]

    const [selectedOption, setSelectedOption] = useState<string>("")

    const onUserSelect = (item: OptionFeild) => {
            setSelectedOption(item.label)
            userSelection?.({
                fieldName: "imageStyle",
                fieldValue: item.label
            })
        }

    return (
        <div className="w-full max-w-2xl mx-auto mt-10 px-4">
            <Label
                htmlFor="story-subject"
                className="block text-2xl font-semibold text-purple-800 mb-4"
            >
                Image Style
            </Label>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {optionsList.map((item, index) => {
                    const isSelected = selectedOption === item.label

                    return (
                        <div
                            key={index}
                            onClick={() => onUserSelect(item)}
                            className={`relative group overflow-hidden rounded-2xl shadow-lg transition-all cursor-pointer
    ${isSelected
                                    ? 'ring-6 ring-pink-500 scale-105 shadow-purple-300'
                                    : 'hover:scale-105 hover:shadow-xl'
                                }`}
                        >

                            <Image
                                src={item.imageUrl}
                                alt={item.label}
                                width={500}
                                height={300}
                                className={`w-full h-[120px] object-cover rounded-2xl transition-all duration-500 ease-in-out
                                    ${!isSelected ? 'grayscale group-hover:grayscale-0' : ''}
                                `}
                            />
                            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white text-center py-3 text-lg font-semibold">
                                {item.label}
                            </div>
                            {isSelected && (
                                <div className="absolute inset-0 bg-purple-500/10 rounded-2xl"></div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ImageStyle