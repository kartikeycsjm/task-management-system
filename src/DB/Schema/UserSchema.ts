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
        default: true
    },
    password: {
        type: String
    }
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;