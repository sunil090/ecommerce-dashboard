// src/middlewares/authorization.middleware.js
const ApiError = require("../utils/apiError");
const { User, Role, Permission } = require("../models");

// simple async handler wrapper
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// helper: accept numeric strings like "1" but reject UUIDs
function looksLikeInteger(v) {
  return typeof v === "string" && /^[0-9]+$/.test(v);
}

// helper: safely get association property ignoring case or alias variants
function getAssociatedArray(obj, keys = ["roles", "Roles"]) {
  for (const k of keys) {
    if (Array.isArray(obj[k])) return obj[k];
  }
  // fallback: return empty array if nothing matches
  return [];
}

/**
 * Load roles for a user and return an array of plain role objects
 * Each role object will include a `permissions` array of plain permission objects
 */
async function loadUserRoles(userId) {
  if (!userId) return [];

  const idStr = String(userId).trim();
  console.log("🧩 loadUserRoles received userId:", idStr);

  // If id looks numeric, use findByPk with a number
  if (looksLikeInteger(idStr)) {
    const numericId = Number(idStr);
    try {
      const user = await User.findByPk(numericId, {
        include: [
          {
            model: Role,
            as: "roles",
            include: [{ model: Permission, as: "permissions" }],
              timestamps: false  // <- key fix

          },
        ],
      });
      if (!user) return [];
      const rolesArr = getAssociatedArray(user, ["roles", "Roles"]);
      return rolesArr.map((r) => (typeof r.get === "function" ? r.get({ plain: true }) : r));
    } catch (err) {
      console.error("🔥 ERROR in loadUserRoles (numeric path):", err.message);
      return [];
    }
  }

  // If not numeric, try to lookup by uuid column if model has it
  if (User.rawAttributes && User.rawAttributes.uuid) {
    try {
      const user = await User.findOne({
        where: { uuid: idStr },
        include: [
          {
            model: Role,
            as: "roles",
            include: [{ model: Permission, as: "permissions" }],
              timestamps: false  // <- key fix if your table doesn't have updated_at

          },
        ],
      });
      if (!user) return [];
      const rolesArr = getAssociatedArray(user, ["roles", "Roles"]);
      return rolesArr.map((r) => (typeof r.get === "function" ? r.get({ plain: true }) : r));
    } catch (err) {
      console.error("🔥 ERROR in loadUserRoles (uuid path):", err.message);
      return [];
    }
  }

  // No numeric id and no uuid column present — avoid DB type error and return empty
  console.warn("⚠️ loadUserRoles skipped DB lookup because userId is not numeric and no uuid column exists:", idStr);
  return [];
}

function getUserRoleNames(roles) {
  if (!Array.isArray(roles)) return [];
  return roles
    .map((r) => {
      if (!r) return null;
      return r.name || (typeof r.get === "function" ? r.get("name") : null);
    })
    .filter(Boolean);
}

function getUserPermissionsSet(roles) {
  const set = new Set();
  if (!Array.isArray(roles)) return set;

  roles.forEach((r) => {
    const perms = r.permissions || r.Permissions || [];
    perms.forEach((p) => {
      const name = p?.name || (typeof p?.get === "function" ? p.get("name") : null);
      if (name) set.add(name);
    });
  });

  return set;
}

/**
 * hasAccess checks the req.user against required roles or permissions.
 * If neither roles nor permissions are provided, returns true.
 */
// debug-enabled hasAccess (replace existing hasAccess)
async function hasAccess(req, { roles = [], permissions = [] } = {}) {
  if (!req.user) {
    console.warn('AUTH DEBUG: no req.user present');
    return false;
  }

  const maybeId = req.user.id ?? req.user.sub ?? null;
  console.log('AUTH DEBUG: checking access for user id:', maybeId);

  const userRoles = await loadUserRoles(maybeId);
  const roleNames = getUserRoleNames(userRoles);
  const permSet = getUserPermissionsSet(userRoles);

  console.log('AUTH DEBUG: roles found:', roleNames);
  console.log('AUTH DEBUG: permissions found:', Array.from(permSet));

  if (roles.length && roles.some((r) => roleNames.includes(r))) {
    console.log('AUTH DEBUG: allowed by role match');
    return true;
  }

  if (permissions.length && permissions.some((p) => permSet.has(p))) {
    console.log('AUTH DEBUG: allowed by permission match');
    return true;
  }

  const allowedWhenNothingRequired = roles.length === 0 && permissions.length === 0;
  console.log('AUTH DEBUG: roles required:', roles, 'permissions required:', permissions, 'allow when nothing required:', allowedWhenNothingRequired);

  return allowedWhenNothingRequired;
}
function authorize({ roles = [], permissions = [] } = {}) {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) throw new ApiError(401, "Authentication required");
    const ok = await hasAccess(req, { roles, permissions });
    if (!ok) throw new ApiError(403, "Forbidden");
    return next();
  });
}

module.exports = {
  authorize,
  loadUserRoles,
  getUserRoleNames,
  getUserPermissionsSet,
  hasAccess,
};
