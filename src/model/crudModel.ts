import { Schema, model } from "mongoose";

const myContactsSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const contactsCollection = model("contacts", myContactsSchema);

export { contactsCollection };
