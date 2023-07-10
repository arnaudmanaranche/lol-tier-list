import { prismaClient } from '../../clients/prisma'

export async function deleteUser(id: string): Promise<void> {
  await prismaClient.user.delete({
    where: { id }
  })
}
