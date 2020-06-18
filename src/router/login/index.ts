import Router from "koa-router";
import { createUser, checkUser } from "../../middleware";

const router: any = new Router();

router.post("/login/user", createUser);
router.post("/login", checkUser);

export default router;
