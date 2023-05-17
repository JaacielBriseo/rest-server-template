import mongoose from 'mongoose';

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || '');
    console.log(`DB Online`);
    
  } catch (error) {
    console.log(error);
    throw new Error('Error initializing DB. Check server logs')
  }
};
