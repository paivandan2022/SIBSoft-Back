const dbConnection = require("../database");

const user = (req, res) => {
  dbConnection
    .execute(
      "SELECT *, if(flag_delete='1','ปกติ','ยกเลิก') as flag_delete2 FROM `bb_user` Order by id_user desc;"
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//********************************//
const adddata_user = (req, res) => {
  const strQuery2 =
    " INSERT INTO bb_user (user_type, user_name, password, pname, fname, lname, job_id, his_id, flag_delete ,pic) VALUES  ('" +
    req.body.user_type +
    "' , '" +
    req.body.user_name +
    "' , '" +
    req.body.password +
    "' , '" +
    req.body.pname +
    "' , '" +
    req.body.fname +
    "' , '" +
    req.body.lname +
    "' , '" +
    (req.body.job_id || "") +
    "' , '" +
    (req.body.his_id || "") +
    "','1'" +
    ",'" +
    (req.body.pic || "") +
    "')";

  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//********************************//
const update_user = (req, res) => {
  const strQuery2 =
    "UPDATE bb_user set user_type = '" +
    req.body.user_type +
    "', user_name= '" +
    req.body.user_name +
    "', password = '" +
    req.body.password +
    "', pname = '" +
    req.body.pname +
    "', fname = '" +
    req.body.fname +
    "', lname = '" +
    req.body.lname +
    "', job_id = '" +
    req.body.job_id +
    "', his_id = '" +
    req.body.his_id +
    "', flag_delete = '" +
    req.body.flag_delete +
    "', datetime_edit = now() " +
    " WHERE id_user = '" +
    req.body.id_user +
    "';";
  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
module.exports = {
  user,
  adddata_user,
  update_user,
};
