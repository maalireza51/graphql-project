import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import * as graphqlPlayground from 'graphql-playground-middleware-express';
import schema from './schema/schema';
import cors from 'cors';
import connectDB from './config/db';
import dotenv from 'dotenv';

// configs
const app = express();
app.use(cors());
dotenv.config();
const expressPlayground = graphqlPlayground.default;
connectDB();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 5000;

app.all('/graphql', createHandler({ schema }));
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
