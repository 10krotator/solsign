import { httpRouter} from "convex/server";
import { verifyAuth } from "./users";

export const http = httpRouter();

http.route({
  path: "/users/verifyAuth",
  method: "GET",
  handler: verifyAuth,
});

export default http;