// src/components/Step5VerificationRequest.js

import React, { useState } from 'react';
import axios from 'axios';

function Step5VerificationRequest({ onVerificationRequest }) {
  const [tokenId, setTokenId] = useState('');
  const [password, setPassword] = useState('');
  const [challenge, setChallenge] = useState('qwerty'); // 검증자의 평문과 동일하게 설정
  const [challengeSignature, setChallengeSignature] = useState('');
  const [response, setResponse] = useState('');

  // 다른 지갑의 개인 키로 생성된 하드코딩된 서명 값
  const forgedSignature = '0xa18334a689efe9ebdd283e73940eef88a7aed4bb487510acb4f535e39e1170327434845a569f9771126d6018f0094fd5d59f7a68b250f949c8f79f42eb7efc421b';

  // Challenge Signature 생성 (클라이언트의 개인 키로 서명)
  const handleSignChallenge = async () => {
    try {
      const res = await axios.post('/api/client/sign', { message: challenge });
      setChallengeSignature(res.data.signature);
    } catch (error) {
      console.error(error);
      alert('서명 생성 실패');
    }
  };

  // 하드코딩된 서명 값 사용
  const handleUseForgedSignature = () => {
    setChallengeSignature(forgedSignature);
  };

  // 검증 요청 제출
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
      <br />
      <button onClick={handleSignChallenge}>Challenge 서명 생성</button>
      <button onClick={handleUseForgedSignature}>다른 지갑 서명 사용</button>
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
