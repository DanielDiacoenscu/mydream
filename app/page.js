// --- TEMPORARY HARDCODE TEST ---

export default async function HardcodeTestPage() {
  let data = null;
  let error = null;

  // The API URL is now hardcoded. It cannot be 'undefined'.
  const HARDCODED_URL = "https://api.mydreambeauty.net/api/products?populate=*";

  try {
    const res = await fetch(HARDCODED_URL, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status} ${res.statusText}`);
    }

    data = await res.json();

  } catch (e) {
    error = e.message;
  }

  return (
    <div style={{ fontFamily: 'monospace', padding: '2rem', color: 'white', backgroundColor: 'black', minHeight: '100vh' }}>
      <h1>Hardcode Test Results</h1>
      <hr style={{ borderColor: '#333' }} />
      
      <h2 style={{ color: error ? '#ff4d4d' : '#4dff4d' }}>
        Test Status: {error ? 'FAILED' : 'SUCCESS'}
      </h2>

      {error && (
        <div>
          <h3>Error Details:</h3>
          <pre style={{ backgroundColor: '#222', padding: '1rem', borderRadius: '4px', color: '#ff8c8c' }}>
            {error}
          </pre>
        </div>
      )}

      {data && (
        <div>
          <h3>Data Received:</h3>
          <pre style={{ backgroundColor: '#222', padding: '1rem', borderRadius: '4px' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
