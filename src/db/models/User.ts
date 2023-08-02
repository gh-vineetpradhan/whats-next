import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /^[a-zA-Z0-9]+$/.test(v);
        },
        message: () => "Username can only contains alphabets and numbers",
      },
      minlength: [6, "Minimum username length is 6 characters"],
      maxlength: [20, "Maximum username length is 20 characters"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
