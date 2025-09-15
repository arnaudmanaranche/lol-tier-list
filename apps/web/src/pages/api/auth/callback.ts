import createClient from 'clients/supabase/api'
import type { NextApiRequest, NextApiResponse } from 'next'

import { WEBSITE_URL } from '@/utils/constants'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> {
  const { code } = req.query

  if (code) {
    const supabaseClient = createClient(req, res)

    try {
      const { data, error } = await supabaseClient.auth.exchangeCodeForSession(
        code as string
      )

      if (error) {
        return res.redirect('/auth/auth-code-error')
      }

      await supabaseClient.from('users').upsert({
        id: data.session.user.id,
        email: data.session.user.email as string,
        username:
          data.session.user?.identities?.[0]?.identity_data?.preferred_username
      })

      const forwardedHost = req.headers['x-forwarded-host']
      const origin = req.headers.origin || `https://${forwardedHost}`
      const isLocalEnv = process.env.NODE_ENV === 'development'

      if (isLocalEnv) {
        return res.redirect(`${WEBSITE_URL}/tournaments`)
      } else if (forwardedHost) {
        return res.redirect(`https://${forwardedHost}/tournaments`)
      } else {
        return res.redirect(`${origin}/tournaments`)
      }
    } catch {
      return res.redirect('/?status=auth_error')
    }
  }

  res.redirect('/?status=auth_error')
}

export default handler
