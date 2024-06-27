import { prisma } from "../lib/prisma";
import { hashSync } from "bcrypt";

const SALT_ROUNDS = 10;
const defaultAdmin = {
  username: "admin",
  password: "admin",
  email: "20120000@isptec.co.ao",
  role: "admin",
};

const ispmediaGroup = {
  name: "public",
  description: "ispmedia",
  visibility: true,
};

export const initialData = async () => {
  const defaultGroup = await prisma.group.findUnique({
    where: { name: "public" },
  });

  if (!defaultGroup) {
    const user = await prisma.user.create({
      data: {
        username: defaultAdmin.username,
        password: hashSync(defaultAdmin.password, SALT_ROUNDS),
        email: defaultAdmin.email,
        role: defaultAdmin.role,
      },
    });

    const group = await prisma.group.create({
      data: {
        name: ispmediaGroup.name,
        description: ispmediaGroup.description,
        visibility: ispmediaGroup.visibility,
        ownerId: user.id,
      },
    });

    await prisma.member.create({
      data: {
        userId: user.id,
        groupId: group.id,
        role: "manager",
      },
    });
  }
};
