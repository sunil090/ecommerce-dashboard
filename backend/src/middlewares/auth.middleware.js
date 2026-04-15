// src/middlewares/auth.middleware.js
const { verifyToken } = require("../utils/token");
const tokenRepo = require("../repositories/token.repository");
const userRepo = require("../repositories/user.repository");
const { authorize } = require("./authorization.middleware");
const ApiError = require("../utils/ApiError");
function looksLikeInteger(v) {
  // allow numeric strings like "1", disallow UUIDs and other chars
  return typeof v === "string" && /^[0-9]+$/.test(v);
}

async function isAuthenticated(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (!match) return next(new ApiError(401, "Authentication required"));

    const token = match[1];
    const blacklisted = await tokenRepo.isBlacklisted(token);
    if (blacklisted) return next(new ApiError(401, "Token revoked"));

    const payload = verifyToken(token); // throws if invalid
    if (!payload || !payload.sub) return next(new ApiError(401, "Invalid token payload"));

    let user = null;
    const sub = String(payload.sub);

    // 1) If the token sub looks like an integer use findById (findByPk)
    if (looksLikeInteger(sub)) {
      user = await userRepo.findById(Number(sub));
    } else {
      // 2) Fallback: try a uuid lookup if your repo supports it
      //    Add userRepo.findByUuid implementation (example below) if needed.
      if (typeof userRepo.findByUuid === "function") {
        user = await userRepo.findByUuid(sub);
      } else {
        // If no uuid column exists in DB, do not call findById with UUID. Instead return 401
        return next(new ApiError(401, "Invalid token user"));
      }
    }

    if (!user) return next(new ApiError(401, "Invalid token user"));

    req.user = user;
    req.token = token;
    return next();
  } catch (err) {
    // keep errors tidy and not leaking DB exceptions
    return next(err);
  }
}

function isAdmin(req, res, next) {
  return authorize({ roles: ["admin"] })(req, res, next);
}

module.exports = { isAuthenticated, isAdmin };
