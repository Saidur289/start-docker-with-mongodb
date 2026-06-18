import { Router, type Request, type Response } from "express";
import { contactsCollection } from "../model/crudModel";

const routes = Router();

routes.post("/contact", async (req: Request, res: Response) => {
  const { fullName, phoneNumber } = req.body;

  const contact = await contactsCollection.create({ fullName, phoneNumber });

  res.status(201).send({
    message: "New contact created successfully",
    data: contact,
  });
});

routes.get("/contacts", async (req: Request, res: Response) => {
  const contact = await contactsCollection.find({});

  res.send({
    message: "All contact retrieved successfully",
    data: contact,
  });
});

routes.get("/contacts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const contact = await contactsCollection.findById(id);

  res.send({
    message: "Contact retrieved successfully",
    data: contact,
  });
});

routes.get("/contacts/:phoneNumber", async (req: Request, res: Response) => {
  const { phoneNumber } = req.params;
  if (!phoneNumber) {
    return res.status(400).send({
      message: "Phone number is required",
    });
  }
  const contact = await contactsCollection.findOne({ phoneNumber });

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

routes.put("/contacts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const { fullName, phoneNumber } = req.body;

  const contact = await contactsCollection.findByIdAndUpdate(
    id,
    {
      fullName,
      phoneNumber,
    },
    { new: true },
  );

  res.send({
    message: "Contact updated successfully",
    data: contact,
  });
});

routes.patch("/contacts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const { fullName } = req.body;

  const contact = await contactsCollection.findByIdAndUpdate(
    id,
    {
      fullName,
    },
    { new: true },
  );

  res.send({
    message: "Contact updated successfully",
    data: contact,
  });
});

routes.delete("/contacts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const contact = await contactsCollection.findByIdAndDelete(id);

  res.send({
    message: "Contact deleted successfully",
    data: contact,
  });
});

export default routes;
