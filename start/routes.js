'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() =>{
  Route.get('/users/', 'UserController.getUser').middleware('auth')
  Route.post('/users/login', 'UserController.login')
  Route.post('/users/registry', 'UserController.store')
  Route.post('/users/signin', 'UserController.validation')
  
  Route.get('/proyectos', 'ProyectoController.index').middleware('auth')
  Route.post('/proyectos/create', 'ProyectoController.create').middleware('auth')
  Route.delete('/proyectos/delete/:id', 'ProyectoController.destroy').middleware('auth')
  Route.patch('/proyectos/update/:id', 'ProyectoController.update').middleware('auth')

  Route.get('/proyectos/:proyectoId/tareas/', 'TareaController.index').middleware('auth')
  Route.post('/proyectos/:proyectoId/tareas/create', 'TareaController.create').middleware('auth')
  Route.delete('/tareas/delete/:id', 'TareaController.destroy').middleware('auth')
  Route.patch('/tareas/update/:id', 'TareaController.update').middleware('auth')


}).prefix('api/v1');
