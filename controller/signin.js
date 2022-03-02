const dbConnection = require("../database");

const signin = (req, res) => {
  const user_name = req.body.user_name;
  const password = req.body.password;

  const strQuery =
    "SELECT * FROM bb_user where user_name='" +
    user_name +
    "' and password = '" +
    password +
    "'";
  console.log(strQuery);
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0][0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

module.exports = {
  signin,
};
