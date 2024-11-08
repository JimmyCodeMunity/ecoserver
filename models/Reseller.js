const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const resellerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name!"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your shop email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password should be greater than 6 characters"],
    select: true,
  },
  companyName: {
    type: String,
    required: [true, "Please enter your shop mame"],
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  roles: {
    type: String,
    default: "Reseller",
  },
  status: {
    type: String,
    enum: ["Not approved", "Approved", "On Hold", "Rejected"],
    default: "Not approved",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

// // Hash password before saving
// userSchema.pre("save", async function () {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
// });

// // Compare password
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const Reseller = mongoose.model('Reseller', resellerSchema);

module.exports = Reseller;
