import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import supabase from 'Utils/supabase'

function handler(req: NextApiRequest, res: NextApiResponse): void {
  supabase.auth.api.setAuthCookie(req, res)
}

export default withSentry(handler)
