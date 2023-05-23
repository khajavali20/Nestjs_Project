import dotenv from 'dotenv';
dotenv.config();

const mongodbConfig = {
  uri: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`,
};

export default mongodbConfig;
