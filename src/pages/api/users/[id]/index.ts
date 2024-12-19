import createClient from 'clients/supabase/api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(`${process.env.RESEND_API_KEY}`)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const userId = req.query.id as string
  const supbaseClient = createClient(req, res)

  if (req.method === 'DELETE') {
    const { data } = await supbaseClient
      .from('users')
      .select()
      .eq('id', userId)
      .single()

    if (!data) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    await supbaseClient.from('users').delete().eq('id', data.id)

    resend.contacts.remove({
      email: data.email,
      audienceId: process.env.RESEND_AUDIENCE_ID
    })

    res.status(200).json({ message: 'User deleted' })
  } else {
    throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default handler
