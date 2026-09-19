import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// In-memory cache to prevent hitting external APIs repeatedly
const geoCache = new Map<string, string>()
const CACHE_LIMIT = 2000

function isPrivateIp(ip: string): boolean {
	return (
		!ip ||
		ip === '::1' ||
		ip === '127.0.0.1' ||
		ip === 'localhost' ||
		ip.startsWith('10.') ||
		ip.startsWith('192.168.') ||
		/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip) ||
		ip.startsWith('fc00:') ||
		ip.startsWith('fe80:')
	)
}

function extractCountryFromAcceptLanguage(header: string | null): string | null {
	if (!header) return null
	// e.g., "en-US,en;q=0.9,ar-IQ;q=0.8" -> look for 2-letter region code after '-'
	const regex = /[a-z]{2}-([A-Z]{2})/g
	let match: RegExpExecArray | null
	while ((match = regex.exec(header)) !== null) {
		if (match[1]) return match[1].toLowerCase()
	}
	return null
}

export async function GET(request: Request) {
	let data: any;
	try {
		// 1. Check CDN / Proxy country headers (fastest & most reliable in production)
		data['cfCountry'] = request.headers.get('cf-ipcountry')
		const cfCountry = request.headers.get('cf-ipcountry')
		if (cfCountry && cfCountry.length === 2 && cfCountry !== 'XX') {
			return NextResponse.json({ country: cfCountry.toLowerCase(), data })
		}

		data['vercelCountry'] = request.headers.get('x-vercel-ip-country')
		const vercelCountry = request.headers.get('x-vercel-ip-country')
		if (vercelCountry && vercelCountry.length === 2) {
			return NextResponse.json({ country: vercelCountry.toLowerCase(), data })
		}

		// 2. Extract and sanitize client IP (strips IPv4-mapped IPv6 prefix `::ffff:`)
		data['xff'] = request.headers.get('x-forwarded-for')
		data['xrealip'] = request.headers.get('x-real-ip')
		const rawIp =
			request.headers.get('x-forwarded-for')?.split(',')?.[0]?.trim() ||
			request.headers.get('x-real-ip') ||
			''

		const clientIp = rawIp.replace(/^::ffff:/, '')
		data['clientIp'] = clientIp

		// 3. Return cached result if available
		if (clientIp && geoCache.has(clientIp)) {
			data['geoCache'] = geoCache.get(clientIp)
			return NextResponse.json({ country: geoCache.get(clientIp), ip: clientIp, data })
		}

		// 4. If public IP, query geolocation provider
		if (clientIp && !isPrivateIp(clientIp)) {
			const controller = new AbortController()
			const timeoutId = setTimeout(() => controller.abort(), 2000)

			try {
				const res = await fetch(`https://ipwho.is/${clientIp}`, {
					signal: controller.signal,
					headers: { 'User-Agent': 'Wattsan-Geo/1.0' }
				})
				clearTimeout(timeoutId)

				if (res.ok) {
					const data = await res.json()
					if (data?.success && data?.country_code) {
						const country = data.country_code.toLowerCase()
						data['country'] = country
						// Cache result
						if (geoCache.size > CACHE_LIMIT) {
							geoCache.clear()
						}
						geoCache.set(clientIp, country)

						return NextResponse.json({ country, ip: clientIp, data })
					}
				}
			} catch {
				clearTimeout(timeoutId)
			}
		}

		// 5. Fallback: try parsing region from Accept-Language header (e.g. en-GB -> gb)
		data['langCountry'] = extractCountryFromAcceptLanguage(request.headers.get('accept-language'))
		const langCountry = extractCountryFromAcceptLanguage(request.headers.get('accept-language'))
		if (langCountry) {
			return NextResponse.json({ country: langCountry, data })
		}
	} catch {
		// Fallback gracefully on unexpected errors
	}

	return NextResponse.json({ country: 'us', data })
}
