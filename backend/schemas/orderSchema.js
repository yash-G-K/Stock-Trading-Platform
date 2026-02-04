const { Schema } = require("mongoose");

const orderschema = new Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    orderType: { type: String, required: true },
    productType: { type: String, required: true },
})

module.exports = {orderschema};
