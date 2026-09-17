const API_BASE = 'https://api.tvmaze.com';

async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`);
  }
  return response.json();
}

export function getAllShows(signal) {
  return request(`${API_BASE}/shows`, { signal });
}

export async function searchShows(query, signal) {
  const data = await request(`${API_BASE}/search/shows?q=${encodeURIComponent(query)}`, { signal });
  return data.map((item) => item.show);
}
