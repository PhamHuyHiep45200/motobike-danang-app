import request from ".";

export async function getBanner() {
  const response = await fetch('/api/proxy/banner', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch banner');
  }

  const data = await response.json();
  return data;
}





