import { Account, Client,ID } from 'appwrite';
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66659fc4001d18cf97eb');
export const ACCOUNT = new Account(client)
export const UNIQUE_ID = ID.unique();

