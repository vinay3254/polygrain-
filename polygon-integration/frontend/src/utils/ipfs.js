// frontend/src/utils/ipfs.js
// Pinata IPFS utility — pin JSON objects and fetch them back by CID.
// Reads VITE_PINATA_JWT and VITE_PINATA_GATEWAY from .env.

const PINATA_URL = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

/**
 * Upload a JSON object to IPFS via Pinata.
 * @param {object} obj - Any JSON-serialisable object.
 * @returns {Promise<string>} IPFS CID (IpfsHash field from Pinata response).
 * @throws {Error} if the Pinata request fails.
 */
export async function pinJSON(obj) {
  const res = await fetch(PINATA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
    },
    body: JSON.stringify({ pinataContent: obj }),
  });

  if (!res.ok) {
    throw new Error(`Pinata upload failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.IpfsHash;
}

/**
 * Fetch a JSON object from IPFS by CID.
 * Retries once after 2 s on failure.
 * Returns null if both attempts fail — callers should render a placeholder.
 *
 * @param {string} cid - IPFS content identifier.
 * @returns {Promise<object|null>}
 */
export async function fetchJSON(cid) {
  const url = `${import.meta.env.VITE_PINATA_GATEWAY}/${cid}`;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res.json();
    } catch (_) {
      // swallow network errors — retry once
    }
    if (attempt === 0) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  return null;
}
