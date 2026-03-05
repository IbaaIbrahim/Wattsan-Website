import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    reactStrictMode: false,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.wattsancnc.com',
            },
            {
                protocol: 'https',
                hostname: 'wattsan.com',
            }
        ],
    },
}

export default nextConfig
