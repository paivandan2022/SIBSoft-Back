const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const dbConnection = require("./database");
const cors = require("cors");
const signin = require("./controller/signin");
const stock = require("./controller/stock");
const stock_detail = require("./controller/stock_detail");
const stock_import = require("./controller/stock_import");
const user = require("./controller/user");
const donor = require("./controller/donor");
const confirmpass = require("./controller/confirmpass");

const bodyParser = require("body-parser");
const configs = require("./configs");
const multer = require("multer");
const app = express();
const fs = require("fs");
const { application } = require("express");
const corsOptions = {
  origin: "http://localhost:3005",
  credentials: true,
};
app.use(cors(corsOptions));

// app.use(cors)
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
// SET OUR VIEWS AND VIEW ENGINE

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// APPLY COOKIE SESSION MIDDLEWARE
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 3600 * 1000, // 1hr
  })
);

app.get("/test", (req, res) => {
  res.status(200).json(configs.MYSQL_HOST);
});

// ROOT PAGE
app.get("/namehos", (req, res) => {
  dbConnection
    .execute("SELECT hos_long_name_th FROM bb_hospitals where hos_id=1")
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});
/////////////////////////
app.post("/signin", signin.signin);
// api ดึงข้อมูล user ทั้งหมด //
app.get("/user", user.user);
/////////////////////////
app.get("/pname", (req, res) => {
  dbConnection
    .execute("SELECT * FROM `bb_title_name`")
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});

//--Upload--//
const imageUploadPath = configs.IMAGE_PATH;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${req.query.id}`);
  },
});

const imageUpload = multer({ storage: storage, maxCount: 1 });
//--POST--//
app.post("/image-upload", imageUpload.array("my-image-file"), (req, res) => {
  console.log("POST request received to /image-upload.");
  console.log("Axios POST body: ", Object.keys(req));
  res.send({
    message: req.query.id,
  });
});

// Upload New
//--Upload--//
const imageUploadPath2 = configs.IMAGE_PATH_2;
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadPath2);
  },
  filename: function (req, file, cb) {
    cb(null, `${req.query.id}`);
  },
});

const imageUpload2 = multer({ storage: storage2, maxCount: 1 });
//--POST--//
app.post(
  "/image-upload-donor",
  imageUpload2.array("my-image-file"),
  (req, res) => {
    console.log("POST request received to /image-upload.");
    console.log("Axios POST body: ", Object.keys(req));
    res.send({
      message: req.query.id,
    });
  }
);

//--PUT--//
app.put("/update_pic/:id", (req, res) => {
  const strQuery2 =
    "UPDATE bb_user set pic = '" +
    req.body.pic +
    "' WHERE id_user = " +
    req.params.id +
    ";";

  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});
///-End Upload-////

// นำ img ออกไปแสดง ///
app.get("/image/:image_name", (req, res) => {
  const pathType = req.query.pathType;
  fs.readFile(
    `${pathType === "2" ? imageUploadPath2 : imageUploadPath}/${
      req.params.image_name
    }`,
    function (err, data) {
      if (!err) {
        res.writeHead(200, {
          "Content-Type": "image/png ,image/jpg, image/jpeg ",
        });
        res.end(data);
      } else {
        console.log(err);
        res.status(500).send(err);
      }
    }
  );
});

// end นำ img ออกไปแสดง ///

// Add data user //
app.post("/adddata_user", user.adddata_user);
//*************************//

app.put("/update_pic/:id", (req, res) => {
  const strQuery2 =
    "UPDATE bb_user set pic = '" +
    req.body.pic +
    "' WHERE id_user = " +
    req.params.id +
    ";";

  dbConnection
    .execute(strQuery2)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});
//*************************//
app.put("/update_user", user.update_user);
// End Add data user ////////////////
app.get("/getabocountall", stock.getabocountall);
/// ///////////////////////
app.get("/totaluser", (req, res) => {
  dbConnection
    .execute("call GetUserCount();")
    .then((results) => {
      res.send(results[0]);
    })

    .catch((error) => {
      return res.status(200).json({ message: "error" });
    });
});
///////////--STOCK BLOOD--/////////////
app.get(`/GetComponentCountAll`, stock.GetComponentCountAll);
app.get(`/GetComponentCountGroup`, stock.GetComponentCountGroup);
app.get(`/GetUnitReadyTypeGroup`, stock.GetUnitReadyTypeGroup);
app.get(`/GetUnitReadyType`, stock.GetUnitReadyType);
app.get(`count_bloodgroup`, stock.count_bloodgroup);
app.get(`/GetUnitDetail`, stock.GetUnitDetail);
app.get(`/OptionType`, stock.OptionType);
app.get(`/SenderBlood`, stock.SenderBlood);
app.get(`/BagType`, stock.BagType);
app.get(`/Blood_Name`, stock.Blood_name);
app.get(`/Rh_Name`, stock.Rh_Name);
app.get(`/Staff_Name`, stock.Staff_Name);
app.get(`/Blood_Liquid`, stock.Blood_Liquid);
app.get(`/GetUnitUpdateDetail`, stock.GetUnitUpdateDetail);
app.get(`/CheckUnitEdit`, stock.CheckUnitEdit);
app.get(`/GetDateTypeExp`, stock.GetDateTypeExp);
app.put(`/Update_Stock`, stock.Update_Stock);
app.get(`/Eject_choice`, stock.Eject_choice);
app.get(`/Eject_staff`, stock.Eject_staff);
app.put(`/UpdateEject`, stock.UpdateEject);
///////////--STOCK BLOOD DETAIL--/////////////
app.get(`/Stock_Detail_status`, stock_detail.Stock_Detail_status);
app.get(`/Stock_Detail_Component`, stock_detail.Stock_Detail_Component);
app.get(`/Stock_Detail_unit`, stock_detail.Stock_Detail_unit);

///////////--STOCK IMPORT--/////////////
//app.get(`/CheckUnitImport`, stock_import.CheckUnitImport);
app.post(`/Insert_Import_Blood`, stock_import.Insert_Import_Blood);
app.put(`/Update_Import_Blood`, stock_import.Update_Import_Blood);
app.get(`/Select_Import_Blood`, stock_import.Select_Import_Blood);
app.delete(`/Delete_Import_Blood`, stock_import.Delete_Import_Blood);
app.get(`/Sum_blood`, stock_import.Sum_blood);
app.post(`/Confirm_password`, stock_import.Confirm_password);

//////////--Donor--////////////////
// start จังหวัด อำเภอ ตำบล
// จังหวัด
app.get(`/Get_Province`, donor.Get_Province);
// อำเภอ
app.get(`/Get_Aumpure`, donor.Get_Aumpure);
// ตำบล
app.get(`/Get_Tumbon`, donor.Get_Tumbon);
// ไปรษณีย์
app.get(`/Get_Zip`, donor.Get_Zip);
// จังหวัด_new
app.get(`/Get_Province_new`, donor.Get_Province_new);
// อำเภอ
app.get(`/Get_Aumpure_new`, donor.Get_Aumpure_new);
// ตำบล
app.get(`/Get_Tumbon_new`, donor.Get_Tumbon_new);
// ไปรษณีย์
app.get(`/Get_Zip_new`, donor.Get_Zip_new);
// เพศ
app.get(`/Get_sex`, donor.Get_sex);
// อาชีพ
app.get(`/Get_occu`, donor.Get_occu);
// สถานะ
app.get(`/Get_mary`, donor.Get_mary);
// bloodgroup
app.get(`/Get_group`, donor.Get_group);
// เพิ่ม guest_regis
app.post(`/Add_guest_donor`, donor.Add_guest_donor);
app.get(`/pname_en_th`, donor.pname_en_th);
app.get(`/Get_donor_list`, donor.Get_donor_list);
app.get(`/Get_donor_list_open`, donor.Get_donor_list_open);
// หน้า Donor_donation_list
app.get(`/Get_history_donor`, donor.Get_history_donor);
app.get(`/Get_staff`, donor.Get_staff);
app.get(`/Get_question`, donor.Get_question);
app.put(`/Add_donor_frmedit`, donor.Add_donor_frmedit);
app.get(`/Get_Donor_Blood`, donor.Get_Donor_Blood);
app.post(`/Eject_register`, donor.Eject_register);

//--END Donor--//
// confirm pass //
app.get(`Confirm_password2`, confirmpass.Confirm_password2);

app.listen(3306, () => console.log("Server is Running..."));
