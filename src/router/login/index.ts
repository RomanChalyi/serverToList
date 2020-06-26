import Router from "koa-router";
import {
  createUser,
  checkUser,
  updateToken,
  getUser,
  checkToken,
  logout,
} from "../../middleware";

const router: any = new Router();

router.post("/login/user", createUser);
router.post("/login", checkUser);
router.post("/token", updateToken);
router.get("/user", checkToken, getUser);
router.post("/logout", logout);

export default router;
