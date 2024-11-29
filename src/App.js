// src/App.js

import React from 'react';
import Step1UploadClaim from './components/Step1UploadClaim';
import Step2SignMessage from './components/Step2SignMessage';
import Step3Mint from './components/Step3Mint';
import Step4VerifyToken from './components/Step4VerifyToken';
import Step5GetPlaintext from './components/Step5GetPlaintext';
import Step6SignPlaintext from './components/Step6SignPlaintext';
import Step7Verify from './components/Step7Verify';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'; // 백엔드 서버의 주소에 맞게 변경하세요.
function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>VCNFT Demo</h1>
      <Step1UploadClaim />
      <Step2SignMessage />
      <Step3Mint />
      <Step4VerifyToken />
      <Step5GetPlaintext />
      <Step6SignPlaintext />
      <Step7Verify />
    </div>
  );
}

export default App;
