'use client';
import { useState } from 'react';
import { useAuth, AuthContextType } from '../contexts/AuthContext';

type error = string | null;

export default function Login({
  setIsLoggingIn,
}: {
  setIsLoggingIn: Function;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<error>(null);
  const { login }: AuthContextType = useAuth();

  async function submitHandler() {
    if (login) {
      if (!email || !password) {
        setError('Please enter an email and password');
      } else {
        try {
          await login(email, password);
        } catch (error) {
          console.log(error);
          setError('Incorrect email or password');
        }
      }
    }
  }
  //

  return (
    // <form className="hero-content flex-col ">
    //   <h1 className="text-2xl sm:text-5xl font-extrabold text-primary">
    //     LOGIN
    //   </h1>
    //   {error && (
    //     <div className="prose w-full p-3 max-w-[40ch] border rounded-md border-rose-400 bg-rose-400 text-base-100">
    //       {error}
    //     </div>
    //   )}
    //   <input
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     type="email"
    //     name="email"
    //     autoComplete="on"
    //     placeholder="Email Address"
    //     className="prose input input-bordered w-full p-2 max-w-[40ch]  border-primary input-primary border-2"
    //   />
    //   <input
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     type="password"
    //     name="password"
    //     autoComplete="on"
    //     placeholder="Password"
    //     className="input bg-base-100 input-bordered input-primary w-full p-2 max-w-[40ch]  border-primary border-2"
    //   />

    //   <button
    //     className="btn text-base-100 sm:btn-wide btn-primary text-lg"
    //     onClick={submitHandler}
    //   >
    //     Login
    //   </button>
    //   <h3 className="text-secondary prose">Haven't registered yet?</h3>
    //   <button
    //     className="btn text-base-100 btn-primary "
    //     onClick={() => setIsLoggingIn(false)}
    //   >
    //     Register
    //   </button>
    // </form>
    <h1>Blah</h1>
  );
}
