/**
 * Cloudflare Worker: Gitalk OAuth token proxy.
 * Deploy at https://tfg-gitalk-proxy.<account>.workers.dev/get_accesstoken
 * Secrets: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (url.pathname !== '/get_accesstoken') {
      return new Response('Not Found', { status: 404 })
    }
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors })
    }
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: cors })
    }

    try {
      const { code } = await request.json()
      if (!code) {
        return new Response('missing code', { status: 400, headers: cors })
      }

      const githubResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      })

      const data = await githubResponse.json()
      return new Response(JSON.stringify(data), {
        headers: { ...cors, 'Content-Type': 'application/json' },
      })
    } catch {
      return new Response('proxy error', { status: 500, headers: cors })
    }
  },
}
