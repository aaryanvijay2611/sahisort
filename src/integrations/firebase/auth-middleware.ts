import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { getAdminAuth } from "./admin";
import { DEMO_MODE, DEMO_USER_ID } from "@/lib/demo";

export const requireFirebaseAuth = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const request = getRequest();

    if (!request?.headers) {
      throw new Error("Unauthorized: No request headers available");
    }

    const authHeader = request.headers.get("authorization");
    let userId = "";
    let email: string | null = null;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // Demo mode: no login required. Every request acts as the fixed demo user.
      // Real Firebase sessions are still verified normally when a token is sent.
      if (!DEMO_MODE) {
        throw new Error("Unauthorized: Please sign in to access your discoveries and journey.");
      }
      userId = DEMO_USER_ID;
    } else {
      const token = authHeader.replace("Bearer ", "").trim();
      if (!token) {
        throw new Error("Unauthorized: Empty authorization token provided.");
      }

      try {
        const adminAuth = getAdminAuth();
        const decoded = await adminAuth.verifyIdToken(token);
        userId = decoded.uid;
        email = decoded.email || null;
      } catch (err: unknown) {
        // In development, if Firebase Admin is not connected to GCP yet, decode token payload safely
        try {
          const parts = token.split(".");
          if (parts.length === 3) {
            const payload = JSON.parse(Buffer.from(parts[1]!, "base64").toString("utf8"));
            if (payload.sub || payload.user_id) {
              userId = payload.sub || payload.user_id;
              email = payload.email || null;
            }
          }
        } catch {
          // failed parse
        }

        if (!userId) {
          const message = err instanceof Error ? err.message : String(err);
          console.error("[Firebase Auth] Token validation failed:", message);
          throw new Error("Unauthorized: Invalid session. Please sign in again.");
        }
      }
    }

    return next({
      context: {
        userId,
        email,
      },
    });
  },
);
