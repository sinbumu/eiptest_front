// TransferForm.js
import React, { useState } from 'react';
import axios from 'axios';

function TransferForm() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [response, setResponse] = useState('');

    const handleTransfer = async () => {
        try {
            const result = await axios.post('http://localhost:3000/api/issuer/transfer', { from, to, tokenId });
            setResponse(`Transfer successful: ${JSON.stringify(result.data)}`);
        } catch (error) {
            setResponse(`Error: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    return (
        <div>
            <h2>Transfer Token</h2>
            <input 
                type="text" 
                placeholder="Enter From Address" 
                value={from} 
                onChange={(e) => setFrom(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Enter To Address" 
                value={to} 
                onChange={(e) => setTo(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Enter Token ID" 
                value={tokenId} 
                onChange={(e) => setTokenId(e.target.value)}
            />
            <button onClick={handleTransfer}>Transfer</button>
            <div>{response}</div>
        </div>
    );
}

export default TransferForm;
