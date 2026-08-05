export interface FacebookPost {
  id: string;
  message: string;
  title: string;
  excerpt: string;
  created_time: string;
  full_picture: string | null;
  permalink_url: string;
}

interface GraphPostItem {
  id?: string;
  message?: string;
  created_time?: string;
  full_picture?: string;
  permalink_url?: string;
}

interface GraphResponse {
  data?: GraphPostItem[];
  error?: { message?: string; type?: string; code?: number };
}

const CACHE_TTL_MS = 60 * 60 * 1000;
const GRAPH_VERSION = 'v21.0';

let cache: { posts: FacebookPost[]; fetchedAt: number } | null = null;

const truncateOnWordBoundary = (text: string, maxLen: number): string => {
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  const base = lastSpace > maxLen * 0.6 ? cut.slice(0, lastSpace) : cut;
  return base.trimEnd() + '…';
};

const buildTitle = (message: string): string => {
  const firstLine =
    message.split('\n').find((line) => line.trim().length > 0) ?? message;
  const trimmed = firstLine.trim();
  if (trimmed.length <= 80) return trimmed;
  return truncateOnWordBoundary(trimmed, 80);
};

const buildExcerpt = (message: string): string => {
  const singleLine = message.replace(/\s+/g, ' ').trim();
  if (singleLine.length <= 160) return singleLine;
  return truncateOnWordBoundary(singleLine, 160);
};

export async function getFacebookPosts(): Promise<FacebookPost[]> {
  const now = Date.now();
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.posts;
  }

  const pageId = process.env.FB_PAGE_ID;
  const token = process.env.FB_PAGE_TOKEN;
  if (!pageId || !token) {
    console.error(
      'Facebook nieuws: FB_PAGE_ID of FB_PAGE_TOKEN ontbreekt in de omgeving.',
    );
    return cache?.posts ?? [];
  }

  const url = new URL(
    `https://graph.facebook.com/${GRAPH_VERSION}/${pageId}/posts`,
  );
  url.searchParams.set(
    'fields',
    'id,message,created_time,full_picture,permalink_url',
  );
  url.searchParams.set('limit', '8');
  url.searchParams.set('access_token', token);

  try {
    const response = await fetch(url.toString());
    const body = (await response.json().catch(() => ({}))) as GraphResponse;

    if (!response.ok || body.error) {
      throw new Error(
        `Facebook Graph API fout ${response.status}: ${
          body.error?.message ?? 'onbekende fout'
        }`,
      );
    }

    const posts: FacebookPost[] = (body.data ?? [])
      .filter(
        (item): item is Required<Pick<GraphPostItem, 'id' | 'message' | 'created_time' | 'permalink_url'>> & GraphPostItem =>
          typeof item.id === 'string' &&
          typeof item.message === 'string' &&
          item.message.trim().length > 0 &&
          typeof item.created_time === 'string' &&
          typeof item.permalink_url === 'string',
      )
      .map((item) => ({
        id: item.id,
        message: item.message,
        title: buildTitle(item.message),
        excerpt: buildExcerpt(item.message),
        created_time: item.created_time,
        full_picture: item.full_picture ?? null,
        permalink_url: item.permalink_url,
      }));

    cache = { posts, fetchedAt: now };
    return posts;
  } catch (error) {
    console.error('Facebook nieuws ophalen faalde:', error);
    return cache?.posts ?? [];
  }
}
