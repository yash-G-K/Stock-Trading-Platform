const { model } = require("mongoose");

const positionSchema = require("../schemas/positionSchemas");

const positionmodel = model("Position", positionSchema);

module.exports = positionmodel;