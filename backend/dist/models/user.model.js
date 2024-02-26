"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByUsername = exports.addUser = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const usersFilePath = path_1.default.resolve(process.cwd(), 'src', 'models', 'users.json');
async function readUsers() {
    const data = await promises_1.default.readFile(usersFilePath, 'utf8');
    return JSON.parse(data);
}
async function addUser(newUser) {
    const users = await readUsers();
    users.push(newUser);
    await promises_1.default.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}
exports.addUser = addUser;
async function findUserByUsername(username) {
    const users = await readUsers();
    return users.find((user) => user.username === username);
}
exports.findUserByUsername = findUserByUsername;
//# sourceMappingURL=user.model.js.map