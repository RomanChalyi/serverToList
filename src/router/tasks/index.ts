import Router from "koa-router";
import jwtMiddleware from "koa-jwt";
import {
  getWithStatus,
  create,
  update,
  deleteWithId,
  deleteWithIds,
  updateTaskStatusWithIds,
} from "../../middleware";
import { JWT_SECRET } from "../../constant/base";

const router: any = new Router();

// router.use(jwtMiddleware({ secret: JWT_SECRET }));
router.get("/tasks", getWithStatus);

router.post("/task", create);

router.put("/task", update);
router.put("/tasks", updateTaskStatusWithIds);

router.delete("/task", deleteWithId);
router.delete("/tasks", deleteWithIds);

export default router;
