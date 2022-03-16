const dbConnection = require("../database");
const Confirm_password2 = (req, res) => {
  console.log("------------->", req.body);
  console.log("-------query------>", req.query);
  const password = req.body.password;
  const strQuery = `SELECT * FROM bb_user where  password = ${password}`;
  dbConnection
    .execute(strQuery)
    .then((results) => {
      res.send(results[0][0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", message: error.message });
    });
};

module.exports = {
  Confirm_password2,
};
