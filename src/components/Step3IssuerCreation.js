// src/components/Step3IssuerCreation.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Step3IssuerCreation({ certificateRequestData }) {
  // 이슈어 주소를 하드코딩
  const issuerAddress = '0x17D02C217cC867401dB61291e1253DbE579dB56e';

  const [tokenId, setTokenId] = useState('');
  const [issuanceTime, setIssuanceTime] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [to, setTo] = useState('');
  const [response, setResponse] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  // 증명서 요청 데이터가 있을 때 클라이언트 주소 복원
  useEffect(() => {
    const recoverClientAddress = async () => {
      try {
        const res = await axios.post('/api/issuer/recover-address', {
          message: certificateRequestData.uri,
          signature: certificateRequestData.signature,
        });
        setTo(res.data.address);
        setIsDisabled(false); // 입력 필드 및 버튼 활성화
      } catch (error) {
        console.error(error);
        alert('클라이언트 주소 복원 실패');
      }
    };

    if (certificateRequestData) {
      recoverClientAddress();
    } else {
      setIsDisabled(true); // 증명서 요청 데이터가 없으면 비활성화
    }
  }, [certificateRequestData]);

  // 민팅 요청 함수
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
          : '에러 발생'
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
        disabled={isDisabled}
      />
      <br />
      <input
        type='text'
        placeholder='Issuance Time (Timestamp)'
        value={issuanceTime}
        onChange={(e) => setIssuanceTime(e.target.value)}
        disabled={isDisabled}
      />
      <br />
      <input
        type='text'
        placeholder='Expiration Time (Timestamp)'
        value={expirationTime}
        onChange={(e) => setExpirationTime(e.target.value)}
        disabled={isDisabled}
      />
      <br />
      <p>
        To Address:{' '}
        {to || (
          <span style={{ color: 'red' }}>
            {isDisabled ? '클라이언트 주소를 기다리는 중...' : ''}
          </span>
        )}
      </p>
      <button onClick={handleMintRequest} disabled={isDisabled}>
        민팅 요청
      </button>
      <h3>응답:</h3>
      <pre>{response}</pre>
    </div>
  );
}

export default Step3IssuerCreation;
