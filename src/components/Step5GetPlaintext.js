// src/components/Step5GetPlaintext.js

import React, { useState } from 'react';
import axios from 'axios';

function Step5GetPlaintext() {
  const [response, setResponse] = useState('');

  const handleGetPlaintext = async () => {
    try {
      const res = await axios.get('/api/verifier/plaintext');
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
      <h2>5. 검증자의 평문 가져오기</h2>
      <button onClick={handleGetPlaintext}>평문 가져오기</button>
      <h3>응답:</h3>
      <pre>{response}</pre>
    </div>
  );
}

export default Step5GetPlaintext;
