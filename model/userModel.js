const mongoose = require('mongoose');
const bycript = require('bcryptjs');
const userModel = mongoose.Schema({
fullname :{
  typeof: 'string',
  required: [true , "Please enter your fullname to subscribe to the app  "],
  trim  : true ,
  unique : false
},
 email :{
  required: [true , "Please enter your email address to subscribe to the app"],
  trim : true , 
  unique : true ,
  match : [
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    "Please enter a valid email"
  ], 
  maxlength : 100, 
  minlength : 20   
 },
 password :{
  type : "string",
  required : [true , "please enter a valid password"],
  trim : true ,
  select : false , 
  minlength:[8, "Password must be at least 8 characters long"],
 },
 Role : {
  type : "string",
  default: "Clinet",  
 },

 resetToken : {
  type : String,
  required : false,
 default : undefined,
},


resetTokenExpire : {
  type : Date,
  required : false,
  default : undefined,
},


createdAt:{
  type: Date,
  default : Date.now()
 },
verificationCode :{
  type : String ,     
}
,
verificationCodeExpire :{
  type : Date, 
},


});
userModel.pre("save", async function(next){


  if(!this.isModified("password")) return next();
  const gensalt =await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,gensalt);
  next();
});

userModel.methods.matchPassword = function(password){
  return bcrypt.compare(password, this.password);

}
module.exports = mongoose.model('User',userModel);