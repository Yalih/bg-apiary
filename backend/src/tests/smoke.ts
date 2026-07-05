const baseUrl = process.env.API_URL ?? 'http://localhost:3000/api/v1';

async function assertOk(path: string) {
  const response = await fetch(`${baseUrl}${path}`);
  if (!response.ok) {
    throw new Error(`${path} failed with ${response.status}`);
  }
  console.log(`${path} OK`);
}

await assertOk('/health');
await assertOk('/apiaries');
await assertOk('/hives');
