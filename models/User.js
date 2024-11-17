const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema =  new mongoose.Schema({
    email: {
         type : String,
         required : [true,'Email is required'],
         unique : true,
         lowercase : true,
         validate : [isEmail,'Please enter a valid email']
    },

    password: {
        type : String,
        required : [true,' minimum length is 3'],
        minlength: 3
    },
})
// mongoose hooks
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
userSchema.statics.login = async function (email,password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
           
            return user;
        }
        throw Error('incorrect password');
    }
   
        
        throw Error('incorrect email');
}
                           //collection name // schema used
const User = mongoose.model('user',userSchema);

module.exports = User;