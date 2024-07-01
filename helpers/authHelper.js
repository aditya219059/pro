const bcrypt = require('bcrypt');

const hashPass = async (password) => {
    try {
        const saltRounds = 10;
        const hashed = await bcrypt.hash(password, saltRounds);
        return hashed;
    } catch (error) {
        console.log(error)
    }
}

const comparePass = async (password, hashed) => {
    return bcrypt.compare(password, hashed);
}

module.exports = { hashPass, comparePass }