import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: { type: String, required: true },
  name: { type: String, required: true },
  bio: String,
  image: String,
  onBoarded: {
    type: Boolean,
    required: true,
    default: false,
  },
  community: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Threads",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
