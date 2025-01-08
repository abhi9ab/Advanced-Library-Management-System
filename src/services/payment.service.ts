import prisma from '../../config/prisma';

export const payFine = async (transactionId: string, userId: string) => {
  const transaction = await prisma.transactions.findUnique({
    where: { id: transactionId }
  });

  if (!transaction || transaction.userId !== userId) {
    throw new Error('Transaction not found');
  }

  if (transaction.status === 'COMPLETED') {
    throw new Error('Transaction already paid');
  }

  return prisma.transactions.update({
    where: { id: transactionId },
    data: { status: 'COMPLETED' }
  });
}

export const generateInvoice = async (transactionId: string, userId: string) => {
  const transaction = await prisma.transactions.findUnique({
    where: { id: transactionId },
    include: {
      user: true
    }
  });

  if (!transaction || transaction.userId !== userId) {
    throw new Error('Transaction not found');
  }

  const date = transaction.createdAt.toLocaleDateString();
  const amount = transaction.amount.toFixed(2);
  const status = transaction.status.toLowerCase();
  const statusColor = status === 'completed' ? 'green' : 'red';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .invoice-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .invoice-details {
          margin-bottom: 30px;
        }
        .status {
          color: ${statusColor};
          text-transform: uppercase;
          font-weight: bold;
        }
        .amount {
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0;
        }
        .footer {
          margin-top: 50px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="invoice-header">
        <h1>Library Fine Invoice</h1>
      </div>
      
      <div class="invoice-details">
        <p><strong>Invoice ID:</strong> ${transaction.id}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>User:</strong> ${transaction.user.name}</p>
        <p><strong>Email:</strong> ${transaction.user.email}</p>
        <p class="amount">Amount Due: $${amount}</p>
        <p><strong>Status:</strong> <span class="status">${status}</span></p>
      </div>
      
      <div class="footer">
        <p>Thank you for using our library services.</p>
        <p>Please pay any outstanding fines to continue borrowing books.</p>
      </div>
    </body>
    </html>
  `;
}