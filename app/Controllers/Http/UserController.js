'use strict';

const User = require('../../Models/User');
const { validate } = use('Validator');

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
    async store({ request }) {
        const userData = request.only(['username', 'email', 'password'])
        const user = await User.create(userData);
        return user;
    };
    async validation ({ request }) {
        const rules = {
          email: 'required|email|unique:users,email',
          phone: 'required|unique:users,phone',
          password: 'required',
          name: 'required'
        }
    
        const validation = await validate(request.all(), rules)
        const { email, password, phone, name } = await request.all();
        if (validation.fails()) {
            return validation.messages();
        } else {
            const user = await User.create({
                email,
                password,
                phone,
                name,
                username: email
            });
            return "User created successfully";
        }    
    }
    
}

module.exports = UserController;