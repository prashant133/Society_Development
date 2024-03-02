// validate the email format
const emailValidation = (email)=> {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
}

module.exports = emailValidation;