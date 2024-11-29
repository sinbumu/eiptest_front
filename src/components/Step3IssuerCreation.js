// src/components/Step3IssuerCreation.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Step3IssuerCreation({ certificateRequestData }) {
  const [issuerAddress, setIssuerAddress] = useState('0xIssuerFixedAddress');
  const [tokenId, setTokenId] = useState('');
  const [issuanceTime, setIssuanceTime] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [to, setTo] = useState('');
  const [response, setResponse] = useState('');

  // 클라이언트 주소 복원
  useEffect(() => {
    const recoverClientAddress = async () => {
      try {
        const res = await axios.post('/api/issuer/recover-address', {
          message: certificateRequestData.uri,
          signature: certificateRequestData.signature,
        });
        setTo(res.data.address);
      } catch (error) {
        console.error(error);
        alert('클라이언트 주소 복원 실패');
      }
    };

    if (certificateRequestData) {
      recoverClientAddress();
    }
  }, [certificateRequestData]);

  // 민팅 요청
  const handleMintRequest = async () => {
    try {
      const res = await axios.post('/api/issuer/mint', {
        uri: certificateRequestData.uri,
        password: certificateRequestData.password || null,
        tokenId,
        ItokenId: '0',
        issuanceTime: Number(issuanceTime),
        expirationTime: Number(expirationTime),
        optionalData: '',
        signature: certificateRequestData.signature,
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
      <h2>발급자 작성</h2>
      <p>Issuer Address: {issuerAddress}</p>
      <input
        type='text'
        placeholder='Token ID'
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <br />
      <input
        type='text'
        placeholder='Issuance Date (Timestamp)'
        value={issuanceTime}
        onChange={(e) => setIssuanceTime(e.target.value)}
      />
      <br />
      <input
        type='text'
        placeholder='Expiration Date (Timestamp)'
        value={expirationTime}
        onChange={(e) => setExpirationTime(e.target.value)}
      />
      <br />
      <p>To Address (자동 채움): {to}</p>
      <button onClick={handleMintRequest}>민팅 요청</button>
      <h3>응답:</h3>
      <pre>{response}</pre>
    </div>
  );
}

export default Step3IssuerCreation;
