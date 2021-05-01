import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registeredOn: {
        type: Date,
        default: Date.now
    }
});

const profileModel = mongoose.model("profileModel", profileSchema);

export default profileModel;