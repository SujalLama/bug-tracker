"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // store securely
const registerUser = async (username, email, password, role) => {
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    try {
        const user = await client_1.default.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role,
            },
        });
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await client_1.default.user.findUnique({ where: { email } });
    if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
        throw new Error("Invalid credentials");
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "7d",
    });
    return { token, user };
};
exports.loginUser = loginUser;
const getAllUsers = async () => {
    return await client_1.default.user.findMany();
};
exports.getAllUsers = getAllUsers;
