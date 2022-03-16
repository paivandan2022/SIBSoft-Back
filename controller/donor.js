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
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

//=============================//
const Add_guest_donor = (req, res) => {
  const {
    cid,
    passport,
    group,
    pname,
    fname,
    lname,
    pname_en,
    fname_en,
    lname_en,
    sex,
    marrystatus,
    job,
    phone,
    email,
    birthday,
    addrpart,
    soipart,
    moopart,
    roadpart,
    chwpart,
    tmbpart,
    amppart,
    postcode,
    image,
  } = req.body;
  const strAdd_G_donor = `INSERT INTO donor_guest
    (
      cid, passport, bloodgroup, pname, fname, lname, pname_en, fname_en, lname_en, sex, marrystatus, job, phone,  email, birthday, addrpart, soipart, moopart, roadpart, chwpart, tmbpart, amppart, 
      postcode ,image,insert_date,status
    ) 
    VALUES  
    (
    '${cid}' , 
    '${passport || ""}' ,
    '${group}' , 
    '${pname}' , 
    '${fname}' , 
    '${lname}' , 
    '${pname_en}' ,
    '${fname_en}' , 
    '${lname_en}' , 
    '${sex}' , 
    '${marrystatus}' , 
    '${job}' , 
    '${phone || ""}' ,
    '${email || ""}' , 
    '${birthday}' ,
    '${addrpart}' ,
    '${soipart || ""}' ,
    '${moopart || ""}' , 
    '${roadpart || ""}' , 
    '${chwpart}' , 
    '${tmbpart}' , 
    '${amppart}' ,
    '${postcode.zipcode}',
    '${image}',
    now(),
    '1'

      )`;
  dbConnection
    .execute(strAdd_G_donor)
    .then((results) => {
      res.send("OK");
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
//=============================//
const Get_group = (req, res) => {
  dbConnection
    .execute("select * from blood_group")
    .then((results) => {
      res.send(results[0]);
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
      // console.log("เพศ", results[0]);
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
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
//============fetchnew=================//
const Get_Tumbon_new = (req, res) => {
  dbConnection
    .execute(
      "select DISTRICT_CODE , DISTRICT_NAME from donor_districts where AMPHUR_ID = '" +
        req.query.AMPHUR_ID +
        "' order by DISTRICT_NAME asc; "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_Aumpure_new = (req, res) => {
  dbConnection
    .execute(
      "select AMPHUR_ID, AMPHUR_NAME from donor_amphures where PROVINCE_ID = '" +
        req.query.PROVINCE_ID +
        "' order by AMPHUR_NAME asc "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_Province_new = (req, res) => {
  dbConnection
    .execute(
      "select PROVINCE_ID, PROVINCE_NAME from donor_provinces order by PROVINCE_NAME asc; "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
const Get_Zip_new = (req, res) => {
  dbConnection
    .execute(
      "select zipcode from donor_zipcodes where district_code = '" +
        req.query.DISTRICT_CODE +
        "' "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Get_donor_list = (req, res) => {
  const { id, date_start, date_end, keyword } = req.query;
  const whereCondition = [];
  if (id) {
    whereCondition.push(`cid=${id}`);
  }
  if (date_start && date_end) {
    whereCondition.push(
      `insert_date between "${date_start} 00:00:00" and "${date_end} 23:59:59"`
    );
  }
  if (keyword) {
    whereCondition.push(
      ` concat(fname, ' ', lname) like '%${keyword}%' or cid='${keyword}'  `
    );
  }
  const queryString =
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
    " ,bs.status_name " +
    " FROM donor_guest AS gd " +
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
    "   ON gd.sex = sex.code " +
    " left join donor_blood_status as bs ON gd.status = bs.id " +
    `${
      whereCondition.length > 0 ? ` where ${whereCondition.join(" AND ")}` : ""
    }`;
  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(500).json({ message: "error", error: error.message });
    });
};
//------------------------------//
const Get_donor_list_open = (req, res) => {
  const { id } = req.query;
  const queryString =
    " SELECT gd.*, " +
    " concat(gd.pname,' ', gd.fname, ' ', gd.lname) as fullname , " +
    " job.occu_name, " +
    " d.phone as donor_phone, " +
    " gd.birthday as dob, " +
    " d.email as donor_email, " +
    " marry.status_name, " +
    " t.DISTRICT_NAME, " +
    " a.AMPHUR_NAME, " +
    " p.PROVINCE_NAME, " +
    " gd.image, " +
    " sex.name AS sex, " +
    " concat(CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), gd.birthday)), '%Y') + 0, char), ' ปี ',CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), gd.birthday)), '%m') - 1, char), ' เดือน ', CONVERT(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), gd.birthday)), '%d') - 1, char), ' วัน ') as age " +
    " , d.donor_no as donor_no " + //รหัสผู้บริจาค
    // " , db.donor_count as donor_count" + //ครั้งที่
    // " , concat(SUBSTRING(db.unit_no FROM 1 FOR 3), '.'  " +
    // " , SUBSTRING(db.unit_no FROM 4 FOR 2), '.'  " +
    // " , SUBSTRING(db.unit_no FROM 6 FOR 1), '.'  " +
    // " , SUBSTRING(db.unit_no FROM 7)) as Unitnumber_dot  " + //เลขที่ถุงเลือด
    // " , DATE_FORMAT(DATE_ADD(db.donor_date, INTERVAL 543 YEAR), '%d/%m/%Y') as donor_date " + //วันที่บริจาค
    // " , m.MOBNAME as mobname " + //หน่วยบริจาค
    // " , db.donor_type  as donor_type" + //ถุง
    // " , concat(db.dorngro, ifnull(db.dornrh,'')) as bag_gr " + //หมู่เลือด
    // " , concat(ifnull(db.Saline,' '), ifnull(db.Papain,' '), ifnull(db.Coombs,' '), ifnull(db.antia,' '), ifnull(db.antib,' ') " +
    // " , ifnull(db.hbsag,' '), ifnull(db.TPHA,' '), ifnull(db.hiv,' '), ifnull(db.HBVNAT,' '), ifnull(db.HCVNAT,' '), ifnull(db.HIVNAT,' ') " +
    // " , ifnull(db.alt,' '), ifnull(db.hcv,' '), ifnull(db.hivag,' ')) as blood_result " + //ผลตรวจ
    " FROM donor_guest AS gd " +
    " left join donor as d ON gd.cid = d.cid  " +
    // " left join donor_blood as db ON d.donor_no = db.donor_no " +
    // " left join donor_mobile as m ON db.service_id = m.MOBCODE " +
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
    "   ON gd.sex = sex.code " +
    ` where gd.cid = '${id}' `;
  // " order by db.dn desc ";
  //console.log("queryString--------->", queryString);
  dbConnection
    .execute(queryString)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error", error: error.message });
    });
};
//===============ประวัติการบริจาคเลือด==============//
const Get_history_donor = (req, res) => {
  dbConnection
    .execute(
      "select donor_count as count_his ,  unit_no as number_his , donor_date as date_his , CONCAT( dorngro,  dornrh ) as group_his  from donor_blood "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//==============ประวัติการบริจาคเลือด===============//

//===============รายชื่อเจ้าหน้าที่==============//
const Get_staff = (req, res) => {
  dbConnection
    .execute(
      "select concat(pname,' ',fname,' ',lname) as fullname from bb_user "
    )
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//==============รายชื่อเจ้าหน้าที่===============//
//==============คำถามก่อนกดสมัคร ยืนยัน==============//
const Get_question = (req, res) => {
  dbConnection
    .execute("select * from donor_questionnaire_list")
    .then((results) => {
      res.send(results[0]);
      // console.log("คำถาม", results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};

//=============================//

// ===========เพิ่มข้อมูลหน้า frmedit=========
const Add_donor_frmedit = async (req, res) => {
  const {
    staff,
    cid,
    bloodgroup,
    pname,
    fname,
    lname,
    pname_en,
    fname_en,
    lname_en,
    sex,
    marrystatus,
    job,
    donor_phone,
    donor_email,
    birthday,
    addrpart,
    soipart,
    moopart,
    roadpart,
    chwpart,
    tmbpart,
    amppart,
    postcode,
    addrpart_new,
    soipart_new,
    moopart_new,
    roadpart_new,
    chwpart_new,
    tmbpart_new,
    amppart_new,
    postcode_new,
    image,
    address_more,
  } = req.body;

  const check_frmedit = `SELECT pid,donor_no from donor where cid = '${cid}';`;
  try {
    const results = await dbConnection.execute(check_frmedit);
    let strAdd_history_donor;
    if (results[0].length > 0) {
      //Update
      strAdd_history_donor = `update  donor  set
         cid = '${cid}'
         , bloodgroup ='${bloodgroup}'
         , pname = '${pname}'
         , fname ='${fname}'
         , lname ='${lname}'
         , pname_en = '${pname_en || ""}' 
         , fname_en = '${fname_en || ""}' 
         , lname_en = '${lname_en || ""}' 
         , sex = if('${sex}'='หญิง','2',if('${sex}' = 'ชาย','1','${sex}'))
         , marrystatus = '${marrystatus}'
         , job ='${job}'
         , phone ='${donor_phone || ""}'
         ,  email ='${donor_email || ""}'
         , birthday ='${birthday}' 
         , addrpart=  '${addrpart}'
         , soipart ='${soipart}'
         , moopart ='${moopart}'
         , roadpart ='${roadpart}'
         , chwpart ='${chwpart}'
         , tmbpart ='${tmbpart}'
         , amppart = '${amppart}'
         , postcode = '${postcode.zipcode}'
          , addrpart_new ='${addrpart_new}'
          ,soipart_new ='${soipart_new}'
          ,moopart_new ='${moopart_new}' 
          ,roadpart_new ='${roadpart_new}' 
          ,chwpart_new ='${chwpart_new}'
          ,tmbpart_new ='${tmbpart_new}' 
          ,amppart_new ='${amppart_new}'
          ,postcode_new ='${postcode_new.zipcode}'
          ,image =  '${image}'
          ,address_more =  '${address_more || ""}'
          where pid =  '${results[0][0].pid}';`;
    } else {
      strAdd_history_donor = `INSERT INTO donor 
    (
      cid, bloodgroup, pname, fname, lname, pname_en, fname_en, lname_en, sex, marrystatus, job, phone,  email, birthday, addrpart, soipart, moopart, roadpart, chwpart, tmbpart, amppart, 
      postcode , addrpart_new,soipart_new,moopart_new,roadpart_new,chwpart_new,tmbpart_new,amppart_new,postcode_new,image,address_more) 
    VALUES  
    (
    '${cid}' , 
    '${bloodgroup}' , 
    '${pname}' , 
    '${fname}' , 
    '${lname}' , 
    '${pname_en || ""}' ,
    '${fname_en || ""}' , 
    '${lname_en || ""}' , 
    if('${sex}'='หญิง','2',if('${sex}' = 'ชาย','1','${sex}')) , 
    '${marrystatus}' , 
    '${job}' , 
    '${donor_phone || ""}' ,
    '${donor_email || ""}' , 
    '${birthday}' ,
    '${addrpart}' ,
    '${soipart || ""}' ,
    '${moopart || ""}' , 
    '${roadpart || ""}' , 
    '${chwpart}' , 
    '${tmbpart}' , 
    '${amppart}' ,
    '${postcode.zipcode}',
    '${addrpart_new}' ,
    '${soipart_new}' ,
    '${moopart_new}' , 
    '${roadpart_new}' , 
    '${chwpart_new}' , 
    '${tmbpart_new}' , 
    '${amppart_new}' ,
    '${postcode_new.zipcode}',
    '${image}',
    '${address_more || ""}',
    );`;
    }
    let insert_donor_blood;
    const check = `SELECT * from donor_blood where cid = '${cid}' and status ='2' ;`;
    const resultscheck = await dbConnection.execute(check);
    if (resultscheck[0].length > 0) {
      insert_donor_blood = `update donor_blood set cid='${cid}', donor_no = '${results[0][0].donor_no}',pid='${results[0][0].pid}' , staff_register = '${staff}' where dn ='${resultscheck[0][0].dn}';`;
    } else {
      insert_donor_blood = `insert into donor_blood (cid, donor_no,pid, donor_date, status, staff_register) values ('${cid}', '${results[0][0].donor_no}','${results[0][0].pid}' ,now(), '2', '${staff}');`;
    }
    const update_guest_donor = `update donor_guest set status = '2' where cid = '${cid}' and status = '1';`;
    const results2 = await Promise.all([
      dbConnection.execute(strAdd_history_donor),
      dbConnection.execute(insert_donor_blood),
      dbConnection.execute(update_guest_donor),
    ]);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "error", message: error.message });
  }
};

const Get_Donor_Blood = async (req, res) => {
  const { donor_no } = req.query;
  const str = `select db.donor_no AS donor_no,
db.donor_count AS donor_count,
concat(
SUBSTRING( db.unit_no FROM 1 FOR 3 ),
'.',
SUBSTRING( db.unit_no FROM 4 FOR 2 ),
'.',
SUBSTRING( db.unit_no FROM 6 FOR 1 ),
'.',
SUBSTRING( db.unit_no FROM 7 ) 
) AS Unitnumber_dot,
DATE_FORMAT( DATE_ADD( db.donor_date, INTERVAL 543 YEAR ), '%d/%m/%Y' ) AS donor_date,
m.MOBNAME AS mobname,
db.donor_type AS donor_type,
concat( db.dorngro, ifnull( db.dornrh, '' ) ) AS bag_gr,
concat(
ifnull( db.Saline, ' ' ),
ifnull( db.Papain, ' ' ),
ifnull( db.Coombs, ' ' ),
ifnull( db.antia, ' ' ),
ifnull( db.antib, ' ' ),
ifnull( db.hbsag, ' ' ),
ifnull( db.TPHA, ' ' ),
ifnull( db.hiv, ' ' ),
ifnull( db.HBVNAT, ' ' ),
ifnull( db.HCVNAT, ' ' ),
ifnull( db.HIVNAT, ' ' ),
ifnull( db.alt, ' ' ),
ifnull( db.hcv, ' ' ),
ifnull( db.hivag, ' ' ) 
) AS blood_result 
FROM donor_blood as db
LEFT JOIN donor_mobile AS m ON db.service_id = m.MOBCODE
where db.donor_no = '${donor_no}'
and db.result IS NOT NULL 
order by db.pid desc;`;

  dbConnection
    .execute(str)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
};
//=============================//
const Eject_register = async (req, res) => {
  const { eject_note, staff } = req.body;
  const { cid } = req.query;
  console.log("req.query---->", eject_note, staff);
  console.log("cid", cid);
};
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
  Get_Zip_new,
  Get_Tumbon_new,
  Get_Aumpure_new,
  Get_Province_new,
  Get_donor_list,
  Get_staff,
  Get_history_donor,
  Get_question,
  Get_donor_list_open,
  Add_donor_frmedit,
  Get_Donor_Blood,
  Eject_register,
};
