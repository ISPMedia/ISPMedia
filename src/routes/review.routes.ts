import { Router, Request, Response, response } from "express";
import { authenticate } from "../middlewares/authenticate";
import { ReviewUseCase } from "../usecases/review.usecases";
import { ReviewRepositoryPrisma } from "../repositories/review.repository";

const reviewRoutes: Router = Router();
const reviewUseCase = new ReviewUseCase(new ReviewRepositoryPrisma());

reviewRoutes.post("/", authenticate, async (req: Request, res: Response) => {
  const { rating, comment, albumId } = req.body;
  try {
    const data = await reviewUseCase.create({
      rating,
      comment,
      albumId,
      userId: req.user.id,
    }); 
    return res.status(201).send({ reviewId: data });
  } catch (error) {
    return res.status(500).send(error);
  }
});

reviewRoutes.get("/", authenticate,async (req: Request, res: Response) => {
  try {
    const reviews = await reviewUseCase.getAllReview();
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).send(error);
  }
});

reviewRoutes.get("/:id", authenticate,async (req: Request, res: Response) => {
  const { id } = req.params;
  const existReview = await reviewUseCase.getReviewById(id);
  if (!existReview) {
    return res.status(404).send({
      message: "Review not found!",
    });
  }
  try {
    //const genre = await reviewUseCase.getGenreById(id);
    return res.status(200).send({ review: existReview });
  } catch (error) {
    return res.status(500).send(error);
  }
});

reviewRoutes.delete("/:id", authenticate, async (req: Request, res: Response) => {
  const { id } = req.params;
  const existReview = await reviewUseCase.getReviewById(id);
  if (!existReview) {
    return res.status(404).send({
      message: "Review not found!",
    });
  }
  try {
    await reviewUseCase.delete(id);
    return res.status(200).send({ message: "Review successfully deleted" });
  } catch (error) {
    return res.status(500).send(error);
  }
});

reviewRoutes.put("/", authenticate, async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).send(error);
  }
});
export default reviewRoutes;
