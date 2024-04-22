'use client';
import { useState } from 'react';
import { useAuth, AuthContextType } from '../contexts/AuthContext';

type error = string | null;

export default function Register({
  setIsLoggingIn,
}: {
  setIsLoggingIn: Function;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<error>(null);

  const [updates, setUpdates] = useState(true);
  const { signup }: AuthContextType = useAuth();

  async function submitHandler() {
    if (signup) {
      if (!email || !password) {
        setError('Please enter an email and password');
      } else {
        try {
          await signup(email, password);
        } catch (error) {
          console.log(error);
          setError('Something went wrong, please try again later');
        }
      }
    }
  }

  return (
    <form className="hero-content flex-col ">
      <h1 className="text-2xl sm:text-5xl font-extrabold text-primary">
        REGISTER
      </h1>
      {error && (
        <div className="prose w-full p-3 max-w-[40ch] border rounded-md border-rose-400 bg-rose-400 text-base-100">
          {error}
        </div>
      )}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        autoComplete="on"
        placeholder="Email Address"
        className="prose input input-bordered w-full p-2 max-w-[40ch]  border-primary input-primary border-2"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
        autoComplete="on"
        placeholder="Password"
        className="input bg-base-100 input-bordered input-primary w-full p-2 max-w-[40ch]  border-primary border-2"
      />

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
      <button
        className="btn text-base-100 sm:btn-wide btn-primary text-lg"
        onClick={submitHandler}
      >
        Register
      </button>
      <h3 className="text-secondary prose">Already registered?</h3>
      <button
        className="btn text-base-100 btn-primary "
        onClick={() => setIsLoggingIn(true)}
      >
        Login
      </button>
    </form>
  );
}
