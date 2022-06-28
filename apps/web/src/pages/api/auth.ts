import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import supabase from 'Utils/supabase'

function auth(req: NextApiRequest, res: NextApiResponse): void {
  try {
    supabase.auth.api.setAuthCookie(req, res)
  } catch (error) {
    console.log(error)
  }
}

export default withSentry(auth)
