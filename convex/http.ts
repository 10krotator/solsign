import { httpRouter} from "convex/server";
import { verifyAuth } from "./users";

export const http = httpRouter();

http.route({
  path: "/user/verify",
  method: "GET",
  handler: verifyAuth,
});

export default http;