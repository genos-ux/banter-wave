import { registerUserValidator } from "../validators/user.validator.js"

export const signup = (req, res) => {
    try {
        const {error, value} = registerUserValidator.validate(req.body);
    } catch (error) {
        
    }
}
export const login = (req, res) => {
    res.send("login route")
}
export const logout = (req, res) => {
    res.send("logout route")
}