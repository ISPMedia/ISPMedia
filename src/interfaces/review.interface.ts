export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  albumId: string;
  userId: string;
  createdAt: Date;
}

export interface ReviewCreate {
  rating: number;
  comment?: string | null;
  albumId: string;
  userId: string;
}

export interface IReviewRepository {
  create(data: ReviewCreate): Promise<string>;
  update(id: string): Promise<any>;
  delete(id: string): Promise<any>;
  getReviewById(id: string): Promise<any>;
  getAllReview(): Promise<any>;
}
