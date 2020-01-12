import * as mongoose from 'mongoose'

const READY_STATE_CONNECTED = 1

export * from './schema/Todo'

export interface ConnectConfig {
  host: string
  port: string
  database: string
  user: string
  password: string
}

export const connect = (config: ConnectConfig): Promise<any> => {
  return  mongoose.connect(`mongodb://${config.host}:${config.port}/${config.database}`, {
    authSource: 'admin',
    user: config.user,
    pass: config.password,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
}

export const checkIsConnected = () => mongoose.connection.readyState === READY_STATE_CONNECTED

