// src/components/Step4VerifyToken.js

import React, { useState } from 'react';
import axios from 'axios';

function Step4VerifyToken() {
  const [tokenId, setTokenId] = useState('');
  const [uri, setUri] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleVerify = async () => {
    try {
      const res = await axios.post('/api/client/verify-token', {
        tokenId,
        uri,
        password: password || null,
      });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      console.error(error);
      setResponse(
        error.response
          ? JSON.stringify(error.response.data, null, 2)
          : 'Error occurred'
      );
    }
  };

  return (
    <div>
      <h2>4. 토큰 검증</h2>
      <input
        type='text'
        placeholder='Token ID'
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <br />
      <input
        type='text'
        placeholder='URI'
        value={uri}
        onChange={(e) => setUri(e.target.value)}
        size={50}
      />
      <br />
      <input
        type='text'
        placeholder='Password(옵션)'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleVerify}>토큰 검증</button>
      <h3>응답:</h3>
      <pre>{response}</pre>
    </div>
  );
}

export default Step4VerifyToken;
