// src/components/Step5VerificationRequest.js

import React, { useState } from 'react';
import axios from 'axios';

function Step5VerificationRequest({ onVerificationRequest }) {
  const [tokenId, setTokenId] = useState('');
  const [password, setPassword] = useState('');
  const [challenge, setChallenge] = useState('qwerty'); // 검증자의 평문과 동일하게 설정
  const [challengeSignature, setChallengeSignature] = useState('');
  const [response, setResponse] = useState('');

  // Challenge Signature 생성
  const handleSignChallenge = async () => {
    try {
      const res = await axios.post('/api/client/sign', { message: challenge });
      setChallengeSignature(res.data.signature);
    } catch (error) {
      console.error(error);
      alert('서명 생성 실패');
    }
  };

  // 검증 요청
  const handleVerificationRequest = () => {
    onVerificationRequest({ tokenId, password, challenge, challengeSignature });
  };

  return (
    <div>
      <h2>검증 요청</h2>
      <input
        type='text'
        placeholder='Token ID'
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
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
        placeholder='Challenge 구문'
        value={challenge}
        readOnly
        size={50}
      />
      <button onClick={handleSignChallenge}>Challenge 서명 생성</button>
      <br />
      <input
        type='text'
        placeholder='Challenge Signature'
        value={challengeSignature}
        readOnly
        size={70}
      />
      <br />
      <button onClick={handleVerificationRequest}>검증 요청</button>
      <h3>응답:</h3>
      <pre>{response}</pre>
    </div>
  );
}

export default Step5VerificationRequest;
