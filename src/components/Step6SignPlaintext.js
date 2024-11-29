// src/components/Step6SignPlaintext.js

import React, { useState } from 'react';
import axios from 'axios';

function Step6SignPlaintext() {
  const [plaintext, setPlaintext] = useState('');
  const [response, setResponse] = useState('');

  const handleSign = async () => {
    try {
      const res = await axios.post('/api/client/sign', {
        message: plaintext,
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
      <h2>6. 평문 서명</h2>
      <input
        type='text'
        placeholder='평문'
        value={plaintext}
        onChange={(e) => setPlaintext(e.target.value)}
        size={50}
      />
      <br />
      <button onClick={handleSign}>서명 생성</button>
      <h3>응답:</h3>
      <pre>{response}</pre>
    </div>
  );
}

export default Step6SignPlaintext;
