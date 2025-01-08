import prisma from '../../config/prisma';

export const getPendingTransactions = async (userId: string) => {
    return prisma.transactions.findMany({
        where: {
            userId,
            status: 'PENDING'
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};