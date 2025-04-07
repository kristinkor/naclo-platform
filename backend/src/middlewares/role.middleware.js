export const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.roleId)) {
      return res
        .status(403)
        .json({ message: 'Forbidden: You do not have permission.' })
    }
    next()
  }
}
