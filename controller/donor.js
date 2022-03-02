const dbConnection = require("../database");

const pname_en_th = (req, res) => {
  dbConnection
    .execute(
      " select t1.perfix_id as prefix_id_th, t1.perfix_name as pname_th ,t2.perfix_id as prefix_id_en, t2.perfix_name as pname_en " +
        " from (select perfix_id, perfix_name from donor_prefix) as t1  " +
        " ,(select perfix_id, perfix_name from donor_prefix_eng) as t2 " +
        " where t1.perfix_id = t2.perfix_id "
    )
    .then((results) => {
      res.send(results[0]);
      console.log("คำนำหน้า", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Add_guest_donor = (req, res) => {
  // console.log("Add_guest_donor", req.body.birthday);
  // console.log("Add_guest_donor", req.body.postcode.zipcode);
  // console.log("Add_guest_donor", req.body.value.cid);
  const strAdd_G_donor =
    " INSERT INTO guest_donor " +
    " (cid, passport, bloodgroup, pname, fname, lname, pname_en, " +
    " fname_en, lname_en, sex, marrystatus, job, phone, " +
    " email, birthday, addrpart, soipart, moopart, roadpart, " +
    " chwpart, tmbpart, amppart, postcode ,image) " +
    " VALUES  ('" +
    req.body.value.cid +
    "' , '" +
    req.body.value.passport +
    "' , '" +
    req.body.value.group +
    "' , '" +
    req.body.value.pname +
    "' , '" +
    req.body.value.fname +
    "' , '" +
    req.body.value.lname +
    "' , '" +
    req.body.value.pname_en +
    "' , '" +
    req.body.value.fname_en +
    "' , '" +
    req.body.value.lname_en +
    "' , '" +
    req.body.value.sex +
    "' , '" +
    req.body.value.marrystatus +
    "' , '" +
    req.body.value.job +
    "' , '" +
    req.body.value.phone +
    "' , '" +
    req.body.value.email +
    "' , '" +
    req.body.birthday +
    "' , '" +
    req.body.value.addrpart +
    "' , '" +
    req.body.value.soipart +
    "' , '" +
    req.body.value.moopart +
    "' , '" +
    req.body.value.roadpart +
    "' , '" +
    req.body.value.chwpart +
    "' , '" +
    req.body.value.tmbpart +
    "' , '" +
    req.body.value.amppart +
    "' , '" +
    req.body.postcode.zipcode +
    "', '" +
    req.body.value.cid +
    "')";

  console.log(strAdd_G_donor);
  dbConnection
    .execute(strAdd_G_donor)
    .then((results) => {
      res.send("OK");
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_group = (req, res) => {
  dbConnection
    .execute("select * from blood_group")
    .then((results) => {
      res.send(results[0]);
      console.log("bloodgroup", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_mary = (req, res) => {
  dbConnection
    .execute("SELECT * FROM donor_marital_status ")
    .then((results) => {
      res.send(results[0]);
      console.log("สถานะ", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_occu = (req, res) => {
  dbConnection
    .execute("SELECT * FROM donor_occupation ")
    .then((results) => {
      res.send(results[0]);
      console.log("อาชีพ", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_sex = (req, res) => {
  dbConnection
    .execute("SELECT * FROM bb_sex")
    .then((results) => {
      res.send(results[0]);
      console.log("เพศ", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_Zip = (req, res) => {
  dbConnection
    .execute(
      "select zipcode from donor_zipcodes where district_code = '" +
        req.query.DISTRICT_CODE +
        "' "
    )
    .then((results) => {
      res.send(results[0]);
      console.log("ไปรษณีย์", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_Tumbon = (req, res) => {
  dbConnection
    .execute(
      "select DISTRICT_CODE , DISTRICT_NAME from donor_districts where AMPHUR_ID = '" +
        req.query.AMPHUR_ID +
        "' order by DISTRICT_NAME asc; "
    )
    .then((results) => {
      res.send(results[0]);
      console.log("ตำบล", req.query.AMPHUR_ID);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_Aumpure = (req, res) => {
  dbConnection
    .execute(
      "select AMPHUR_ID, AMPHUR_NAME from donor_amphures where PROVINCE_ID = '" +
        req.query.PROVINCE_ID +
        "' order by AMPHUR_NAME asc "
    )
    .then((results) => {
      res.send(results[0]);
      console.log("อำเภอ", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_Province = (req, res) => {
  dbConnection
    .execute(
      "select PROVINCE_ID, PROVINCE_NAME from donor_provinces order by PROVINCE_NAME asc; "
    )
    .then((results) => {
      res.send(results[0]);
      console.log("จังหวัด", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_donor_list = (req, res) => {
  dbConnection
    .execute(
      " SELECT gd.*, " +
        " concat(gd.pname,' ', gd.fname, ' ', gd.lname) as fullname , " +
        " job.occu_name, " +
        " marry.status_name, " +
        " t.DISTRICT_NAME, " +
        " a.AMPHUR_NAME, " +
        " p.PROVINCE_NAME, " +
        " gd.image, " +
        " sex.name AS sex, " +
        " concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), gd.birthday)), '%Y') + 0, char), ' ปี ',CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), gd.birthday)), '%m') - 1, char), ' เดือน ') as age" +
        " FROM guest_donor AS gd " +
        " LEFT JOIN donor_provinces AS p " +
        "   ON gd.chwpart = p.PROVINCE_ID " +
        " LEFT JOIN donor_amphures AS a " +
        "   ON gd.amppart = a.AMPHUR_ID " +
        " LEFT JOIN donor_districts AS t " +
        "   ON gd.tmbpart = t.DISTRICT_CODE " +
        " LEFT JOIN donor_marital_status AS marry " +
        "   ON gd.marrystatus = marry.status_id " +
        " LEFT JOIN donor_occupation AS job " +
        "   ON gd.job = job.occu_id " +
        " LEFT JOIN bb_sex AS sex" +
        "   ON gd.sex = sex.code "
    )
    .then((results) => {
      res.send(results[0]);
      console.log("bloodgroup", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
//=============================//
//=============================//
//=============================//
module.exports = {
  pname_en_th,
  Add_guest_donor,
  Get_group,
  Get_mary,
  Get_occu,
  Get_sex,
  Get_Zip,
  Get_Tumbon,
  Get_Aumpure,
  Get_Province,
  Get_donor_list,
};
