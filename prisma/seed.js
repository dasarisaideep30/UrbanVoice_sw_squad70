const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const password = await hash('password123', 10)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@urbanvoice.com' },
        update: {},
        create: {
            email: 'admin@urbanvoice.com',
            name: 'City Official',
            password,
            role: 'OFFICIAL',
        },
    })

    const citizen = await prisma.user.upsert({
        where: { email: 'citizen@urbanvoice.com' },
        update: {},
        create: {
            email: 'citizen@urbanvoice.com',
            name: 'Jane Citizen',
            password,
            role: 'CITIZEN',
        },
    })

    console.log({ admin, citizen })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
