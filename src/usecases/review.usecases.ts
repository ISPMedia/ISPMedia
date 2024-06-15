import { ReviewRepositoryPrisma } from "../repositories/review.repository";
import { ReviewCreate } from "../interfaces/review.interface";

class ReviewUseCase {
  private reviewRepository: ReviewRepositoryPrisma;
  constructor(reviewRepository: ReviewRepositoryPrisma) {
    this.reviewRepository = reviewRepository;
  }

  async create(data: ReviewCreate): Promise<string> {
    const result = await this.reviewRepository.create(data);
    return result;
  }
  async update(id: string): Promise<any> {}
  async delete(id: string): Promise<any> {
    return await this.reviewRepository.delete(id);
  }
  async getReviewById(id: string): Promise<any> {
    const result = await this.reviewRepository.getReviewById(id);
    return result;
  }
  async getAllReview(): Promise<any> {
    const result = await this.reviewRepository.getAllReview();
    return result;
  }
}
export { ReviewUseCase };
