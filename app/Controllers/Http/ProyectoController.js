'use strict'

const Proyecto = use("App/Models/Proyecto");

class ProyectoController {
    async index({ auth }) {
        const user = await auth.getUser();
        return await user.proyectos().fetch()
    }
    async create({ auth, request }) {
        const { nombre } = request.all();
        const user = await auth.getUser();
        const proyecto = new Proyecto();
        proyecto.fill({
            nombre
        });
        await user.proyectos().save(proyecto);
        return proyecto;
    };
    async destroy({ auth, response, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const proyecto = await Proyecto.find(id);
        if(proyecto.user_id === user.id) {
            await proyecto.delete();
            return {
                mensaje: "Proyecto con id " + proyecto.id + " se ha elminado"
            }
        } else {
            return response.status(403).json({
                mensaje: "No es dueño del proyecto que desea elminar"
            })
        }
    };
}

module.exports = ProyectoController
