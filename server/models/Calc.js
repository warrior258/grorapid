const mongoose = require('mongoose');

const CalcSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    value: {
        type: String,
        required: [true, "value is required"]
    },
    result: {
        type: String,
        required: [true, "result is required"]
    }
});

module.exports = mongoose.model('Calc', CalcSchema);