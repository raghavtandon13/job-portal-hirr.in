import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
});

const User = mongoose.model('User', userSchema);

export default User;
