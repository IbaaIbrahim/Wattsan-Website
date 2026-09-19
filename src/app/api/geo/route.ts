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

function cleanIp(ip: string): string {
	return ip.trim().replace(/^::ffff:/, '')
}

function extractCountryFromAcceptLanguage(header: string | null): string | null {
	if (!header) return null
	// e.g., "en-US,en;q=0.9,ar-IQ;q=0.8" -> look for 2-letter region code after '-'
	const regex = /[a-zA-Z]{2}-([a-zA-Z]{2})/g
	let match: RegExpExecArray | null
	while ((match = regex.exec(header)) !== null) {
		if (match[1]) return match[1].toLowerCase()
	}
	return null
}

function extractClientIp(request: Request): {
	clientIp: string
	headers: Record<string, string>
} {
	const cfConnectingIp = cleanIp(request.headers.get('cf-connecting-ip') || '')
	const trueClientIp = cleanIp(request.headers.get('true-client-ip') || '')
	const xRealIp = cleanIp(request.headers.get('x-real-ip') || '')
	const xClientIp = cleanIp(request.headers.get('x-client-ip') || '')
	const xff = request.headers.get('x-forwarded-for') || ''

	const headers = {
		cfConnectingIp,
		trueClientIp,
		xRealIp,
		xClientIp,
		xff
	}

	// 1. Direct proxy headers (highest fidelity)
	const directCandidates = [cfConnectingIp, trueClientIp, xRealIp, xClientIp].filter(Boolean)
	for (const ip of directCandidates) {
		if (!isPrivateIp(ip)) {
			return { clientIp: ip, headers }
		}
	}

	// 2. Parse X-Forwarded-For chain: find the first non-private IP
	const xffList = xff
		.split(',')
		.map(cleanIp)
		.filter(Boolean)

	for (const ip of xffList) {
		if (!isPrivateIp(ip)) {
			return { clientIp: ip, headers }
		}
	}

	// 3. Fallback to first candidate even if private (useful for debugging/diagnostics)
	const fallbackIp = directCandidates[0] || xffList[0] || ''
	return { clientIp: fallbackIp, headers }
}

export async function GET(request: Request) {
	const data: Record<string, any> = {}

	try {
		// 1. Check CDN / Proxy edge country headers (fastest & 100% accurate if behind Cloudflare/Vercel)
		const cfCountry = request.headers.get('cf-ipcountry')
		data['cfCountry'] = cfCountry || ''
		if (cfCountry && cfCountry.length === 2 && cfCountry.toUpperCase() !== 'XX') {
			return NextResponse.json({ country: cfCountry.toLowerCase(), data })
		}

		const vercelCountry = request.headers.get('x-vercel-ip-country')
		data['vercelCountry'] = vercelCountry || ''
		if (vercelCountry && vercelCountry.length === 2) {
			return NextResponse.json({ country: vercelCountry.toLowerCase(), data })
		}

		// 2. Extract client IP from proxy and forwarding headers
		const { clientIp, headers } = extractClientIp(request)
		data['headers'] = headers
		data['clientIp'] = clientIp

		// 3. Return cached result if available
		if (clientIp && geoCache.has(clientIp)) {
			const country = geoCache.get(clientIp) as string
			data['geoCache'] = country || ''
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
		data['langCountry'] = langCountry || ''
		if (langCountry) {
			return NextResponse.json({ country: langCountry, data })
		}
	} catch (error: any) {
		data['error'] = error?.message || 'Unknown error'
		return NextResponse.json({ country: 'us', data })
	}

	return NextResponse.json({ country: 'us', data })
}
