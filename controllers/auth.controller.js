const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      const isValid = await bcrypt.compareSync(password, user.password);
      if (!isValid) {
        return res.status(403).json({
          success: true,
          message: "Хэрэглэгчийн нэр эсвэл нууц үг таарсангүй",
        });
      } else {
        return res.status(200).json({
          success: true,
          data: user,
          message: "Амжилттай нэвтэрлээ",
        });
      }
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// sign up
const signup = async (req, res, next) => {
  try {
    const { fname, lname, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      res
        .status(201)
        .json({ message: "Аль хэдийн бүртгэгдсэн мэйл хаяг байна" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 4);
      const newUser = new User({
        fname: fname,
        lname: lname,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(200).json({ success: true, message: "Амжилттай бүртгэгдлээ" });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = { login, signup };
