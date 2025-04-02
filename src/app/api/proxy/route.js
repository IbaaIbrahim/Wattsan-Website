export const dynamic = 'force-dynamic'; // Ensure this is a dynamic route

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const modelUrl = searchParams.get('url');

	if (!modelUrl) {
		return new Response(JSON.stringify({ error: 'Missing URL parameter' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	try {
		const res = await fetch(modelUrl);

		if (!res.ok) {
			throw new Error(`Failed to fetch model: ${res.status}`);
		}

		const arrayBuffer = await res.arrayBuffer();

		return new Response(arrayBuffer, {
			status: 200,
			headers: {
				'Content-Type': 'model/gltf-binary',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'public, max-age=3600'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}