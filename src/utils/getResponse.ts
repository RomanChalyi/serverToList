interface GetResponseParams {
  ctx: any;
  result: any;
  status?: number;
}

export const getResponse = ({
  ctx,
  result,
  status = 200,
}: GetResponseParams): typeof ctx => {
  ctx.body = result;
  ctx.status = status;
  return ctx;
};

interface GetBadResponseParams {
  ctx: any;
  err: any;
  message?: string;
  status?: number;
}

export const getBadResponse = ({
  ctx,
  err,
  message,
  status,
}: GetBadResponseParams): typeof ctx => {
  ctx.status = status ? status : err.status || 500;
  const msg = message ? message : err.message || "Bad Request";

  ctx.body = { message: msg };
  ctx.app.emit("error", err, ctx);
  return ctx;
};
