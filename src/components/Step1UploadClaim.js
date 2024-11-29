// src/components/Step1UploadClaim.js

import React, { useState } from 'react';
import axios from 'axios';

function Step1UploadClaim() {
  const [claim, setClaim] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleUpload = async () => {
    try {
      const claimObject = JSON.parse(claim);
      const res = await axios.post('/api/client/upload', {
        Claim: claimObject,
        password: password || null,
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
      <h2>1. 클레임 업로드</h2>
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
    </div>
  );
}

export default Step1UploadClaim;
