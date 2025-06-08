"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 px-4 sm:px-6 lg:px-8 py-20 md:py-28 min-h-screen">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-16 w-36 h-36 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-24 right-20 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center md:text-left"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Spark Your Child's Imagination with Magical Stories
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-purple-800/90 max-w-xl mx-auto md:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Create enchanting, personalized stories tailored to your child’s interests—building creativity and a lifelong love of reading.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link href={"/create-story"}>
              <Button
                size="lg"
                className="relative bg-purple-600 hover:bg-purple-700 cursor-pointer  text-white shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-300 rounded-md" />
                <Sparkles className="mr-2 h-5 w-5 z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="z-10 relative">Create Your Story Now</span>
              </Button>

                </Link>
              <Link href="/explore">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-300 cursor-pointer text-purple-700 hover:bg-purple-100 hover:text-purple-800 hover:border-purple-400 transition-colors duration-300"
                >
                  Explore Stories
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 to-purple-300 rounded-3xl blur-lg opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-100 group-hover:border-purple-200 transition-all duration-300">
              <Image
                src="/hero.png"
                alt="Child reading a magical storybook"
                width={600}
                height={500}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
