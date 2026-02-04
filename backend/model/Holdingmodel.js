const mongoose = require("mongoose");
const HoldingsSchema = require("../schemas/holdingsSchema");

const Holdingmodel = mongoose.model("Holding", HoldingsSchema);

module.exports = Holdingmodel;
