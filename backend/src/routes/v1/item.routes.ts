import express from 'express';
import * as itemsController from '../../controllers/items.controller';
import validate from '../../middleware/validate';
import { addItemPayload, editPayload, updateItemPayload } from '../../validations/item.validation';

const itemsRouter = express.Router();

itemsRouter.get('/', itemsController.getAllItems);
itemsRouter.post('/', validate(addItemPayload), itemsController.addItem);
itemsRouter.get('/:id', validate(editPayload), itemsController.getItemById);
itemsRouter.put('/:id', validate(updateItemPayload), itemsController.updateItem);
itemsRouter.delete('/:id', itemsController.deleteItem);


export default itemsRouter;
