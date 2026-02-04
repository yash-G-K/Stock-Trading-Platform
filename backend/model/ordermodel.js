const { model } = require("mongoose");

const { orderschema } = require("../schemas/orderSchema");

const ordermodel = new model("order", orderschema);

module.exports = { ordermodel, orderschema };