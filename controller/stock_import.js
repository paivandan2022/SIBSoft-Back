const dbConnection = require("../database");

const Select_Import_Blood = (req, res) => {
  dbConnection
    .execute("SELECT * FROM blood where receive_date.now() Order by id desc;")
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
// ********************************//
const Insert_Import_Blood = (req, res) => {
  const {
    type_id,
    hos_id,
    bag_type_id,
    liquid_id,
    date_received,
    date_collect,
    date_exp,
    exp_time,
    blood_group,
    blood_rh,
    volume,
    unit_no,
    note,
    staff_name,
  } = req.body;

  const strQuery2 = `select * from blood where blood_no = '${unit_no}' and blood_type = '${type_id}';`;
  dbConnection
    .execute(strQuery2)
    .then((results) => {
      if (results[0].length > 0) {
        console.log("fail+++++++++++++++++", strQuery2);
        return res.status(200).json({
          status: "error",
          error: "++00++",
        });
      } else {
        const strQuery3 = `INSERT INTO blood (id,blood_type, blood_receive, blood_bag_type_id, liquid, receive_date, donor_date, expiry_date, blood_group, blood_rh, blood_value, blood_no, note, staff_name) 
        VALUES ( (select (max(t1.id)+1) FROM blood as t1),
        '${type_id}',
        '${hos_id}',
        '${bag_type_id}',
        '${liquid_id || "0"}',
        '${date_received}',
        '${date_collect}',
        '${date_exp} ${exp_time}',
        '${blood_group || ""}',
        '${blood_rh || ""}',
        '${volume || ""}',
        '${unit_no}',
        '${note || ""}',
        '${staff_name}');`;
        console.log("True+++++++++++++++++", strQuery3);
        dbConnection
          .execute(strQuery3)
          .then((results) => {
            res.send(results[0]);
          })
          .catch((error) => {
            console.log("error+++++++++++++++error", error);
            return res.status(200).json({ message: "error insert++++" });
          });
      }
    })
    .catch((error) => {
      console.log("+++++++++++++++error", error);
      return res.status(200).json({ message: "error" });
    });
};
//********************************//
const Update_Import_Blood = (req, res) => {
  const strQuery2 =
    "UPDATE blood set blood_type = '" +
    req.body.type_id +
    "', blood_receive= '" +
    req.body.hos_id +
    "', blood_bag_type_id = '" +
    req.body.bag_type_id +
    "', liquid = '" +
    req.body.liquid_id +
    "', receive_date = '" +
    req.body.date_received +
    "', donor_date = '" +
    req.body.date_collect +
    "', expiry_date = '" +
    req.body.date_exp +
    " " +
    req.body.exp_time +
    "', blood_group = '" +
    req.body.blood_group +
    "', blood_rh = '" +
    req.body.blood_rh +
    "', blood_value = '" +
    req.body.volume +
    "', blood_no = '" +
    req.body.unit_no +
    "', note = '" +
    req.body.note +
    "', staff_name = '" +
    req.body.staff_name +
    "' WHERE id = '" +
    req.body.blood_id +
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
  Select_Import_Blood,
  Insert_Import_Blood,
  Update_Import_Blood,
};
