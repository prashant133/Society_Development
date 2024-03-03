const bcrypt = require("bcrypt")


// hasing the password with bcrypt 
const hashPassword= async (password)=>{
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }

}

// comparing the hashed password 
const comparePassword =  (password,hashedPassword)=> {
    try {
        return bcrypt.compare(password , hashedPassword)
        
    } catch (error) {
        console.log(error)
    }
}

// validate the password 
function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return regex.test(password);
}







module.exports = {hashPassword, comparePassword, validatePassword}