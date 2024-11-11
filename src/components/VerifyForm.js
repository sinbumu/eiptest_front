import React, { useState } from 'react';
import axios from 'axios';

function VerifyForm() {
  const [tokenId, setTokenId] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleVerify = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/verifier/verify?tokenId=${tokenId}&password=${password}`);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Verify</h2>
      <input placeholder="Token ID" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
      <input placeholder="Password (optional)" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleVerify}>Verify</button>
      <pre>{response}</pre>
    </div>
  );
}

export default VerifyForm;
