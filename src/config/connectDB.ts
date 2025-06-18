import { connect } from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await connect(process.env.MONGO_URI);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
