import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function seed() {
  const kody = await db.user.create({
    data: {
      email: 'kody@test.com',
      // this is a hashed version of "twixrox"
      passwordHash:
        '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u',
    },
  });

  await Promise.all(
    getRecipes().map((recipe) => {
      // const data = { cookRecipeId: kody.id, ...recipe };
      return db.recipe.create({ data: recipe });
    })
  );
}

seed();

function getRecipes() {
  return [];
}
