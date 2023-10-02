/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    env: {
        MAPTILER_API_KEY: process.env.NODE_ENV === 'production' ? 'GGH4D8uBU9VhKX9E1Gbd' : 'RSoynyAOeBHXkE6wKbaz',
    },
    images: { unoptimized: true }
}

module.exports = nextConfig
