import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bio: String,
  image: String,
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: { type: Date, default: Date.now() },
  onBoarded: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Community =
  mongoose.models.Community || mongoose.model("Community", communitySchema);

export default Community;
