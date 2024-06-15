import { Router } from "express";
import userRoutes from "./user.routes";
import groupRoutes from "./group.routes";
import videoRoutes from "./video.routes";
import musicRoutes from "./music.routes";
import albumRoutes from "./album.routes";
import genreRoutes from "./genre.routes";
import reviewRoutes from "./review.routes";
import playlistRoutes from "./playlist.routes";
import radioRouter from "./radio.routes";
const rootRouter: Router = Router();

rootRouter.use("/users", userRoutes);
rootRouter.use("/groups", groupRoutes);
rootRouter.use("/videos", videoRoutes);
rootRouter.use("/musics", musicRoutes);
rootRouter.use("/albums", albumRoutes);
rootRouter.use("/genres", genreRoutes);
rootRouter.use("/reviews", reviewRoutes);
rootRouter.use("/playlists", playlistRoutes);
rootRouter.use("/radios", radioRouter);
export default rootRouter;
