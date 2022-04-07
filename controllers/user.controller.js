const bcrypt = require("bcrypt")
const User = require("../models/User")
const SALT_ROUNDS = process.env.SALT_ROUNDS;

const hashPassword = (password, saltRounds) => {
    return bcrypt.hashSync(password, saltRounds)
}

const comparePassword = (plaintextPassword, hashPassword) => {
    return bcrypt.compareSync(plaintextPassword, hashPassword);
}

const register = async (req, res) => {
    // const { username, firstname, lastname, age, birth_date, country, zip_code, access, phone_number, email, password } = req.body
    try {
        let user = new User({
            username: "rabbitz9",
            firstname: "Dong Anh",
            lastname: "Nguyen",
            age: "22",
            country: "Viet Nam",
            zip_code: 100000,
            email: "spman510@gmail.com",
            password: hashPassword("donganh510", parseInt(SALT_ROUNDS)),
        });
        user.save();
        return res.status(200).json({ message: 'success', data: user });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    register
}