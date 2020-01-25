import { Router } from 'express'
import { get, create, update, remove } from '../handlers/todos'

export const initRoutes = async () => {
  const router = Router()

  router.get(['/', '/:id'], get)
  router.post('/', create)
  router.patch('/:id', update)
  router.delete('/:id', remove)

  return router
}
