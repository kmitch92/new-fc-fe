import mongoose from 'mongoose';
const connectionUrl = process.env.MONGODB_URI as string;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(connectionUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('Error Encountered: ', err);
    process.exit(1);
  }
};
export default connectDB;
