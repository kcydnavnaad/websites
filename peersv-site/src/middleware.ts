import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(({ request, url }, next) => {
  const host = request.headers.get('host');
  if (host && host.toLowerCase().startsWith('www.')) {
    const target = `https://${host.slice(4)}${url.pathname}${url.search}`;
    return new Response(null, {
      status: 301,
      headers: { Location: target },
    });
  }
  return next();
});
