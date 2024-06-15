export interface Radio {
  id: number;
  name: string;
  country: string;
  freq: string;
  url: string;
}

export interface RadioCreate {
  name: string;
  country: string;
  freq: string;
  url: string;
}

export interface RadioResponse {
  id: number;
  name: string;
  country: string;
  freq: string;
  url: string;
}

export interface IRadioRepository {
  create(data: RadioCreate): Promise<RadioResponse>;
  update(id: number, data: RadioCreate): Promise<any>;
  delete(id: number): Promise<any>;
  getRadioById(id: number): Promise<RadioResponse | undefined>;
  getAllRadio(): Promise<RadioResponse[]>;
}
