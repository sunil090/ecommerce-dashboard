

// Accepts array or single role
const authorizeRoles = (allowedRoles) => {
if (!Array.isArray(allowedRoles)) allowedRoles = [allowedRoles];
return (req, res, next) => {
if (!req.user) return next(new ApiError(401, 'User not authenticated'));
// user.role could be string or role object depending on your user model. Normalize:
const userRole = req.user.role && typeof req.user.role === 'string' ? req.user.role : (req.user.role && req.user.role.name) || req.user.roleId || null;
if (!userRole) return next(new ApiError(403, 'Access denied'));


if (!allowedRoles.includes(userRole)) return next(new ApiError(403, 'Access denied'));
return next();
};
};


module.exports = { authorizeRoles };