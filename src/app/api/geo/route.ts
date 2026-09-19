import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
	try {
		// 1. Check CDN / Proxy country headers
		const cfCountry = request.headers.get('cf-ipcountry')
		if (cfCountry && cfCountry.length === 2 && cfCountry !== 'XX') {
			return NextResponse.json({ country: cfCountry.toLowerCase() })
		}

		const vercelCountry = request.headers.get('x-vercel-ip-country')
		if (vercelCountry && vercelCountry.length === 2) {
			return NextResponse.json({ country: vercelCountry.toLowerCase() })
		}

		// 2. Fetch from IP lookup service
		const controller = new AbortController()
		const timeoutId = setTimeout(() => controller.abort(), 2500)

		const clientIp =
			request.headers.get('x-forwarded-for')?.split(',')?.[0]?.trim() ||
			request.headers.get('x-real-ip')

		const ipQuery =
			clientIp &&
				!clientIp.startsWith('127.') &&
				!clientIp.startsWith('192.168.') &&
				clientIp !== '::1'
				? `https://ipapi.co/${clientIp}/json/`
				: 'https://ipapi.co/json/'

		const res = await fetch(ipQuery, {
			signal: controller.signal,
			headers: { 'User-Agent': 'Wattsan-Geo/1.0' }
		})
		clearTimeout(timeoutId)

		if (res.ok) {
			const data = await res.json()
			if (data?.country_code) {
				return NextResponse.json({
					country: data.country_code.toLowerCase(),
					ip: data?.ip
				})
			}
		}
	} catch (error) {
		// Fallback gracefully on timeout or network error
	}

	return NextResponse.json({ country: 'us' })
}
