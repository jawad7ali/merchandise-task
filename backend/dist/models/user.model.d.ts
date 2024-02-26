import { User } from '../types/types';
export declare function addUser(newUser: User): Promise<void>;
export declare function findUserByUsername(username: string): Promise<User | undefined>;
