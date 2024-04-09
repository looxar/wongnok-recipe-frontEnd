import axios from "axios";

export default {
  name: "EventsList",
  data() {
    return {
      valid: null,
      // model: null,
      modelEmp: null,
      modelCC: null,
      //items: [],
      itemsCC: [],
      itemsEmp: [],
      getDeviceResult: [],
      getEmployeeResult: [],
      deviceheaders: [
        {
          text: "เลขทรัพย์สิน",
          align: "start",
          value: "devPeaNo",
          // width: "15%",
          class: "primary--text",
        },
        {
          text: "คำอธิบายของสินทรัพย์",
          value: "devDescription",
          class: "primary--text",
          // width: "6%"
        },
        {
          text: "ชื่อผู้ครอบครอง",
          value: "tbEmployee.empName",
          class: "primary--text",
          // width: "25%"
        },
        {
          text: "วันที่ได้รับ",
          value: "devReceivedDate",
          class: "primary--text",
          // width: "25%"
        },
      ],
      employeeheaders: [
        {
          text: "รหัสพนักงาน",
          align: "start",
          value: "empId",
          class: "primary--text",
          // width: "10%",
        },
        {
          text: "ชื่อ-นามสกุล",
          value: "empName",
          class: "primary--text",
          // width: "6%"
        },
        {
          text: "ตำแหน่ง",
          value: "empRole",
          class: "primary--text",
          // width: "25%"
        },
      ],
      checkQuotaResult: "",
      totalDeviceResult: 0,
      totalEmployeeResult: 0,
      showVRow: false,
      totalEmployee: "",
      totalDevice: "",
      alert: false,
      itemName: "",
      assetComType: [
        { id: "1", name: "1.Computer or labtop or Tablet", value: "1" },
        {
          id: "2",
          name: "2.Monitor",
          value: "2",
        },
        { id: "3", name: "3.Printer", value: "3" },
        {
          id: "4",
          name: "4.UPS",
          value: "4",
        },
        {
          id: "5",
          name: "5.อุปกรณ์สื่อสาร",
          value: "5",
        },
        {
          id: "6",
          name: "6.อุปกรณ์ประกอบหรืออุปกรณ์อื่นๆ",
          value: "6",
        },
      ],
      selectedAssetComType: {
        id: "1",
        name: "1.Computer or labtop or Tablet",
        value: "1",
      },
      setAssetComType: 1,
      jsonObj: [],
      jsonAssetComType: '{"assetComType":["1"]}',
      checked7: false,
      dialog: false,
      passwordField: "",
      wrongPassword: false,
      quotaCom: 0,
      countElectrician: 0,
      countAssistElectrician: 0,
      empId: "506027",
      passWord: "P@ss2489**",
      dataXML: `<?xml version="1.0" encoding="utf-8"?>\r\n  
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                  xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\r\n   
                  <soap:Body>\r\n    
                    <Login xmlns="http://idm.pea.co.th/">\r\n     
                      <request>\r\n       
                        <InputObject>\r\n          
                          <Username>506027</Username>\r\n           
                          <Password>P@ss2489**</Password>\r\n       
                        </InputObject>\r\n        
                        <WSAuthenKey>e3358fc1-99ad-4b21-8237-7c9c8ba1c5dc</WSAuthenKey>\r\n      
                      </request>\r\n    
                    </Login>\r\n  
                  </soap:Body>\r\n
                </soap:Envelope>`,
    };
  },

  watch: {
    dialog: function (val) {
      if (val) {
        this.passwordField = "";
        console.log("clear password");
      }
    },
  },

  mounted() {
    axios.get("http://localhost:8080/cc/getAllCCOnlyUse").then((response) => {
      this.itemsCC = response.data.costCenter;
    });

    axios.get("http://localhost:8080/emp/getEmp").then((response) => {
      this.itemsEmp = response.data;
    });
  },

  methods: {
    getItemEmp(itemEmp) {
      return `${itemEmp.empId}` + " " + `${itemEmp.empName}`;
    },

    getItemCC(itemsCC) {
      return (
        `${itemsCC.ccShortName}` +
        " " +
        `${itemsCC.ccLongCode}` +
        " " +
        `${itemsCC.ccFullName}`
      );
    },

    updateCC(modelCC) {
      console.log(modelCC.ccLongCode);

      this.modelCC = modelCC;
      // how can I have here the index value?
      this.modelEmp = null;
    },

    updateCCFromEmp(modelEmp) {
      console.log(">> " + modelEmp.costCenter.ccLongCode);

      var result = this.itemsCC.find(
        (item) => item.ccLongCode === modelEmp.costCenter.ccLongCode
      );
      console.log("result " + result.ccLongCode);
      this.modelCC = result;
      // how can I have here the index value?
    },

    async checkQuota() {
      if (this.modelCC == null) {
        this.alert = true;
        window.setInterval(() => {
          this.alert = false;
          // console.log("hide alert after 3 seconds");
        }, 3000);
      } else {
        console.log("param dt_id - ", this.setAssetComType);
        let params = [];

        params = {
          region: this.modelCC["ccLongCode"],
          dt_id: this.setAssetComType,
        };

        if (this.checked7 == false) {
          await axios
            .get("http://localhost:8080/api/dev/getDevice53unpageByccId", {
              params,
            })
            .then((resp2) => {
              // this.getAllResult = resp.data;
              // console.log(
              //   "getAllByPattern2unpage",
              //   JSON.stringify(this.getAllResult)
              // );

              this.getDeviceResult = resp2.data.dataDevice;
              this.totalDeviceResult = resp2.data.totalItems;
              // this.myloadingvariable = false;
            })
            .catch((error) => {
              console.log(error.resp);
            });
        } else {
          await axios
            .get(
              "http://localhost:8080/api/dev/getDevice53unpageByccIdOnly7Year",
              {
                params,
              }
            )
            .then((resp2) => {
              // this.getAllResult = resp.data;
              // console.log(
              //   "getAllByPattern2unpage",
              //   JSON.stringify(this.getAllResult)
              // );

              this.getDeviceResult = resp2.data.dataDevice;
              this.totalDeviceResult = resp2.data.totalItems;
              // this.myloadingvariable = false;
            })
            .catch((error) => {
              console.log(error.resp);
            });
        }
        // let params = [];
        let ccLong = this.modelCC["ccLongCode"];
        //let ccFullName = this.modelCC["ccFullName"];
        let ccShortName = this.modelCC["ccShortName"];
        let ccShortCode = this.modelCC["ccShortCode"];
        console.log("ccLong- " + ccLong);
        params = {
          region: ccLong,
        };
        await axios
          .get("http://localhost:8080/emp/getEmpByccLongCode", { params })
          .then((resp2) => {
            // this.getEmployeeResult = resp.data;
            // console.log(
            //   "getEmpByccLongCode",
            //   JSON.stringify(this.getEmployeeResult)
            // );

            this.getEmployeeResult = resp2.data.dataEmployee;
            this.totalEmployeeResult = resp2.data.totalItems;
            // this.myloadingvariable = false;
          })
          .catch((error) => {
            console.log(error.resp);
          });

        //เช็คเงื่อนไขแผนก quota 2:3
        if (
          !ccLong.startsWith("E3010") &&
          (ccShortName.includes("ผปบ") ||
            ccShortName.includes("ผกส") ||
            ccShortName.includes("ผกป") ||
            !ccShortCode.slice(-1)=="1")
        ) {
          console.log(
            "Check พชง. 3:2 " +
              ccShortName.includes("ผปบ") +
              " " +
              ccShortName.includes("ผกส") +
              " " +
              ccShortName.includes("ผกป") +
              " " +
              ccShortCode +
              !ccShortCode.endsWith("1")
          );
          this.countElectrician = 0;
          let electrician = "";
          this.countAssistElectrician = 0;
          // let assistElectrician = '';
          this.quotaCom = 0;
          // console.log("totalEmployeeResult " + JSON.stringify(this.getEmployeeResult[0].empRole));
          for (let i = 0; i < this.totalEmployeeResult; i++) {
            electrician = JSON.stringify(this.getEmployeeResult[i].empRole);
            if (
              electrician.includes("พชง")
              // || electrician.includes("ชชง")
            ) {
              this.countElectrician++;
              // this.quotaCom++;
              // if(this.countElectrician % 3 == 0){
              //   this.quotaCom--;
              // }
            } else if (electrician.includes("ชชง")) {
              this.countAssistElectrician++;
            }
          }
          console.log("countElectrician " + this.countElectrician);
          let a = this.countElectrician;
          for (let i = 1; i <= this.countElectrician; i++) {
            console.log("Compare: " + i / a);
            if (i / a < 0.67) {
              this.quotaCom++;
            }
            console.log("Com พชง:" + this.quotaCom);
            // if(this.countElectrician % 3 == 0){
            //   this.quotaCom--;
            // }
          }
          //นับ ชชง.

          this.quotaCom +=
            this.totalEmployeeResult -
            this.countElectrician -
            this.countAssistElectrician;
          console.log("quotaCom final " + this.quotaCom);

          //แผนก quota 2:3
          // if (this.totalEmployeeResult > this.totalDeviceResult) {
          //   this.checkQuotaResult =
          //     "คอมพิวเตอร์น้อยกว่าจำนวนคน " +
          //     this.totalEmployeeResult +
          //     " คน - " +
          //     this.totalDeviceResult +
          //     " เครื่อง  จากโควตาโดยประมาณ " + this.quotaCom + " เครื่อง";
          // } else if (
          //   this.totalEmployeeResult == this.totalDeviceResult ||
          //   this.totalEmployeeResult < this.totalDeviceResult
          // ) {
          this.checkQuotaResult =
            "คอมพิวเตอร์เพียงพอกับจำนวนคน " +
            this.totalEmployeeResult +
            " คน - " +
            this.totalDeviceResult +
            " เครื่อง";
          // }
        } else {
          //แผนก quota 1:1
          if (this.totalEmployeeResult > this.totalDeviceResult) {
            this.checkQuotaResult =
              "คอมพิวเตอร์น้อยกว่าจำนวนคน " +
              this.totalEmployeeResult +
              " คน - " +
              this.totalDeviceResult +
              " เครื่อง";
          } else if (
            this.totalEmployeeResult == this.totalDeviceResult ||
            this.totalEmployeeResult < this.totalDeviceResult
          ) {
            this.checkQuotaResult =
              "คอมพิวเตอร์เพียงพอกับจำนวนคน " +
              this.totalEmployeeResult +
              " คน - " +
              this.totalDeviceResult +
              " เครื่อง";
          }
        }

        this.showVRow = true;
      }
    },

    checked7year(newValue) {
      if (this.passwordField == "itsco") {
        if (this.checked7) {
          this.checked7 = false;
        } else if (!this.checked7) {
          this.checked7 = true;
        }
        this.dialog = false;
      } else {
        this.wrongPassword = true;
      }

      console.log(newValue);
    },

    openDialog() {
      this.dialog = true;
      this.wrongPassword = false;
      console.log("openDialog");
    },

    genQuotaReport() {
      if (this.modelCC == null) {
        this.alert = true;
        window.setInterval(() => {
          this.alert = false;
          // console.log("hide alert after 3 seconds");
        }, 3000);
      } else {
        this.itemName = this.modelCC["ccFullName"];
        this.$refs.html2Pdf.generatePdf();
        // console.log("hide alert after 4 seconds");
      }
    },

    toggleAssetComType(assetComType) {
      this.jsonObj = JSON.parse(this.jsonAssetComType);
      this.jsonObj["assetComType"] = [];
      this.jsonObj["assetComType"] = assetComType;
      this.setAssetComType = assetComType;
      console.log("assetComType-" + this.setAssetComType);
    },

    // itemRowBackground: function (item) {
    //   return item.includes("พชง") || item.includes("ชชง")  ? 'style-1' : 'style-2'
    //   //return 'style-1';
    // },

    async idmLogin() {
      var dataXML = `<?xml version="1.0" encoding="utf-8"?>\r\n  
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\r\n   
          <soap:Body>\r\n    
            <Login xmlns="http://idm.pea.co.th/">\r\n     
              <request>\r\n       
                <InputObject>\r\n          
                  <Username>506027</Username>\r\n           
                  <Password>P@ss2489**</Password>\r\n       
                </InputObject>\r\n        
                <WSAuthenKey>e3358fc1-99ad-4b21-8237-7c9c8ba1c5dc</WSAuthenKey>\r\n      
              </request>\r\n    
            </Login>\r\n  
          </soap:Body>\r\n
        </soap:Envelope>`;

      // var config = {
      //   headers: {
      //     "Content-Type": "text/xml",
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Methods": "POST",
      //     "Access-Control-Allow-Headers":
      //       "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      //   },
      //   body: dataXML,
      //   // redirect: "follow",
      // };

      // await axios
      //   .post("idm/webservices/IdmServices.asmx", config)
      //   .then((res) => {
      //     //callback(res.data);
      //     console.log(res.data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      // let data =
      //   '<?xml version="1.0" encoding="utf-8"?>\r\n<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\r\n  <soap:Body>\r\n    <Login xmlns="http://idm.pea.co.th/">\r\n      <request>\r\n        <InputObject>\r\n          <Username>506027</Username>\r\n          <Password>P@ss2489**</Password>\r\n        </InputObject>\r\n        <WSAuthenKey>e3358fc1-99ad-4b21-8237-7c9c8ba1c5dc</WSAuthenKey>\r\n      </request>\r\n    </Login>\r\n  </soap:Body>\r\n</soap:Envelope>';

      let config = {
        headers: {
          "Content-Type": "text/xml",
        },
        // method: "post",
        maxBodyLength: Infinity,
        // url: "/idm/IdmServices.asmx",

        body: dataXML,
      };

      await axios
        .post("idm/IdmServices.asmx", config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });

      // var parseString = require("xml2js").parseString;
      // await axios
      //   .post(
      //     // "https://idm.pea.co.th/webservices/IdmServices.asmx",
      //     "/idm/IdmServices.asmx",
      //     dataXML,
      //     config
      //   )
      //   .then((response) => {
      //     parseString(response.data, function (err, result) {
      //       console.log(result); // returns a json array
      //       this.events = result; // nothing happens
      //     });
      //   });
    },
  },
};
