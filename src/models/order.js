import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    productId: Number,
    quantity: Number,
    price: Number
});

const OrderSchema = new mongoose.Schema(
    {
        orderId: { type: String, required: true, unique: true },
        value: Number,
        creationDate: Date,
        items: [ItemSchema]
    },
    { versionKey: "__v" }
);

export default mongoose.model("Order", OrderSchema);