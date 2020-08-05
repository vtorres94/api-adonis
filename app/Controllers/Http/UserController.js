'use strict';
const User = require('../../Models/User');
const { validate } = use('Validator');
const ValidationService = use("App/Services/ValidationService")

class UserController {
    
    async getUser({ auth }) {
        try {
            return await auth.getUser()
        } catch (error) {
            response.send('You are not logged in')
        }
    };
    async login ({ request, auth }) {
        const { email, password } = request.all();
        const token = await auth.attempt(email, password);
        return token;
    };
    async store ({ request }) {
        const emailRule = { email: 'required|email|unique:users,email' }
        const phoneRule = { phone: 'required|unique:users,phone' }
        const passwordRule = { password: 'required' }
        const nameRule = { name: 'required' }
        const { email, password, phone, name } = await request.all();
        const validationEmail = await validate(email, emailRule)
        const validationPhone = await validate(phone, phoneRule)
        const validationPassword = await validate(password, passwordRule)
        const validationName = await validate(name, nameRule)
        if (!validationEmail.fails()) {
            if (!validationPhone.fails()) {
                if (!validationPassword.fails()) {
                    if (!validationName.fails()) {
                        const user = await User.create({
                            email,
                            password,
                            phone,
                            name,
                            username: email
                        });
                        return user;
                    } else {
                        return 'name error'
                    }
                } else {
                    return 'password error'
                }
            } else {
                return 'phone error'
            }
        } else {
            throw new SyntaxError('email error')
        }
    } 
    
}

module.exports = UserController;