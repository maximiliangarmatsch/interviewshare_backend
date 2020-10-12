import { pool } from '../models/pool';

const { Client } = require('pg');

const client = new Client({
  host: 'ec2-54-234-28-165.compute-1.amazonaws.com',
  Database: 'dfekdi7t2gg22p',
  port: 5432,
  user: 'nxazfopnohbptg',
  password: 'fc51d289538ff4bba19bdae4f6c8995375772bc19fdb5005214718c2ffc9944b',
});
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});
