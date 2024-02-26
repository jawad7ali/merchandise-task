import { Request, Response } from 'express';
import { ItemCreationRequest, ItemUpdateRequest, TypedRequestBody } from '../types/types';
export declare const addItem: (req: TypedRequestBody<ItemCreationRequest>, res: Response) => Promise<void>;
export declare const getAllItems: (req: Request, res: Response) => Promise<void>;
export declare const getItemById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateItem: (req: Request<{
    id: string;
}, {}, ItemUpdateRequest>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
