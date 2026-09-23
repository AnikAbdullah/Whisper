import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Too many requests. Please try again later." });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Access denied" });
      } else {
        return res
          .status(403)
          .json({ message: "Access denied by security policy" });
      }
    }
    // Check for spoofed bots using Arcjet Inspect
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected",
      });
    }
    next();
  } catch (error) {
    console.error("Arcjet inspection error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
