const { validate } = use('Validator');
const RecursoNoEncotradoException = use('App/Exceptions/RecursoNoEncotradoException')
const InvalidDataException = use('App/Exceptions/InvalidDataException')

class ValidationService {
    async validateField(data, rule) {
        console.log('v service ')
        console.log(data)

        const valid = true;
        const validation = await validate(data, rule)

        if(!data) {
            valid = false;
            throw new RecursoNoEncotradoException();
        }
        if (validation.fails()) {
            console.log('campo invalido')
            valid = false;
            throw new InvalidDataException();
        }
        return valid;
    }
}

module.exports = new ValidationService();