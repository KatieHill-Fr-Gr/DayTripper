
const signedInUser = (req, res, next) => {
  if (req.session.user) return next();
  req.session.redirectTo = req.originalUrl;
  res.redirect("/auth/sign-in");
};

export default signedInUser;