import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const ACCOUNT_TYPE_LISTS = [
    { name: "corriente".toUpperCase() },
    { name: "ahorro".toUpperCase() },
    { name: "efectivo".toUpperCase() },
    { name: "credito".toUpperCase() },
  ];
  const CURRENCY_LISTS = [
    { name: "USD", abbreviation: "$" },
    { name: "bolivares", abbreviation: "Bs" },
  ];
  for (let account_type of ACCOUNT_TYPE_LISTS) {
    await prisma.account_type.create({
      data: account_type,
    });
  }
  for (let currency of CURRENCY_LISTS) {
    await prisma.currency.create({
      data: currency,
    });
  }
  await prisma.user.create({
    data: {
      username: "krashmello",
      password: "1234",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
