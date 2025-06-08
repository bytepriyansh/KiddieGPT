"use client"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface LoaderProps {
    isOpen: boolean
}

const CustomLoader = ({ isOpen }: LoaderProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <AlertDialog open={isOpen}>
                    <AlertDialogContent className="bg-black/70 backdrop-blur-md border border-yellow-500 shadow-xl p-10 rounded-2xl max-w-md w-full text-center">
                        <AlertDialogTitle className="sr-only">Loading</AlertDialogTitle>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="flex flex-col items-center gap-6"
                        >
                            <Image
                                src="/banana.gif"
                                alt="Funny Loading"
                                width={120}
                                height={120}
                                className="rounded-full"
                            />
                            <div className="text-white text-2xl font-bold">
                                Please Wait... 🐢
                            </div>
                            <p className="text-yellow-300 text-lg max-w-xs">
                                We're working on it! The hamsters are running as fast as they can on the wheel 🐹💨
                            </p>
                        </motion.div>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </AnimatePresence>
    )
}

export default CustomLoader
