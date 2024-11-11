import React, { useState } from 'react';
import axios from 'axios';

function MintForm() {
  const [uri, setUri] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [ItokenId, setItokenId] = useState('');
  const [password, setPassword] = useState('');
  const [claim, setClaim] = useState('{}');
  const [to, setTo] = useState('');
  const [response, setResponse] = useState('');

  const handleMint = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/issuer/mint', {
        uri,
        tokenId,
        ItokenId,
        password,
        Claim: JSON.parse(claim),
        to,
      });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Certify (Mint)</h2>
      <input placeholder="URI" value={uri} onChange={(e) => setUri(e.target.value)} />
      <input placeholder="Token ID" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
      <input placeholder="Issuer Token ID (optional)" value={ItokenId} onChange={(e) => setItokenId(e.target.value)} />
      <input placeholder="Password (optional)" value={password} onChange={(e) => setPassword(e.target.value)} />
      <textarea placeholder="Claim (JSON format)" value={claim} onChange={(e) => setClaim(e.target.value)} />
      <input placeholder="To (Address)" value={to} onChange={(e) => setTo(e.target.value)} />
      <button onClick={handleMint}>Mint</button>
      <pre>{response}</pre>
    </div>
  );
}

export default MintForm;
