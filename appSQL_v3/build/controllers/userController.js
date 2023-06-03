"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { User } = require('../models');
exports.getAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User -> getAllUsers");
    const users = yield User.findAll();
    res.json(users);
});
exports.getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User -> getUserById");
    const { id } = req.params;
    const Users = yield User.findByPk(id);
    res.json(Users);
});
exports.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User -> createUser");
    const user = yield User.create(req.body);
    res.json(user);
});
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User -> deleteUser");
    const { id } = req.params;
    const user = User.findByPk(id);
    res.json({ message: `User ${user.firstName} ${user.lastName} has been deleted` });
});
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User -> updateUser");
    const { id } = req.params;
    const user = yield User.update(req.body, {
        returning: true,
        where: {
            id
        }
    });
    res.json(user);
});
