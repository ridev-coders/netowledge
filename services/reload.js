const Users = require("../models/users")

const loggedUser = async (req, next) => {
    try {
        let user = await Users.findById(req.user._id) 
        req.login(user, (err) => {
            if (err) {
                throw err
            } else {
                return
            }
        })
        
    } catch (err) {
        next(err)
    }
}

module.exports = {loggedUser}