// src/components/Step1UploadClaim.js

import React, { useState } from 'react';
import axios from 'axios';

function Step1UploadClaim() {
  const [claim, setClaim] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');
  const [claimLink, setClaimLink] = useState('');

  const handleUpload = async () => {
    try {
      const claimObject = JSON.parse(claim);
      const res = await axios.post('/api/client/upload', {
        Claim: claimObject,
        password: password || null,
      });
      setResponse(JSON.stringify(res.data, null, 2));

      // 응답에서 uri와 password를 사용하여 링크 생성
      const { uri } = res.data;
      if (uri) {
        // uri에서 claimKey 추출
        const urlObj = new URL(uri);
        const claimKey = urlObj.searchParams.get('claimKey');

        // 새로운 링크 생성
        const baseUrl = 'http://3.34.178.233:3000/api/claims';
        const params = new URLSearchParams({ claimKey });
        if (password) {
          params.append('password', password);
        }
        const fullLink = `${baseUrl}?${params.toString()}`;
        setClaimLink(fullLink);
      }
    } catch (error) {
      console.error(error);
      setResponse(
        error.response
          ? JSON.stringify(error.response.data, null, 2)
          : 'Error occurred'
      );
      setClaimLink(''); // 에러 발생 시 링크 초기화
    }
  };

  return (
    <div>
      <h2>클레임 업로드</h2>
      <textarea
        placeholder='Claim(JSON 형식)'
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
        rows={5}
        cols={50}
      />
      <br />
      <input
        type='text'
        placeholder='Password(옵션)'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleUpload}>클레임 업로드</button>
      <h3>응답:</h3>
      <pre>{response}</pre>
      {claimLink && (
        <div>
          <h3>클레임 링크:</h3>
          <a href={claimLink} target='_blank' rel='noopener noreferrer'>
            {claimLink}
          </a>
        </div>
      )}
    </div>
  );
}

export default Step1UploadClaim;
