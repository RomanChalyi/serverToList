import Router from "koa-router";
import {
  getWithStatus,
  create,
  update,
  deleteWithId,
  deleteWithIds,
  updateTaskStatusWithIds,
  checkToken,
} from "../../middleware";

const router: any = new Router();

router.get("/tasks", checkToken, getWithStatus);

router.post("/task", checkToken, create);

router.put("/task", update);
router.put("/tasks", updateTaskStatusWithIds);

router.delete("/task", deleteWithId);
router.delete("/tasks", deleteWithIds);

export default router;
