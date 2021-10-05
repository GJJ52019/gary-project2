// Dependencies 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Tool Schema
const toolSchema = Schema({
    num: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    dateCal: { type: String, required: true },
    dateDue: { type: String, required: true },
    inspector: { type: String, required: true },
    // img: { type: String, required: false }
});

// tool Model
const Tool = mongoose.model('Tool', toolSchema);

// Export tool Model
module.exports = Tool;