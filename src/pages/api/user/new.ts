import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'Utils/prisma'

export default async function createUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { userId } = req.body

  const user = await prisma.user.upsert({
    where: { id: userId },
    update: { id: userId },
    create: { id: userId }
  })

  res.json(user)
}
