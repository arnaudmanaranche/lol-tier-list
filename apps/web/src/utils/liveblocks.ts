import { createClient } from '@liveblocks/client'

const initLiveBlocks = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY
})

export default initLiveBlocks
