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
  Route.post('/users/login', 'UserController.login')
  Route.post('/users/registry', 'UserController.store')
  Route.get('/users', () => {
    return { greeting: 'Lista usuarios' }
  })
  Route.get('/proyectos', 'ProyectoController.index').middleware('auth')
  Route.post('/proyectos/create', 'ProyectoController.create').middleware('auth')
}).prefix('api/v1');
