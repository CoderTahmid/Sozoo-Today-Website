export const handler = async function (event) {
	if (event.httpMethod === "OPTIONS") {
		return {
			statusCode: 204,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Methods": "GET, OPTIONS",
			},
			body: "",
		};
	}

	const targetUrl =
		event.queryStringParameters && event.queryStringParameters.url;

	if (!targetUrl) {
		return {
			statusCode: 400,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "text/plain; charset=utf-8",
			},
			body: "Missing url parameter",
		};
	}

	try {
		const feedRes = await fetch(targetUrl, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
				Accept:
					"application/rss+xml, application/xml, text/xml, application/atom+xml, */*",
			},
			signal: AbortSignal.timeout(9000),
		});

		if (!feedRes.ok) {
			return {
				statusCode: feedRes.status,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "text/plain; charset=utf-8",
				},
				body: `Feed responded with ${feedRes.status}`,
			};
		}

		const text = await feedRes.text();
		return {
			statusCode: 200,
			headers: {
				"Content-Type": "application/xml; charset=utf-8",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Methods": "GET, OPTIONS",
				"Cache-Control": "public, max-age=120",
			},
			body: text,
		};
	} catch (err) {
		return {
			statusCode: 500,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "text/plain; charset=utf-8",
			},
			body: err.message || "Failed to fetch RSS feed",
		};
	}
};

export default handler;

