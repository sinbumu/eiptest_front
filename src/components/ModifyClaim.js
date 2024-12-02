// src/components/ModifyClaim.js

import React, { useState } from 'react';
import axios from 'axios';

function ModifyClaim() {
  const [uri, setUri] = useState('');
  const [newClaim, setNewClaim] = useState('');
  const [response, setResponse] = useState('');

  const handleModifyClaim = async () => {
    try {
      const newClaimObject = JSON.parse(newClaim);
      const res = await axios.post('/api/client/modifyClaim', {
        uri,
        Claim: newClaimObject,
      });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      console.error(error);
      setResponse(
        error.response
          ? JSON.stringify(error.response.data, null, 2)
          : '에러 발생'
      );
    }
  };

  return (
    <div>
      <h2>클레임 변조</h2>
      <input
        type='text'
        placeholder='URI'
        value={uri}
        onChange={(e) => setUri(e.target.value)}
        size={50}
      />
      <br />
      <textarea
        placeholder='New Claim (JSON 형식)'
        value={newClaim}
        onChange={(e) => setNewClaim(e.target.value)}
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={handleModifyClaim}>클레임 수정</button>
      <h3>응답:</h3>
      <pre>{response}</pre>
    </div>
  );
}

export default ModifyClaim;
