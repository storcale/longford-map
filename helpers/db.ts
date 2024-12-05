import mongoose, { Mongoose } from 'mongoose';

const DATABASE_URL = process.env.DB_URL as string;

if (!DATABASE_URL) {
  throw new Error('Missing DB URL in .env');
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn:  Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}
global.mongoose = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    global.mongoose.promise = mongoose.connect(DATABASE_URL, opts);
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

export default connectDB;
