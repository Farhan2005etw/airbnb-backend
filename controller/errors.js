exports.pageNotFound = (req, res, next) => {
  res
    .status(404)
    .render("404", {
      PageTitle: "Page Not Found",
      isLoggedIn: req.isLoggedIn,
      user: {},
    });
};
