// src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import Step1UploadClaim from './components/Step1UploadClaim';
import Step2CertificateRequest from './components/Step2CertificateRequest';
import Step3IssuerCreation from './components/Step3IssuerCreation';
import Step5VerificationRequest from './components/Step5VerificationRequest';
import Step6VerificationResult from './components/Step6VerificationResult';
import ModifyClaim from './components/ModifyClaim'; // 추가된 부분

// Axios 기본 URL 설정
axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  const [certificateRequestData, setCertificateRequestData] = useState(null);
  const [verificationRequestData, setVerificationRequestData] = useState(null);

  return (
    <div style={{ padding: '20px' }}>
      <h1>VCNFT Demo</h1>
      <Step1UploadClaim />
      <hr />
      <Step2CertificateRequest
        onCertificateRequest={(data) => setCertificateRequestData(data)}
      />
      <hr />
      {/* 발급자 작성 화면을 항상 표시 */}
      <Step3IssuerCreation certificateRequestData={certificateRequestData} />
      <hr />
      <Step5VerificationRequest
        onVerificationRequest={(data) => setVerificationRequestData(data)}
      />
      <hr />
      {verificationRequestData && (
        <>
          <Step6VerificationResult
            verificationRequestData={verificationRequestData}
          />
          <hr />
        </>
      )}
      {/* 클레임 변조 컴포넌트 추가 */}
      <ModifyClaim />
    </div>
  );
}

export default App;
