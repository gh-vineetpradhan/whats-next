import mongoose from "mongoose";

export interface IItem {
  title: string;
  playlistId: string;
  rating: number;
  hasChecked: boolean;
  image: string;
  userId: string;
  description: string;
  date: string;
}

const itemSchema = new mongoose.Schema<IItem>(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      required: [true, "Please enter Releasing date"],
    },
    playlistId: {
      type: String,
      required: [true, "Please enter a playlistId"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    hasChecked: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "",
    },
    userId: {
      type: String,
      required: [true, "Please enter userId"],
    },
  },
  { timestamps: true }
);

const Item = mongoose.models.item || mongoose.model("item", itemSchema);

export default Item;
