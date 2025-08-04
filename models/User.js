import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    kindeUserId: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    given_name: String,
    family_name: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
