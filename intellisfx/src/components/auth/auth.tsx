import { useState } from 'react';
import { LoginForm } from './login-form';
import { SignUpForm } from './signup-form';

export function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? <LoginForm /> : <SignUpForm />}
      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? 'Need to create an account?' : 'Already have an account?'}
      </button>
    </div>
  );
}