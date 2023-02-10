import { prismaClient } from '../../config/prisma'

export async function deleteUser(id: string): Promise<void> {
  await prismaClient.user.delete({
    where: { id }
  })
}
