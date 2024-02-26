import { Request, Response } from 'express';
import { IItem, ItemCreationRequest, ItemUpdateRequest, TypedRequestBody } from '../types/types';
import { create, readAll, deleteItemById, findById, updateItemById } from '../models/item.model';

/**
 * This function handles the addition of a new item. It expects a request object with the following properties:
 *  - name: string
 * - price: number
 * @param {Request} req - The request object that includes the item details.
 * @param {Response} res - The response object that will be used to send the HTTP response.
 * @returns {Response} Returns an HTTP response that includes one of the following:
 *  - A 201 CREATED status code if the item was added successfully
 * - A 500 INTERNAL SERVER ERROR status code if an error occurred
*/
export const addItem = async (req: TypedRequestBody<ItemCreationRequest>, res: Response) => {
  try {
    //sanitization and validation logic implemented in middleware
    const newItem: IItem = {
      ...req.body,
      id: Math.floor(Math.random() * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await create(newItem);
    res.status(201).json({ message: 'Item added successfully', data: newItem });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}


/**
 * This function retrieves all items from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object that will be used to send the HTTP response.
 * @returns {Response} Returns an HTTP response that includes one of the following:
 *  - A 200 OK status code and a list of items if the items were retrieved successfully
 * - A 500 INTERNAL SERVER ERROR status code if an error occurred
*/
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const {  } = req.query;
    const items = await readAll();
    res.status(200).json({
      message: 'Items retrieved successfully',
      data: items
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

/**
 * This function retrieves an item by its id.
 * @param {Request} req - The request object that includes the item id.
 * @param {Response} res - The response object that will be used to send the HTTP response.
 * @returns {Response} Returns an HTTP response that includes one of the following:
 *  - A 200 OK status code and the item if the item was retrieved successfully
 * - A 404 NOT FOUND status code if the item was not found
 * - A 500 INTERNAL SERVER ERROR status code if an error occurred
*/
export const getItemById = async (req: Request, res: Response) => {
  try {
    //sanitization and validation logic implemented in middleware
    const { id } = req.params;
    //convert id to a number
    const itemId = parseInt(id ?? '');
    const item = await findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

/**
 * This function updates an item by its id. It expects a request object with the following properties:
 *  - name: string
 * - price: number
 * @param {Request} req - The request object that includes the item id and the updated item details.
 * @param {Response} res - The response object that will be used to send the HTTP response.
 * @returns {Response} Returns an HTTP response that includes one of the following:
 *  - A 200 OK status code if the item was updated successfully
 * - A 404 NOT FOUND status code if the item was not found
 * - A 500 INTERNAL SERVER ERROR status code if an error occurred
*/
export const updateItem = async (req: Request<{ id: string }, {}, ItemUpdateRequest>, res: Response) => {
  try {
    //sanitization and validation logic implemented in middleware
    const { id } = req.params;
    const itemId = parseInt(id);
    const updateData = req.body;
    const existingItem = await findById(itemId);
    if (!existingItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    const updatedItem = await updateItemById(itemId, {
      ...existingItem,
      ...updateData,
      updatedAt: new Date(),
    });
    res.status(200).json({ message: 'Item updated successfully', data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

/**
 * This function deletes an item by its id.
 * @param {Request} req - The request object that includes the item id.
 * @param {Response} res - The response object that will be used to send the HTTP response.
 * @returns {Response} Returns an HTTP response that includes one of the following:
 * - A 200 OK status code if the item was deleted successfully
 * - A 404 NOT FOUND status code if the item was not found
 * - A 500 INTERNAL SERVER ERROR status code if an error occurred
 * */
export const deleteItem = async (req: Request, res: Response) => {
  try {
    //sanitization and validation logic implemented in middleware
    const { id } = req.params;
    const itemId = parseInt(id ?? '');
    const item = await findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    await deleteItemById(itemId);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
