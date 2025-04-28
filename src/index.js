export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    const allowedPaths = [
      "/webhook/",
      "/api/",
      "/rest/"
    ];
    const isPathAllowed = allowedPaths.some(path => url.pathname.startsWith(path));

    if (!isPathAllowed) {
      return new Response("Forbidden: Path not allowed", { status: 403 });
    }

    const allowedMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
    if (!allowedMethods.includes(request.method)) {
      return new Response("Forbidden: Method not allowed", { status: 403 });
    }

    const backendUrl = "https://n8n.myvhub.in" + url.pathname + url.search;

    try {
      const res = await fetch(backendUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'follow'
      });
      return res;
    } catch (err) {
      return new Response("Backend Error", { status: 502 });
    }
  },
};
