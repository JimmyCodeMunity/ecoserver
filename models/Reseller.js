const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const resellerSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
    select: true,
  },
  companyName: {
    type: String
  },
  address: {
    type: String
  },
  country: {
    type: String
  },
  phoneNumber: {
    type: Number
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
