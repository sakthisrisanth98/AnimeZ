import PocketBase from 'pocketbase';

export const getPocketBaseUrl = () => {
  return process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';
};

export const pb = new PocketBase(getPocketBaseUrl());