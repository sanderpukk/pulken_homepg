/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    env: {
        MAPTILER_API_KEY: process.env.NODE_ENV === 'production' ? 'GGH4D8uBU9VhKX9E1Gbd' : 'RSoynyAOeBHXkE6wKbaz',
    },
}

module.exports = nextConfig
