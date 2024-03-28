'use client';
import { useState } from 'react';
import { useAuth, AuthContextType } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

type error = string | null;
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<error>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [updates, setUpdates] = useState(true);
  const { login, signup }: AuthContextType = useAuth();
  const router = useRouter();

  async function submitHandler() {
    if (!email || !password) {
      setError('Please enter an email and password');
    }
    if (isLoggingIn && login) {
      try {
        await login(email, password);
      } catch {
        setError('Incorrect email or password');
      }
      router.push('/home');
      return;
    }
    if (signup) {
      try {
        await signup(email, password);
      } catch {
        setError('Something went wrong, please try again later');
      }
    }
    if (login) {
      try {
        await login(email, password);
      } catch {
        setError('Something went wrong, please try again later');
      }
    }
    router.push('/home');
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <h1 className="text-2xl sm:text-5xl font-extrabold text-primary">
          {isLoggingIn ? 'LOGIN' : 'REGISTER'}
        </h1>
        {error && (
          <div className="prose w-full p-3 max-w-[40ch] border rounded-md border-rose-400 bg-rose-400 text-base-100">
            {error}
          </div>
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email Address"
          className="prose input input-bordered w-full p-2 max-w-[40ch]  border-primary input-primary border-2"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="input bg-base-100 input-bordered input-primary w-full p-2 max-w-[40ch]  border-primary border-2"
        />
        {!isLoggingIn && (
          <div className="form-control text-neutral flex flex-col items-center justify-center">
            <label className="label cursor-pointer">
              <span className="label-text prose text-neutral font-semibold mr-2">
                Subscribe to updates
              </span>
              <input
                type="checkbox"
                checked={updates ? true : false}
                className="checkbox checkbox-primary"
                onClick={() => setUpdates(!updates)}
              />
            </label>
          </div>
        )}
        <button
          className="btn text-accent sm:btn-wide btn-primary text-lg"
          onClick={submitHandler}
        >
          {!isLoggingIn ? 'Register' : 'Login'}
        </button>
        <h3 className="text-neutral prose">
          {isLoggingIn ? "Haven't registered yet?" : 'Already registered?'}
        </h3>
        <button
          className="btn text-accent btn-primary "
          onClick={() => setIsLoggingIn(!isLoggingIn)}
        >
          {isLoggingIn ? 'Register' : 'Login'}
        </button>
      </div>
    </div>
  );
}
