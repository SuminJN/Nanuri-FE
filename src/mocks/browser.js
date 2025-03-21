import { handlers } from './handlers/index'
import { setupWorker } from 'msw/browser'

export const worker = setupWorker(...handlers)