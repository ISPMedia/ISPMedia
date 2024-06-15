import { saveRadios, radios } from "../utils/radios";
import {
  IRadioRepository,
  RadioCreate,
  RadioResponse,
} from "../interfaces/radio.interface";

class RadioRepositoryPrisma implements IRadioRepository {
  async create(data: RadioCreate): Promise<RadioResponse> {
    const newRadio = { id: radios.length + 1, ...data };
    radios.push(newRadio);
    saveRadios(radios);
    return newRadio;
  }
  async update(id: number, data: RadioCreate): Promise<any> {
    const radioIndex = radios.findIndex((radio) => radio.id === id);
    if (radioIndex !== -1) {
      radios[radioIndex] = { ...radios[radioIndex], ...data };
      saveRadios(radios);
      return radios[radioIndex];
    }
    return null;
  }
  async delete(id: number): Promise<any> {
    const index = radios.findIndex((radio) => radio.id === id);
    if (index !== -1) {
      radios.splice(index, 1);
      saveRadios(radios);
      return true;
    }
    return false;
  }
  async getRadioById(id: number): Promise<RadioResponse | undefined> {
    return radios.find((radio) => radio.id === id);
  }
  async getAllRadio(): Promise<RadioResponse[]> {
    return radios;
  }
}

export { RadioRepositoryPrisma };
