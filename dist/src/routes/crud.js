"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crudModel_1 = require("../model/crudModel");
const routes = (0, express_1.Router)();
routes.post("/contact", async (req, res) => {
    const { fullName, phoneNumber } = req.body;
    const contact = await crudModel_1.contactsCollection.create({ fullName, phoneNumber });
    res.status(201).send({
        message: "New contact created successfully",
        data: contact,
    });
});
routes.get("/contacts", async (req, res) => {
    const contact = await crudModel_1.contactsCollection.find({});
    res.send({
        message: "All contact retrieved successfully",
        data: contact,
    });
});
routes.get("/contacts/:id", async (req, res) => {
    const { id } = req.params;
    const contact = await crudModel_1.contactsCollection.findById(id);
    res.send({
        message: "Contact retrieved successfully",
        data: contact,
    });
});
routes.get("/contacts/:phoneNumber", async (req, res) => {
    const { phoneNumber } = req.params;
    if (!phoneNumber) {
        return res.status(400).send({
            message: "Phone number is required",
        });
    }
    const contact = await crudModel_1.contactsCollection.findOne({ phoneNumber });
    if (!contact) {
        return res.status(404).send({
            message: "Contact not found",
        });
    }
    res.send({
        message: "Contact retrieved successfully",
        data: contact,
    });
});
routes.put("/contacts/:id", async (req, res) => {
    const { id } = req.params;
    const { fullName, phoneNumber } = req.body;
    const contact = await crudModel_1.contactsCollection.findByIdAndUpdate(id, {
        fullName,
        phoneNumber,
    }, { new: true });
    res.send({
        message: "Contact updated successfully",
        data: contact,
    });
});
routes.patch("/contacts/:id", async (req, res) => {
    const { id } = req.params;
    const { fullName } = req.body;
    const contact = await crudModel_1.contactsCollection.findByIdAndUpdate(id, {
        fullName,
    }, { new: true });
    res.send({
        message: "Contact updated successfully",
        data: contact,
    });
});
routes.delete("/contacts/:id", async (req, res) => {
    const { id } = req.params;
    const contact = await crudModel_1.contactsCollection.findByIdAndDelete(id);
    res.send({
        message: "Contact deleted successfully",
        data: contact,
    });
});
exports.default = routes;
