import React, { useState } from 'react';
import axios from 'axios';

function CredentialForm() {
  const [tokenId, setTokenId] = useState('');
  const [response, setResponse] = useState('');

  const handleCredentialCheck = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/issuer/credential/${tokenId}`);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Credential 조회</h2>
      <input placeholder="Token ID" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
      <button onClick={handleCredentialCheck}>Check Credential</button>
      <pre>{response}</pre>
    </div>
  );
}

export default CredentialForm;
