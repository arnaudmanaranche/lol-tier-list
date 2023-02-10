import type { User } from '@prisma/client'

import { prismaClient } from '../../config/prisma'

export async function createUser(id: string): Promise<User> {
  const user = await prismaClient.user.upsert({
    where: { id },
    update: { id },
    create: { id }
  })

  return user
}
