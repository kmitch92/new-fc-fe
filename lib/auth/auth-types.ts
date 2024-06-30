import type { Session, User } from 'next-auth';

export interface MySession extends Session {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}
export interface MyUser extends User {
  id: string;
  name: string;
  email: string;
}

export interface Credentials {
  email: string;
  password: string;
}
