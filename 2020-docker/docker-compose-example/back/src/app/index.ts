import * as path from 'path'
import * as express from 'express'
import * as compress from 'compression'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as config from 'config'
import * as swaggerUiExpress from 'swagger-ui-express'
import * as  yaml from 'yamljs'

import { createLogger } from './shared'
import { connect } from './model'

import { initRoutes } from './routes'

// eslint-disable-next-line no-undef
const swaggerDocument = yaml.load(path.resolve(__dirname, 'swagger.yaml'))

const logger = createLogger({ name: 'index' })

const app: express.Express = express()

const connectToDb = () => connect({
  host: config.get('MONGODB.HOST'),
  port: config.get('MONGODB.PORT'),
  database: config.get('MONGODB.DATABASE'),
  user: config.get('MONGODB.USER'),
  password: config.get('MONGODB.PASSWORD'),
})

app.use(compress())
app.use(cors())
app.use(bodyParser.json({ limit: '50kb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50kb' }))

const runApp = async () => {
  try {
    await connectToDb()
    const router = await initRoutes()
    app.use('/api/v1/documentation', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument))
    app.use('/api/v1', router)
    app.listen(config.get('APP_PORT'))
    logger.info(`Server running on *:${config.get('APP_PORT')}`)
  } catch (e) {
    logger.warn(e)
  }
}

runApp()
