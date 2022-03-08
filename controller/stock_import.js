const dbConnection = require("../database");

const Delete_Import_Blood = (req, res) => {
  const { id } = req.query;
  dbConnection
    .execute(`DELETE FROM blood WHERE id = ${id};`)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

//********************************//
const Select_Import_Blood = (req, res) => {
  const { ip, computerName } = req.query;
  console.log("======", req.query);
  dbConnection
    .execute(
      ` select b.* 
      , h.hos_long_name_th
      , t.s_name
      , DATE_FORMAT(DATE_ADD(b.receive_date , INTERVAL 543 YEAR), '%d/%m/%Y') as unit_receive
      , DATE_FORMAT(DATE_ADD(b.donor_date  , INTERVAL 543 YEAR), '%d/%m/%Y') as unit_collect
      , DATE_FORMAT(DATE_ADD(b.expiry_date , INTERVAL 543 YEAR), '%d/%m/%Y') as unit_exp
      , DATE_FORMAT(DATE_ADD(b.insert_date , INTERVAL 543 YEAR), '%d/%m/%Y') as unit_ins
      
      from blood as b
      left join blood_type as t ON b.blood_type = t.id
      left join bb_hospitals as h ON b.blood_receive = h.hos_id
      where status = 15
      and DATE_FORMAT(b.insert_date, '%d/%m/%Y') = DATE_FORMAT(now(), '%d/%m/%Y') 
      and b.ip_address ='${ip}'
      and b.computer_name ='${computerName}'
      order by b.id desc`
    )

    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
// ********************************//
const Insert_Import_Blood = async (req, res) => {
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
    ip,
    computer_name,
  } = req.body;
  console.log("===============req", req.body);
  const strQuery2 = `select * from blood where blood_no = '${unit_no}' and blood_type = '${type_id}';`;
  try {
    const results = await dbConnection.execute(strQuery2);
    if (results[0].length > 0) {
      return res.status(200).json({
        status: "error",
        error: "error",
      });
    } else {
      const strQuery3 = `INSERT INTO blood (id,blood_type, blood_receive, blood_bag_type_id, liquid, receive_date, donor_date, expiry_date, blood_group, blood_rh, blood_value, blood_no, note, staff_name,status,ip_address,computer_name,insert_date) 
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
      '${staff_name}',
      '15',
      '${ip}',
      '${computer_name}',
      now()
      );`;
      console.log("====strQuery3", strQuery3);
      const results2 = await dbConnection.execute(strQuery3);
      return res.status(200).json(results2[0]);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//********************************//
const Update_Import_Blood = (req, res) => {
  const { ids, ip, computerName } = req.body;
  // const strQuery = `UPDATE blood set status = '1'  WHERE id in  ('15','16') and ip ='${ip}' and date = 'DATE_FORMAT(now(), '%Y/%m/%d')';`;
  const strQuery = `UPDATE blood set status = '1'  WHERE id in  (${ids}) and ip_address ='${ip}' and computer_name ='${computerName}' and receive_date = DATE_FORMAT(now(), '%Y/%m/%d') ;`;
  console.log(strQuery);
  dbConnection
    .execute(strQuery)
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
  Delete_Import_Blood,
};
