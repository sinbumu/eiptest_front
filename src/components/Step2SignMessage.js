// src/components/Step2SignMessage.js

import React, { useState } from 'react';
import axios from 'axios';

function Step2SignMessage() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSign = async () => {
    try {
      const res = await axios.post('/api/client/sign', { message });
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
      <h2>2. 메시지 서명</h2>
      <input
        type='text'
        placeholder='메시지'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        size={50}
      />
      <br />
      <button onClick={handleSign}>서명 생성</button>
      <h3>응답:</h3>
      <pre>{response}</pre>
    </div>
  );
}

export default Step2SignMessage;
