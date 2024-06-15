import { UserRepositoryPrisma } from "../repositories/user.repository";
import {
  User,
  UserCreate,
  UserRepository,
  UserResponseDTO,
} from "../interfaces/user.interface";

class UserUseCase {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }

  async create({
    username,
    password,
    email,
    role,
  }: UserCreate): Promise<String> {
    const result = await this.userRepository.create({
      username,
      password,
      email,
      role,
    });
    return result;
  }
  async findByEmail(email: string): Promise<User | null> {
    const result = await this.userRepository.findByEmail(email);
    return result;
  }

  async getById(userId: string): Promise<any> {
    const data = await this.userRepository.getById(userId);

    return data;
  }
  async delete(id: string): Promise<any> {
    await this.userRepository.delete(id);
  }

  async getAllUser(): Promise<any> {
    const users = await this.userRepository.getAllUser();
    return users;
  }
}

export { UserUseCase };
