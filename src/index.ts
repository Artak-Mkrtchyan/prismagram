import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Connect the client
  await prisma.$connect()
  // ... you will write your Prisma Client queries here
  await prisma.user.create({
      data: {
          email: 'email',
          bio: 'text',
          lastName: 'ln',
          loginSecret: 'ls',
          username: 'un',
      }
  })
  console.log("allUsers")
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })