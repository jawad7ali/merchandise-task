"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemById = exports.deleteItemById = exports.findById = exports.create = exports.readAll = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const itemsFilePath = path_1.default.resolve(process.cwd(), 'src', 'models', 'items.json');
async function read() {
    const data = await promises_1.default.readFile(itemsFilePath, 'utf8');
    return JSON.parse(data);
}
async function readAll() {
    const items = await read();
    return [...items];
}
exports.readAll = readAll;
async function create(newItem) {
    const items = await read();
    items.push(newItem);
    await promises_1.default.writeFile(itemsFilePath, JSON.stringify(items, null, 2), 'utf8');
}
exports.create = create;
async function findById(id) {
    const items = await read();
    return items.find(item => item.id === id);
}
exports.findById = findById;
async function deleteItemById(id) {
    const items = await read();
    const updatedItems = items.filter(item => item.id !== id);
    await promises_1.default.writeFile(itemsFilePath, JSON.stringify(updatedItems, null, 2), 'utf8');
}
exports.deleteItemById = deleteItemById;
async function updateItemById(id, updatedItemInfo) {
    const items = await read();
    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex === -1)
        return undefined;
    const currentItem = items[itemIndex];
    const updatedItem = {
        ...currentItem,
        ...updatedItemInfo,
        id,
        updatedAt: new Date(),
    };
    items[itemIndex] = updatedItem;
    await promises_1.default.writeFile(itemsFilePath, JSON.stringify(items, null, 2), 'utf8');
    return updatedItem;
}
exports.updateItemById = updateItemById;
//# sourceMappingURL=item.model.js.map