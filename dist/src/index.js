"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const crud_1 = __importDefault(require("./routes/crud"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4001;
const url = process.env.MONGO_DB_URL;
mongoose_1.default
    .connect(url)
    .then(() => {
    console.log("Connected to database");
})
    .catch((error) => {
    console.log("Error:", error);
});
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/crud", crud_1.default);
app.use(function (req, res, next) {
    res.status(404).send({
        message: "Route not found",
    });
});
app.listen(port, () => {
    console.log("The server is up...");
});
