const AccesoInvalidoException = use ('App/Exceptions/AccesoInvalidoException');
const RecursoNoEncotradoException = use ('App/Exceptions/RecursoNoEncotradoException')

class AutorizathionService {
    verificarPermiso(recurso, user) {
        const verified = true;
        if(!recurso) {
            verified = false;
            throw new RecursoNoEncotradoException();
        }
        if (recurso.user_id !== user.id) {
            verified = false;
            throw new AccesoInvalidoException();
        }
        return verified;
    }
}

module.exports = new AutorizathionService();