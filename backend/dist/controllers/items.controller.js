"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.getItemById = exports.getAllItems = exports.addItem = void 0;
const item_model_1 = require("../models/item.model");
const addItem = async (req, res) => {
    try {
        const newItem = {
            ...req.body,
            id: Math.floor(Math.random() * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await (0, item_model_1.create)(newItem);
        res.status(201).json({ message: 'Item added successfully', data: newItem });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.addItem = addItem;
const getAllItems = async (req, res) => {
    try {
        const {} = req.query;
        const items = await (0, item_model_1.readAll)();
        res.status(200).json({
            message: 'Items retrieved successfully',
            data: items
        });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.getAllItems = getAllItems;
const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const itemId = parseInt(id ?? '');
        const item = await (0, item_model_1.findById)(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.getItemById = getItemById;
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const itemId = parseInt(id);
        const updateData = req.body;
        const existingItem = await (0, item_model_1.findById)(itemId);
        if (!existingItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        const updatedItem = await (0, item_model_1.updateItemById)(itemId, {
            ...existingItem,
            ...updateData,
            updatedAt: new Date(),
        });
        res.status(200).json({ message: 'Item updated successfully', data: updatedItem });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const itemId = parseInt(id ?? '');
        const item = await (0, item_model_1.findById)(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        await (0, item_model_1.deleteItemById)(itemId);
        res.status(200).json({ message: 'Item deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.deleteItem = deleteItem;
//# sourceMappingURL=items.controller.js.map