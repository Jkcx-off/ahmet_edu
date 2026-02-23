import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  try {
    const user = await prisma.user.create({
      data: { firstName: "Test", lastName: "User" }
    })
    console.log("Creation successful:", user)
  } catch (error) {
    console.error("DB Error:", error)
  }
}
main().finally(() => prisma.$disconnect())
