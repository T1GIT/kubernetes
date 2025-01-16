import { createSharedComposable } from '@vueuse/core'
import { io } from 'socket.io-client'

export const useSocket = createSharedComposable(() => io({ transports: ['websocket', 'polling'] }))
