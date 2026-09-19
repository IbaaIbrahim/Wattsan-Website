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
	let data: any = {};
	try {
		// 1. Check CDN / Proxy country headers (fastest & most reliable in production)
		const cfCountry = request.headers.get('cf-ipcountry')
		data['cfCountry'] = cfCountry || ""
		if (cfCountry && cfCountry.length === 2 && cfCountry !== 'XX') {
			return NextResponse.json({ country: cfCountry.toLowerCase(), data })
		}

		const vercelCountry = request.headers.get('x-vercel-ip-country')
		data['vercelCountry'] = vercelCountry || ""
		if (vercelCountry && vercelCountry.length === 2) {
			return NextResponse.json({ country: vercelCountry.toLowerCase(), data })
		}

		// 2. Extract and sanitize client IP (strips IPv4-mapped IPv6 prefix `::ffff:`)
		const xff = request.headers.get('x-forwarded-for')
		const xrealip = request.headers.get('x-real-ip')
		data['xff'] = xff || ""
		data['xrealip'] = xrealip || ""
		const rawIp =
			xff?.split(',')?.[0]?.trim() ||
			xrealip ||
			''

		const clientIp = rawIp.replace(/^::ffff:/, '')
		data['clientIp'] = clientIp || ""

		// 3. Return cached result if available
		if (clientIp && geoCache.has(clientIp)) {
			const country = geoCache.get(clientIp) as string
			data['geoCache'] = country || ""
			return NextResponse.json({ country, ip: clientIp, data })
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
					const ipWhoIsData: any = await res.json()
					if (ipWhoIsData?.success && ipWhoIsData?.country_code) {
						const country = ipWhoIsData.country_code.toLowerCase()
						data['ipWhoIsData'] = ipWhoIsData || {}
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
		const langCountry = extractCountryFromAcceptLanguage(request.headers.get('accept-language'))
		data['langCountry'] = langCountry || ""
		if (langCountry) {
			return NextResponse.json({ country: langCountry, data })
		}
	} catch (error: any) {
		data['error'] = error.message
		// Fallback gracefully on unexpected errors
		return NextResponse.json({ country: 'us', data })
	}

	return NextResponse.json({ country: 'us', data })
}
