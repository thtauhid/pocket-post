export function processEmail(text: string, trackingId?: number) {
  return `<html><body>${text}<br /><img src="https://pocket-post.vercel.app/serve/${trackingId}"/></body></html>`;
}
