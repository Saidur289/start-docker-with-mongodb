"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsCollection = void 0;
const mongoose_1 = require("mongoose");
const myContactsSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const contactsCollection = (0, mongoose_1.model)("contacts", myContactsSchema);
exports.contactsCollection = contactsCollection;
