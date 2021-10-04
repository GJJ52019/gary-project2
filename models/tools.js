// Dependencies 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Tool Schema
const toolSchema = Schema({
    num: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    dateCal: { type: String, required: true },
    dateDue: { type: String, required: true },
    inspector: { type: String, required: true },
    img: {type: String, required: false}
});

// User Model
const Tool = mongoose.model('Tool', toolSchema);

// Export User Model
module.exports = Tool;