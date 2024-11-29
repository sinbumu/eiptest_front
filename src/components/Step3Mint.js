// src/components/Step3Mint.js

import React, { useState } from 'react';
import axios from 'axios';

function Step3Mint() {
  const [uri, setUri] = useState('');
  const [password, setPassword] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [issuanceTime, setIssuanceTime] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [optionalData, setOptionalData] = useState('');
  const [signature, setSignature] = useState('');
  const [response, setResponse] = useState('');

  const handleMint = async () => {
    try {
      const res = await axios.post('/api/issuer/mint', {
        uri,
        password: password || null,
        tokenId,
        ItokenId: '0', // 기본값 설정
        issuanceTime: Number(issuanceTime),
        expirationTime: Number(expirationTime),
        optionalData: optionalData || '',
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
      <h2>3. 민팅 요청</h2>
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
        placeholder='Token ID'
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <br />
      <input
        type='text'
        placeholder='Issuance Time (Timestamp)'
        value={issuanceTime}
        onChange={(e) => setIssuanceTime(e.target.value)}
      />
      <br />
      <input
        type='text'
        placeholder='Expiration Time (Timestamp)'
        value={expirationTime}
        onChange={(e) => setExpirationTime(e.target.value)}
      />
      <br />
      <input
        type='text'
        placeholder='Optional Data(옵션)'
        value={optionalData}
        onChange={(e) => setOptionalData(e.target.value)}
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
      <button onClick={handleMint}>민팅 요청</button>
      <h3>응답:</h3>
      <pre>{response}</pre>
    </div>
  );
}

export default Step3Mint;
