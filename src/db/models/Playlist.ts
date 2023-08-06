import mongoose from "mongoose";

export interface IPlaylist {
  userId: string;
  title: string;
  type: "Movies" | "Games" | "Books";
}

const playlistSchema = new mongoose.Schema<IPlaylist>(
  {
    userId: {
      type: String,
      required: [true, "Please enter userId"],
    },
    title: {
      type: String,
      required: [true, "Please enter a title"],
      maxlength: [40, "Maximum title length is 40 characters"],
    },
    type: {
      type: String,
      default: "Books",
      enum: ["Movies", "Games", "Books"],
    },
  },
  { timestamps: true }
);

const Playlist =
  mongoose.models.playlist || mongoose.model("playlist", playlistSchema);

export default Playlist;
