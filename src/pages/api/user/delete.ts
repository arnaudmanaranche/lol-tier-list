import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'Utils/prisma'
import supabase from 'Utils/supabase'

export default async function deleteUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { userId } = req.body

  await prisma.user.delete({
    where: { id: userId }
  })

  await supabase.auth.api.deleteUser(userId, process.env.PRISMA_SERVICE_ROLE)

  res.status(204).json({ status: 'OK' })
}
