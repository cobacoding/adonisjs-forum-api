import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ImagesController {
  public async upload({ request }:HttpContextContract) {

    const postSchema = schema.create({
      cover_image: schema.file({
        size: '2mb',
        extnames: ['jpg', 'gif', 'png'],
      }),
    })

    const payload = await request.validate({ schema: postSchema })

    await payload.cover_image.move(Application.tmpPath('../uploads'))

  }

  public async download ({ response, params }) {
    // const filePath = Application.tmpPath('../uploads/logo.jpg')

    // response.download(filePath, true, (error) => {
    //   if (error.code === 'ENOENT') {
    //     return ['File does not exists', 404]
    //   }

    //   return ['Cannot download file', 400]
    //   })

    const filePath = `../uploads/${params.fileName}`

    return response.download(Application.tmpPath(filePath))
  }
}
