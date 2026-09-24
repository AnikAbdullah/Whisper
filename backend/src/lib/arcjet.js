import arcjet, {
  shield,
  detectBot,
  slidingWindow,
  cloudflare,
} from "@arcjet/node";
import { ENV } from "./env.js";

const aj = arcjet({
  key: ENV.ARCJET_API_KEY,
  // Sevalla sits behind Cloudflare; read the real client IP from CF-Connecting-IP
  // instead of treating the Cloudflare edge IP as the client (flagged as a bot).
  proxies: [cloudflare()],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        // Allow Postman for API testing in development only
        ...(ENV.NODE_ENV === "development" ? ["POSTMAN"] : []),
      ],
    }),
    slidingWindow({
      mode: "LIVE",
      interval: 60, // 1 minute
      max: 100, // Allow 100 requests per minute
    }),
  ],
});

export default aj;
