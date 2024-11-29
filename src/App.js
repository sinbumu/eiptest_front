// src/App.js

import React, { useState } from 'react';
import Step1UploadClaim from './components/Step1UploadClaim';
import Step2CertificateRequest from './components/Step2CertificateRequest';
import Step3IssuerCreation from './components/Step3IssuerCreation';
import Step5VerificationRequest from './components/Step5VerificationRequest';
import Step6VerificationResult from './components/Step6VerificationResult';

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
      {certificateRequestData && (
        <>
          <Step3IssuerCreation
            certificateRequestData={certificateRequestData}
          />
          <hr />
        </>
      )}
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
    </div>
  );
}

export default App;
