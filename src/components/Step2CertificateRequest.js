// src/components/Step2CertificateRequest.js

import React, { useState } from 'react';
import axios from 'axios';

function Step2CertificateRequest({ onCertificateRequest }) {
  const [uri, setUri] = useState('');
  const [password, setPassword] = useState('');
  const [signature, setSignature] = useState('');
  const [response, setResponse] = useState('');

  // URI로 서명 생성
  const handleSignUri = async () => {
    try {
      const res = await axios.post('/api/client/sign', { message: uri });
      setSignature(res.data.signature);
      // 필요한 경우 주소를 상위 컴포넌트나 상태로 전달
      // setAddress(res.data.address);
    } catch (error) {
      console.error(error);
      alert('서명 생성 실패');
    }
  };

  // 증명서 요청
  const handleCertificateRequest = () => {
    // 다음 단계로 필요한 데이터 전달
    onCertificateRequest({ uri, password, signature });
  };

  return (
    <div>
      <h2>증명서 요청</h2>
      <input
        type='text'
        placeholder='URI'
        value={uri}
        onChange={(e) => setUri(e.target.value)}
        size={50}
      />
      <button onClick={handleSignUri}>서명 생성</button>
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
        placeholder='Signature (자동 생성)'
        value={signature}
        readOnly
        size={70}
      />
      <br />
      <button onClick={handleCertificateRequest}>증명서 요청</button>
    </div>
  );
}

export default Step2CertificateRequest;
