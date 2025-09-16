// AngularApp\echodrop\backend\src\models\User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // only for manual login
  googleId: { type: String, sparse: true, unique: true },
  profilePicture: String,
  googleAccessToken: String, // New field for Google API access token
  googleRefreshToken: String, // New field for Google API refresh token
});

export default mongoose.model("User", userSchema);
