import fs from 'fs/promises';
import path from 'path';
import { IItem, IItemUpdate } from '../types/types';

const itemsFilePath = path.resolve(process.cwd(), 'src', 'models', 'items.json');

// Helper function to read items from the JSON file
async function read(): Promise<IItem[]> {
  const data = await fs.readFile(itemsFilePath, 'utf8');
  return JSON.parse(data) as IItem[];
}

// Read all items
export async function readAll(): Promise<IItem[]> {
  const items = await read();
  return [...items];
}

// Create a new item
export async function create(newItem: IItem): Promise<void> {
  const items = await read();
  items.push(newItem);
  await fs.writeFile(itemsFilePath, JSON.stringify(items, null, 2), 'utf8');
}

// Find an item by ID
export async function findById(id: number): Promise<IItem | undefined> {
  const items = await read();
  return items.find(item => item.id === id);
}

// Delete an item by ID
export async function deleteItemById(id: number): Promise<void> {
  const items = await read();
  const updatedItems = items.filter(item => item.id !== id);
  await fs.writeFile(itemsFilePath, JSON.stringify(updatedItems, null, 2), 'utf8');
}

// Update an item by ID
export async function updateItemById(id: number, updatedItemInfo: Partial<IItemUpdate>): Promise<IItem | undefined> {
  const items = await read();
  const itemIndex = items.findIndex(item => item.id === id);
  if (itemIndex === -1) return undefined; // Item not found

  // Existing item guarantees all required fields are present
  const currentItem = items[itemIndex];

  // Merge updates with current item data, ensuring all fields are defined
  const updatedItem: IItem = {
    ...currentItem,
    ...updatedItemInfo,
    id, // Ensure ID remains unchanged
    updatedAt: new Date(), // Always update the 'updatedAt' field
  };

  items[itemIndex] = updatedItem;

  await fs.writeFile(itemsFilePath, JSON.stringify(items, null, 2), 'utf8');
  return updatedItem;
}