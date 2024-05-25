import UserModel from '../models/user';
import { IUserFE } from '../models/user';
import connectDB from '../db';
import bcryptjs from 'bcryptjs';

type UserX = Omit<IUserFE, 'createdAt' | 'updatedAt'>;
export const createUser = async (user: UserX) => {
  console.log('Request to add user: ', user);
  console.log(await connectDB());
  const userAdded: UserX = {
    ...user,
    password: bcryptjs.hashSync(user.password, 10),
  };
  console.log('Request to add user: ', userAdded);
  const finduser = await UserModel.findOne({
    email: userAdded.email,
  });
  if (finduser) throw new Error('User Found, Change Email');
  const newUser = await UserModel.create(userAdded);
  return newUser;
};
