"use strict";
// aca va en token para el login
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const JWT = require("jsonwebtoken");
const { User } = require("../models");
exports.signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Auth -> signIn", req.body);
    try {
        const { username, password } = req.body;
        const user = yield User.login(username, password);
        console.log(user);
        if (!user) {
            res.json({ error: "user / password combination does not exists" });
            return;
        }
        const token = JWT.sign({ email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        res.json({ token, email: user.email, name: user.name });
    }
    catch (e) {
        console.error(e);
        res.send(e);
    }
});
