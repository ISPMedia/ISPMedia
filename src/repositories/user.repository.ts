import { User, UserCreate, UserRepository } from "../interfaces/user.interface";
import { prisma } from "../lib/prisma";
import { replacer } from "../utils/helpersFunctions";

class UserRepositoryPrisma implements UserRepository {
  async create(data: UserCreate): Promise<String> {
    const defaultGroup = await prisma.group.findUnique({
      where: { name: "public" },
    });
    if (!defaultGroup) {
      throw new Error("Default group not found");
    }

    const user = await prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
        email: data.email,
        role: data.role,
      },
    });

    // Adiciona o usuário ao grupo padrão com a função especificada
    await prisma.member.create({
      data: {
        userId: user.id,
        groupId: defaultGroup.id,
        role: "viewer",
      },
    });

    return user.id;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
        role: true,
        createdAt: true,
        ownerGroup: true,
        playlist: true,
        review: true,
        video: true,
        group: true,
        album: true,
      },
    });

    if (!result) {
      return null;
    }
    return JSON.parse(JSON.stringify(result, replacer));
  }

  async getById(userId: string): Promise<User> {
    const result = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        ownerGroup: true,
        playlist: true,
        review: true,
        music: true,
        video: true,
        group: true,
        album: true,
      },
    });
    return JSON.parse(JSON.stringify(result, replacer));
  }

  async update(id: string): Promise<any> {
    return null!;
  }
  async delete(id: string): Promise<any> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async getAllUser(): Promise<any> {
    const users = prisma.user.findMany({});
    return users;
  }
}

export { UserRepositoryPrisma };
