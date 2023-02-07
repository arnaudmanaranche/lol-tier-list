import prisma from '../../config/prisma'

export async function deleteUser(id: string): Promise<void> {
  await prisma.user.delete({
    where: { id }
  })
}
