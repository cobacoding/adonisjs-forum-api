/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(()=>{
    Route.get('/post', 'PostsController.index')
    Route.post('/post', 'PostsController.store')
    Route.patch('/post/update/:id', 'PostsController.update')
    Route.delete('/post/delete/:id', 'PostsController.delete')
  }).middleware('auth')
  Route.post('/register','AuthController.register')
  Route.post('/login','AuthController.login')
  Route.post('/upload','ImagesController.upload')
  Route.get('/download/:fileName','ImagesController.download')
}).prefix('api')

