import PocketBase from 'pocketbase';

export const getPocketBaseUrl = () => {
  return 'http://127.0.0.1:8090';
};

export const pb = new PocketBase(getPocketBaseUrl());