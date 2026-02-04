const { Schema } = require("mongoose");

// Define the user schema
const userSchema = new Schema({
    // User's full name
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name cannot exceed 50 characters"]
    },

    // Email address (unique identifier)
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },

    // Password (will be hashed before saving)
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },

    // Phone number (optional)
    phone: {
        type: String,
        trim: true,
        match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"]
    },

    // Account creation timestamp
    createdAt: {
        type: Date,
        default: Date.now
    },

    // Last updated timestamp
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = { userSchema };
