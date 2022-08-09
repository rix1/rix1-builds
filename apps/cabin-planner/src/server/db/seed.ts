import { PrismaClient, Property, User } from '@prisma/client';
import { properties, users } from './seedData';
const prisma = new PrismaClient();

async function asyncForEach(array: any[], callback: Function) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function main() {
  await asyncForEach(properties, async (property: Property) => {
    await prisma.property.create({
      data: property,
    });
  });

  await asyncForEach(users, async (user: User) => {
    await prisma.user.create({
      data: user,
    });
  });
}

main().catch((e) => console.error(e));
