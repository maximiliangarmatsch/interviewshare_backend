import dotenv from 'dotenv';
import { useQuery } from '@apollo/client';
import { connectionString } from '../settings/ApolloClient';

export const pool = new Pool({ connectionString });
