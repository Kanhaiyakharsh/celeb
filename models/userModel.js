// import mongoose from "mongoose"

// const userSchema = new mongoose.Schema({
//     name:{type:String,required:true},
//     email:{type:String,required:true, unique:true},
//     password:{type:String,required:true},
    
    
// },{minimize:false})

// // const userModel = mongoose.models.user || mongoose.model("user", userSchema);
// // export default userModel;

// const userModel = mongoose.models.user || mongoose.model("user", userSchema);
// export default userModel;



// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { 
//     type: String, 
//     enum: ["User", "Manager", "Admin"], 
//     default: "User" 
//   },
// }, { minimize: false });

// // Use existing model if available or create a new one
// const userModel = mongoose.models.user || mongoose.model("user", userSchema);
// export default userModel;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["User", "Manager", "Admin"], 
    default: "User" 
  },
}, { minimize: false });

// Use existing model if available or create a new one
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
