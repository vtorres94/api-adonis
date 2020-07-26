'use strict'

const Proyecto = use('App/Models/Proyecto')
const Tarea = use('App/Models/Tarea')
const AutorizathionService = use("App/Services/AuthorizationService")

class TareaController {
    async index({ auth, params }) {
        const user = await auth.getUser();
        const { proyectoId } = params;
        const proyecto = await Proyecto.find(params.proyectoId);
        return await proyecto.tareas().fetch();
    }
    async create({ auth, request, params }) {
        const user = await auth.getUser();
        const { titulo, descripcion } = request.all();
        const proyecto = await Proyecto.find(params.proyectoId);
        if(AutorizathionService.verificarPermiso(proyecto, user)) {
            const tarea = new Tarea();
            tarea.fill({
                titulo,
                descripcion
            });
            await proyecto.tareas().save(tarea);
            return {
                mensaje: "Se ha creado una nueva tarea con id " + tarea.id
            }
        }
        return tarea;
    }
    async destroy({ auth, response, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const tarea = await Tarea.find(id);
        const proyecto = await tarea.proyecto().fetch();
        if(AutorizathionService.verificarPermiso(proyecto, user)) {
            await tarea.delete()
            return {
                mensaje: "Tarea con id " + tarea.id + " se ha elminado"
            }
        }
    };
    async update({ auth, params, request }) {
        const user = await auth.getUser();
        const { id } = params;
        const tarea = await Tarea.find(id);
        const proyecto = await tarea.proyecto().fetch();
        if(AutorizathionService.verificarPermiso(proyecto, user)) {
            tarea.merge(request.only([
                'titulo',
                'descripcion',
                'completada'
            ]));
            await tarea.save(tarea);
            return {
                mensaje: "Tarea con id " + tarea.id + " se ha modificado"
            }
        }
    };
}

module.exports = TareaController
