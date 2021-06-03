import { DateTime } from 'luxon'
// import User from 'App/Models/User'
// import Forum from 'app/Models/Forum'

import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string;

  @column()
  public is_completed:Boolean

  @column.dateTime({ autoCreate: true,
    serialize: (value:DateTime) => value.toFormat('yyyy MMM dd')
  })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true,
    serialize: (value:DateTime) => value.toFormat('yyyy MMM dd')
  })
  public updatedAt: DateTime

  @computed()
  public get user() {
    return 'dodolijo'
  }

  // Relationship
  // @belongsTo(() => User)
  // public user: BelongsTo<typeof User>;

  // Relationship
  // @belongsTo(() => Forum)
  // public forum: BelongsTo<typeof Forum>;
}
