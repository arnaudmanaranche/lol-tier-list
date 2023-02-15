import { wrapApiHandlerWithSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { supabaseClient } from 'Utils/supabase'

function auth(req: NextApiRequest, res: NextApiResponse): void {
  supabaseClient.auth.api.setAuthCookie(req, res)
}

export default wrapApiHandlerWithSentry(auth, '/api/auth')
