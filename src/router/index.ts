import Router from "koa-router";
import routerTasks from "./tasks";
import routerLogin from "./login";

const router: any = new Router();

router.use(routerTasks.routes());
router.use(routerLogin.routes());

export default router;
