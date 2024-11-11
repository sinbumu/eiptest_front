import React from 'react';
import MintForm from './components/MintForm';
import CredentialForm from './components/CredentialForm';
import VerifyForm from './components/VerifyForm';
import BurnForm from './components/BurnForm';
import TransferForm from './components/TransferForm';

function App() {
  return (
    <div>
      <h1>Blockchain API Demo</h1>
      <MintForm />
      <CredentialForm />
      <VerifyForm />
      <BurnForm />
      <TransferForm />
    </div>
  );
}

export default App;
