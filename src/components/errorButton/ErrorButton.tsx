import React, { useState } from 'react';
import './errorButton.scss';
import Button from '../button/Button';

const ErrorButton: React.FC = () => {
  const [error, setError] = useState(false);
  if (error) {
    throw new Error('I crashed!');
  }
  return (
    <Button
      disabled={false}
      text="Throw an error"
      click={() => setError(true)}
    ></Button>
  );
};

export default ErrorButton;
