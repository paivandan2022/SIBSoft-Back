const dbConnection = require("../database");

const CheckUnitImport = (req, res) => {
  const { type_id, unit_no, blood_id } = req.query;
  dbConnection
    .execute(
      `select * from blood 
          where blood_no = ${unit_no}
          and blood_type = ${type_id}
          and id = ${blood_id}`
    )
    .then((results) => {
      if (results[0].length > 0) {
        res.status(200).json({ message: "fail" });
      } else {
        res.status(200).json({ message: "pass" });
      }
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

module.exports = {
  CheckUnitImport,
};
