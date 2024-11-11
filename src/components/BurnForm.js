// BurnForm.js
import React, { useState } from 'react';
import axios from 'axios';

function BurnForm() {
    const [tokenId, setTokenId] = useState('');
    const [response, setResponse] = useState('');

    const handleBurn = async () => {
        try {
            const result = await axios.post('http://localhost:3000/api/issuer/burn', { tokenId });
            setResponse(`Burn successful: ${JSON.stringify(result.data)}`);
        } catch (error) {
            setResponse(`Error: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    return (
        <div>
            <h2>Burn Token</h2>
            <input 
                type="text" 
                placeholder="Enter Token ID" 
                value={tokenId} 
                onChange={(e) => setTokenId(e.target.value)}
            />
            <button onClick={handleBurn}>Burn</button>
            <div>{response}</div>
        </div>
    );
}

export default BurnForm;