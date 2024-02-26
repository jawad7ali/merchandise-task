import fs from 'fs/promises';
import path from 'path';
import { User } from '../types/types';

const usersFilePath = path.resolve(process.cwd(), 'src', 'models', 'users.json');

// Function to read users
async function readUsers(): Promise<User[]> {
  const data = await fs.readFile(usersFilePath, 'utf8');
  return JSON.parse(data) as User[]; // Explicitly cast the parsed data to an array of User
}

// Function to add a new user
export async function addUser(newUser: User): Promise<void> {
  const users = await readUsers();
  users.push(newUser); // Assume newUser is fully formed and valid
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}

export async function findUserByUsername(username: string): Promise<User | undefined> {
  const users = await readUsers();
  return users.find((user) => user.username === username); // No need to explicitly type 'user' as User, inferred by TypeScript
}