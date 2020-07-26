const AccesoInvalidoException = use ('App/Exceptions/AccesoInvalidoException');
const RecursoNoEncotradoException = use ('App/Exceptions/RecursoNoEncotradoException')

class AutorizathionService {
    verificarPermiso(recurso, user) {
        const verified = true;
        if(!recurso) {
            throw new RecursoNoEncotradoException();
            verified = false;
        }
        if (recurso.user_id !== user.id) {
            throw new AccesoInvalidoException();
            verified = false;
        }
        return verified;
    }
}

module.exports = new AutorizathionService();