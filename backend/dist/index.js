"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coordinate_routes_1 = require("./routes/coordinate-routes");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/weather', coordinate_routes_1.weatherRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port} unuganga`);
});
