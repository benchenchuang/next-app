import { PrismaClient } from '@prisma/client'

const prisma =  new PrismaClient();

async function main() {
    const alice = await prisma.user.create({
        data: {
            username: 'chen',
            name: 'chen',
            password: '123456',
            email:'123@qq.com',
            roleId: '65828ceb24778efe860f7242',
            departId: '6581327313e2f8cd868a9e10',
            phone: '13223453456'
        }
    })
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