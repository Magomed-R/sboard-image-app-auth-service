import { join } from 'path'
import { DATA_SOURCE } from 'src/constants'
import { DataSource } from 'typeorm'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } = process.env

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: POSTGRES_HOST,
        port: parseInt(POSTGRES_PORT!),
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        entities: [join(__dirname, '..', '**', '*.entity.{js,ts}')],
        synchronize: true
      })

      return dataSource.initialize()
    }
  }
]
