import colors from 'colors';
import mongoose from 'mongoose';
const DB_URI = process.env.DB_URI;
const connectDB = async () => {
  try {
    const con = await mongoose.connect(DB_URI);
    console.log(
      colors.cyan(`DB conected:`),
      colors.cyan.underline(con.connection.host.toString())
    );
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
