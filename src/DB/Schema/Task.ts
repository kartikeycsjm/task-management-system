import mongoose, { Schema, models, model } from "mongoose";

const UserRefSchema = new Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true }
  },
  { _id: false } // prevent Mongoose from creating a separate _id for this subdocument
)


const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  status: {
    type: String,
    enum: ["todo", "in-progress", "completed"],
    default: "todo",
  },
  assignedTo: {
    type: UserRefSchema,
    required: true,
  },
  createdBy: {
    type: UserRefSchema,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Task || model("Task", TaskSchema);
