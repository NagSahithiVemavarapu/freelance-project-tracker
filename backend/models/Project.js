const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },

    projectTitle: {
        type: String,
        required: true
    },

    budget: {
        type: Number,
        required: true
    },

    deadline: {
        type: Date,
        required: true
    },

    isCompleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Project", projectSchema);