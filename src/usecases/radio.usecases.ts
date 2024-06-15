import { RadioRepositoryPrisma } from "../repositories/radio.repository";
import { RadioCreate, RadioResponse } from "../interfaces/radio.interface";

class RadioUseCase {
  private radioRepository: RadioRepositoryPrisma;
  constructor(radioRepository: RadioRepositoryPrisma) {
    this.radioRepository = radioRepository;
  }

  async create(data: RadioCreate): Promise<RadioResponse> {
    const result = await this.radioRepository.create(data);
    return result;
  }
  async update(id: number): Promise<any> {
    const result = await this.radioRepository.update(id);
    return result;
  }
  async delete(id: number): Promise<any> {
    await this.radioRepository.delete(id);
  }
  async getRadioById(id: number): Promise<RadioResponse> {
    const result = await this.radioRepository.getRadioById(id);
    return result;
  }
  async getAllRadio(): Promise<RadioResponse[]> {
    const result = await this.radioRepository.getAllRadio();
    return result;
  }
}

export { RadioUseCase };
