import { IItem, IItemUpdate } from '../types/types';
export declare function readAll(): Promise<IItem[]>;
export declare function create(newItem: IItem): Promise<void>;
export declare function findById(id: number): Promise<IItem | undefined>;
export declare function deleteItemById(id: number): Promise<void>;
export declare function updateItemById(id: number, updatedItemInfo: Partial<IItemUpdate>): Promise<IItem | undefined>;
