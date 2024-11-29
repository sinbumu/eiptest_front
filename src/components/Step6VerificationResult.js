// src/components/Step6VerificationResult.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Step6VerificationResult({ verificationRequestData }) {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const handleVerification = async () => {
      try {
        const res = await axios.post('/api/verifier/verify', {
          tokenId: verificationRequestData.tokenId,
          password: verificationRequestData.password || null,
          signature: verificationRequestData.challengeSignature,
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

    if (verificationRequestData) {
      handleVerification();
    }
  }, [verificationRequestData]);

  return (
    <div>
      <h2>검증 결과</h2>
      <h3>응답:</h3>
      <pre>{response}</pre>
    </div>
  );
}

export default Step6VerificationResult;
