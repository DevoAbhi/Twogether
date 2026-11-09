const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const getAccessCode = () => localStorage.getItem('olw_code') || '';
export const setAccessCode = (code) => localStorage.setItem('olw_code', code);

export async function api(path, options = {}) {
  const response = await fetch(`${API_URL}/api${path}`, {
    ...options,
    headers: { 'x-access-code': getAccessCode(), ...(options.headers || {}) },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
}

export function sendJson(path, body, method = 'POST') {
  return api(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

// <img> tags cannot send headers, so the access code goes in the URL.
export function photoUrl(photoId) {
  return `${API_URL}/api/photos/${photoId}?code=${encodeURIComponent(getAccessCode())}`;
}
