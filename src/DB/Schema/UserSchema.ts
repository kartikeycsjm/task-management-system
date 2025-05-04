import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    verified: {
        type: Boolean,
        require: true,
        default: false
    },
    password: {
        type: String
    },
    resetToken: {
        type: String
    },
    resetTokenExpiry: {
        type: Number
    },
}, { timestamps: true });
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;