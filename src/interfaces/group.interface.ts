export interface Group {
  id: string;
  name: string;
  ownerid: string;
  description?: string;
  visibility: boolean;
  createdAt: Date;
}
 
export interface GroupCreate {
  name: string;
  description?: string;
  visibility: boolean;
  owner: string;
}

export interface Member {
  userId: string;
  groupId: string;
  role: string
}

export interface GroupRepository {
  create(data: GroupCreate): Promise<String>;
  getAllGroup(): Promise<any>;
  getGroupById(id: string): Promise<any>;
  update(id: string): Promise<any>;
  delete(id: string): Promise<null>;
  addMemberInGroup(data: Member): Promise<String>;
  removeMemberInGroup(groupId: string, userId: string): Promise<any>;
}

export const GroupResponse = {
  user: true, // Include all user fields
  video: true,
  owner: {
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    },
  },
  
}