'use strict';

const User = require('../../Models/User');

class UserController {
    async login ({ request, auth }) {
        const { email, password } = request.all();
        const token = await auth.attempt(email, password);
        return token;
    }
    async store({ request }) {
        const userData = request.only(['username', 'email', 'password'])
        const user = await User.create(userData);
        return user;
    };
}

module.exports = UserController;