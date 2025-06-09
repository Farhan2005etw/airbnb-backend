const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    PageTitle: "Login",
    errors: [],
    oldInput: { email: "" },
    isLoggedIn: false,
    user: {},
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("auth/signUp", {
    PageTitle: "Sign Up",
    errors: [],
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "",
    },
    isLoggedIn: false,
    user: {},
  });
};

exports.postSignUp = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First Name muse be at least 2 Characters Long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First Name Should Only in Alphabets"),

  check("lastName")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Last Name Should Only in Alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please Enter Valid Email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 Characters Long")
    .matches(/[A-Z]/)
    .withMessage("Password contains atleast One Upper Case")
    .matches(/[a-z]/)
    .withMessage("Password contains atleast One lower Case")
    .matches(/[0-9]/)
    .withMessage("Password contains atleast One Number")
    .matches(/[!@&]/)
    .withMessage("Password contains atleast One Special Character")
    .trim(),

  check("confirmPassword")
    .notEmpty()
    .withMessage("Please Confirm Your Password")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password should be same as Password");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("Please Select User Type")
    .isIn(["guest", "host"])
    .withMessage("Invalid User Type"),

  check("terms").custom((value, { req }) => {
    if (value !== "on") {
      throw new Error("Pleast Accept the terms and conditions");
    }
    return true;
  }),

  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).render("auth/signup", {
        PageTitle: "Sign Up",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, password, userType },
        user: {},
      });
    }

    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType,
      });
      user
        .save()
        .then(() => {
          res.redirect("/login");
        })
        .catch((err) => {
          return res.status(422).render("auth/signup", {
            PageTitle: "Sign Up",
            isLoggedIn: false,
            errors: [err.message],
            oldInput: { firstName, lastName, email, userType },
            user: {},
          });
        });
    });
  },
];

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).render("auth/login", {
      PageTitle: "Login",
      isLoggedIn: false,
      errors: ["invalid id and password"],
      oldInput: { email },
      user: {},
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render("auth/login", {
      PageTitle: "Login",
      isLoggedIn: false,
      errors: ["invalid id and password"],
      oldInput: { email },
      user: {},
    });
  }

  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
