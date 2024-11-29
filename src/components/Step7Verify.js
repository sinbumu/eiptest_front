// src/components/Step7Verify.js

import React, { useState } from 'react';
import axios from 'axios';

function Step7Verify() {
  const [tokenId, setTokenId] = useState('');
  const [uri, setUri] = useState('');
  const [password, setPassword] = useState('');
  const [signature, setSignature] = useState('');
  const [response, setResponse] = useState('');

  const handleVerify = async () => {
    try {
      const res = await axios.post('/api/verifier/verify', {
        tokenId,
        uri,
        password: password || null,
        signature,
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
      <h2>7. 검증 요청</h2>
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
      <input
        type='text'
        placeholder='Signature'
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
        size={70}
      />
      <br />
      <button onClick={handleVerify}>검증 요청</button>
      <h3>응답:</h3>
      <pre>{response}</pre>
    </div>
  );
}

export default Step7Verify;
