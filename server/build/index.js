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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const data_json_1 = __importDefault(require("./data.json"));
const port = 4000;
const cors_1 = __importDefault(require("cors"));
const uuidv4_1 = require("uuidv4");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract limit and skip from the query parameters
        const limit = parseInt(req.query.limit) || 100;
        const skip = parseInt(req.query.skip) || 0;
        console.log({ skip, limit });
        // Call the fethQueryData function with the provided limit and skip
        const response = yield fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        const restData = __rest(yield response.json(), []);
        // Extract the desired range of data based on limit and skip
        // Create an object with both slicedData and restData
        const responseData = Object.assign({ length: data_json_1.default.products.slice(skip, skip + limit).length, products: data_json_1.default.products.slice(skip, skip + limit) }, restData);
        // Send the object as JSON response
        res.json(responseData);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
let arr = [];
app.post("/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title = "", description } = req.body;
    const data = { id: (0, uuidv4_1.uuid)(), title, description };
    arr.push(data);
    console.log(req.body);
    res.json({ todo: arr, total: arr.length });
}));
app.get("/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = parseInt(req.query.limit) || 100;
    const skip = parseInt(req.query.skip) || 0;
    const slicedTodo = arr.slice(skip, limit + skip);
    console.log(arr);
    res.json({ todos: slicedTodo, total: arr.length });
}));
app.get("/single/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredData = arr.find((_, i) => _.id === String(req.params.id));
    res.json({ todo: filteredData });
}));
app.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedData = arr.filter((_, i) => _.id === String(req.params.id));
    arr = deletedData;
    res.json({ todos: arr, total: arr.length });
}));
app.patch("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title = "", description } = req.body;
    const updatedTodos = arr.map((todo, i) => todo.id === String(req.params.id) ? Object.assign(Object.assign({}, todo), { title, description }) : todo);
    console.log(updatedTodos);
    arr = updatedTodos;
    res.json({ todo: arr, total: arr.length });
}));
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
