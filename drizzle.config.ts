import { defineConfig } from "drizzle-kit"

export default defineConfig({
    schema: "./config/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DATABASE_URL!,
    },
    verbose: true,
    strict: true
})