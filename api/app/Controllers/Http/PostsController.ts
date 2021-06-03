import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
export default class PostsController {
  public async index({request}) {
    // return post.all()

    const page = request.input('page',1)
    const limit = request.input('per_page', 2)
    // return post.query().paginate(page, limit)

    const posts = await Post.query().paginate(page, limit)
    return posts
    // return posts.map(post => post.serialize({fields:['id', 'title']}))

  }

  public async store({request, response}:HttpContextContract){
    Post.create({title:request.input('title'),is_completed:false})
    // return response.send('created')
    return response.status(201).json({'created': true})
  }

  public async update({request, response, params}:HttpContextContract){
    const post = await Post.findOrFail(params.id)
    post.title = request.input('title')
    post.is_completed = request.input('is_completed')
    post.save()
    return response.status(202).send(post)
  }

  public async delete({response, params}:HttpContextContract){
    try {
      const post = await Post.findOrFail(params.id)
      await post.delete()
      response.status(200)
    } catch (error) {
      response.status(404).json({messages: ['Teks does not exist']})
    }
  }
}
