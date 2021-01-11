import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      minlength: 10,
      maxlength: 12,
    },
    gender: String,
    typeOfCustomer: {
      type: String,
      required: [true, "Please add type of customer"],
    },
    otp: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    aadhaar: {
      type: String,
      unique: true,
      minlength: 12,
      maxlength: 12,
    },
    company: String,
    gst: {
      type: String,
      unique: true,
      minlength: 15,
      maxlength: 15,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
