import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const saltRounds = 10

  const adminPassword = await bcrypt.hash('admin123', saltRounds)
  const userPassword = await bcrypt.hash('user123', saltRounds)

  // Verificar se o usuário admin já existe
  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  })

  if (!adminUser) {
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        role: 'ADMIN',
      },
    })
  }

  // Verificar se o usuário regular já existe
  const regularUser = await prisma.user.findUnique({
    where: { email: 'user@example.com' },
  })

  if (!regularUser) {
    await prisma.user.create({
      data: {
        name: 'Regular User',
        email: 'user@example.com',
        password: userPassword,
        role: 'USER',
      },
    })
  }
}

main()
  .then(() => {
    console.log('Seed data created successfully')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })