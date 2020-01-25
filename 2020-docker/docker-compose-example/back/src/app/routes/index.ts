import { Router } from 'express'

import { initRoutes as initTodosRoutes } from './todo'


export const initRoutes = async () => {
  const router = Router()

  router.use('/todos', await initTodosRoutes())

  return router
}
