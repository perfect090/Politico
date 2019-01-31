import { Client } from 'pg';
import dotenv from 'dotenv';
import { userTable } from './tables';

dotenv.config();

const client = new Client({
  connectionString: process.env.DB_URI,
  SSL: true
});

const create = async () => {
  try {
    await client.connect();
    await client.query(userTable);
    await client.end();
    console.log('User and Record tables created successfully');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

create();
