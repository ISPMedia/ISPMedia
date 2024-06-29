import { prisma } from "../lib/prisma";
import { replacer } from "../utils/helpersFunctions";
import {
  GroupRepository,
  GroupCreate,
  Member,
  GroupResponse,
} from "../interfaces/group.interface";

class GroupRepositoryPrisma implements GroupRepository {
  async create(data: GroupCreate): Promise<String> {
    const group = await prisma.group.create({
      data: {
        name: data.name,
        description: data.description,
        visibility: data.visibility,
        owner: { connect: { id: data.owner } },
      },
    });

    return group.id;
  }

  async getAllGroup(): Promise<any> {
    const result = await prisma.group.findMany({
      include: {
        user: true, // Include all user fields
        owner: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
        playlist: true,
        video: true,
        music: true,
        album: true,
      },
    });

    return JSON.parse(JSON.stringify(result, replacer));
  }

  async getGroupById(id: string): Promise<any> {
    const result = await prisma.group.findUnique({
      where: {
        id,
      },
      include: GroupResponse,
    });

    return JSON.parse(JSON.stringify(result, replacer));
  }

  async addMemberInGroup(data: Member): Promise<any> {
    const result = await prisma.member.create({
      data: {
        userId: data.userId,
        groupId: data.groupId,
        role: data.role,
      },
    });
    return result;
  }

  async removeMemberInGroup(groupId: string, userId: string): Promise<any> {
    return await prisma.member.delete({
      where: {
        userId_groupId: {
          userId: userId,
          groupId: groupId,
        },
      },
    });
  }

  async update(id: string): Promise<any> {
    return null!;
  }

  async delete(id: string): Promise<any> {
    return await prisma.group.delete({
      where: {
        id,
      },
    });
  }
}

export { GroupRepositoryPrisma };
