import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(`${process.env.RESEND_API_KEY}`)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { email } = req.body

  if (req.method === 'POST') {
    resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID
    })

    res.status(201).json({ message: 'Subscribed successfully' })
  } else {
    throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default handler
