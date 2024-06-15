import { UserCreate } from "../interfaces/user.interface";

export interface IAdminRepository{
    createManagerOrAdmin(data: UserCreate): Promise<String>;
}