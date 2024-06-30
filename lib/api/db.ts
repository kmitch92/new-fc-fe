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

  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
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
