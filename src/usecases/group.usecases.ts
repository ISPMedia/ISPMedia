import { GroupRepositoryPrisma } from "../repositories/group.repository";
import { GroupCreate, Member } from "../interfaces/group.interface";

class GroupUseCase {
  private groupRepository: GroupRepositoryPrisma;
  constructor() {
    this.groupRepository = new GroupRepositoryPrisma();
  }

  async create({
    name,
    description,
    visibility,
    owner,
  }: GroupCreate): Promise<String> {
    const result = await this.groupRepository.create({
      name,
      description,
      visibility,
      owner,
    });
    return result;
  }

  async getAllGroup(): Promise<any>{
    const result = await this.groupRepository.getAllGroup();
    return result;
  }

  async getGroupById(id: string): Promise<any>{
    const result = await this.groupRepository.getGroupById(id);
    return result;
  }

  async addMemberInGroup(data: Member): Promise<any> {
    const result = await this.groupRepository.addMemberInGroup(data)
    return result
  }

  async removeMemberInGroup(groupId: string, userId: string): Promise<any> {
    return await this.groupRepository.removeMemberInGroup(groupId, userId);
  }
}

export { GroupUseCase };
