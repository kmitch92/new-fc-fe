'use server';
import mongoose from 'mongoose';
const connectionUrl = process.env.MONGODB_URI as string;

//@ts-ignore
let cached = global.mongoose || null;

if (!cached) {
  cached = { conn: null, promise: null };
}

export const connectDB = async () => {
  //   try {
  //     const conn = await mongoose.connect(connectionUrl);
  //     console.log(`MongoDB Connected: ${conn.connection.host}`);
  //   } catch (err) {
  //     console.error('Error Encountered: ', err);
  //     process.exit(1);
  //   }
  // };
  console.log('trying to connect to mongodb');
  mongoose.set('debug', true);
  mongoose.set('bufferCommands', false);

  if (cached.conn) {
    console.log('using cached connection');
    return cached.conn;
  }
  if (!cached.promise) {
    console.log('creating new connection');
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(connectionUrl, opts).then((mongoose) => {
      console.log('Db connected');
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};
