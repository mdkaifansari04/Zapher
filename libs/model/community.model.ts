import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  username: { type: String, default: "@thread-org" },
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
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  createdAt: { type: Date, default: Date.now() },
});

const Community =
  mongoose.models.Community || mongoose.model("Community", communitySchema);

export default Community;
