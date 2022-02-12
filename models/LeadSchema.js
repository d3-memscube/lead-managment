const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    assignee: {
        type: String,
        required: true,
    },
    leadStatus: {
        type: String,
        required: true,
    },
    leadSource: {
        type: String,
        required: true,
    },
    leadRating: {
        type: Number,
        required: true,
    },

    phone: {
        type: Number,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
});


const Lead = mongoose.model("Lead", LeadSchema);

module.exports = Lead;
