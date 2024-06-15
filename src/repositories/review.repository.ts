import { prisma } from "../lib/prisma";
import {
  IReviewRepository,
  ReviewCreate,
} from "../interfaces/review.interface";

class ReviewRepositoryPrisma implements IReviewRepository {
  async create(data: ReviewCreate): Promise<string> {
    const result = await prisma.review.create({
      data: {
        rating: data.rating,
        comment: data.comment,
        albumId: data.albumId,
        userId: data.userId
      },
    });

    return result.id;
  }
  async update(id: string): Promise<any> {}
  async delete(id: string): Promise<any> {
    await prisma.review.delete({
      where: {
        id,
      },
    });
  }
  async getReviewById(id: string): Promise<any> {
    const result = await prisma.review.findUnique({
      where: {
        id,
      },
    });
    return result;
  }
  async getAllReview(): Promise<any> {
    const result = await prisma.review.findMany({});
    return result;
  }
}

export { ReviewRepositoryPrisma };
