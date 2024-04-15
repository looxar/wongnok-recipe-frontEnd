import Vue from "vue";
import axios from "axios";
// import DataService from "../../services/dataServices.js"; // NEW
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);

import QrcodeVue from "qrcode.vue";
Vue.component("qrcode-vue", QrcodeVue);

import { mdiQrcodeScan } from "@mdi/js";
Vue.component("mdiQrcode-Scan", mdiQrcodeScan);

import { mdiMicrosoftExcel } from "@mdi/js";
Vue.component("mdiMicrosoftExcel", mdiMicrosoftExcel);

import { mdiFileFindOutline } from "@mdi/js";
Vue.component("mdiFileFindOutline", mdiFileFindOutline);

import { mdiMagnify } from "@mdi/js";
Vue.component("mdiMagnify", mdiMagnify);

import { mdiQrcode } from "@mdi/js";
Vue.component("mdiQrcode", mdiQrcode);

// import the component
import Treeselect from "@riophae/vue-treeselect";
Vue.component("treeselect", Treeselect);
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "EventsList",
  data() {
    return {
      event: {},
      events: [],
      headers: [
        {
          text: "เมนู",
          align: "start",
          value: "menu_name",
          class: "primary--text font-size: 50%",
          // width: "10%",
        },
        {
          text: "ภาพประกอบ",
          value: "pathimg",
          class: "primary--text",
          // width: "6%"
        },
        {
          text: "วัตถุดิบ",
          value: "raw_material",
          class: "primary--text",
          //  width: "3%"
        },
        {
          text: " ขั้นตอน",
          value: "step",
          class: "primary--text",
          // width: "7%"
        },
        {
          text: "ระยะเวลา",
          value: "full_time",
          class: "primary--text",
          //  width: "3%"
        },
        {
          text: "ความยากง่าย",
          value: "difficult.level_name",
          class: "primary--text",
          // width: "3%"
        },
        {
          text: "เจ้าของเมนู",
          value: "user.user_name",
          class: "primary--text",
          // width: "20%",
        },
      ],

      baseUrl: "../../assets/menu_pic/",

      select: [],
      selectedFruits: [],
      selectedTypeSearch: [],

      appendType: [],
      appendText: [],
      jsonObj: [],

      jsonStrType: '{"type":["*"]}',
      jsonTextSearch: '{"text":["*"]}',
      appendSearch: [],
      textSearch: "",

      getAllResult: [],
      data1: [],
      itemsPerPage: 0,
      totalItems: 0,
      footerProps: {
        "items-per-page-options": [30, 50, 100, -1],
        page: 0,
        showFirstLastPage: true,
      },
      alert: false,
      alert2: false,
      myloadingvariable: false,

      duration: [
        { id: "1", name: "5-10 นาที", value: "10" },
        {
          id: "2",
          name: "11-30 นาที",
          value: "30",
        },
        { id: "3", name: "30-60 นาที", value: "60" },
        {
          id: "4",
          name: "60 นาทีขึ้นไป",
          value: "61",
        },
        {
          id: "5",
          name: "ทุกช่วงเวลา",
          value: "alltime",
        },
      ],
      selectedDuration: {
        id: "5",
        name: "ทุกช่วงเวลา",
        value: "alltime",
      },

      level: [
        { id: "1", name: "Easy", value: "1" },
        {
          id: "2",
          name: "Medium",
          value: "2",
        },
        { id: "3", name: "Hard", value: "3" },
        {
          id: "4",
          name: "ทุกระดับ",
          value: "alllevel",
        },
      ],
      selectedLevel: {
        id: "4",
        name: "ทุกระดับ",
        value: "alllevel",
      },
      setAssetType: [],
      setDuration: [],
      setLevel: [],
      jsonStrAssetType: '{"assetType":["53"]}',
      jsonStrDuration: '{"duration":["ทุกช่วงเวลา"]}',
      jsonStrLevel: '{"level":["ทุกระดับ"]}',
      dataExcel: [],

      qrcode_value: null,
      // JSON.parse([

      // ]),
      qrcode_size: 128,
      dialog: false,
      dialogDelete: false,

      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      groupSelected: [],
      qrcode_value2: [],
      result: [],
      selected: [],

      value: ["reg"],
      fieldValid: false,
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.myloadingvariable = true;
    // this.setAssetType = JSON.stringify({assetType:53});
    axios
      .get("http://localhost:8080/recipe/all/")
      .then((resp) => {
        this.getAllResult = resp;
        console.log(resp);
        this.data1 = resp.data;

        this.data1.forEach((item) => {
          item.imgSrc = this.baseUrl + item.img;
        });
        // this.itemsPerPage = resp.data.itemsPerPage;
        // this.totalItems = resp.data.totalItems;

        // this.data1 = resp.data.data1;
        this.itemsPerPage = resp.data.itemsPerPage;
        this.totalItems = resp.data.totalItems;
        console.log("at mounted ", this.getAllResult.data.totalItems);
        this.myloadingvariable = false;
      })

      .catch((error) => {
        console.log(error.resp);
      });
    // if (alert) {
    //   this.hide_alert();
    // }
  },

  methods: {
    getImageUrl(img) {
      console.log("img/menu_pic/" + img);
      return "img/menu_pic/" + img;
    },

    getItemPerPage(val) {
      this.itemsPerPage = val;
      console.log("setItemPerPage ", this.itemsPerPage);
      this.searchFunction();
    },

    toggleAssetType(assetType) {
      this.jsonObj = JSON.parse(this.jsonStrAssetType);
      this.jsonObj["assetType"] = [];
      this.jsonObj["assetType"] = assetType;
      this.setAssetType = JSON.stringify(this.jsonObj);
      console.log("assetType-" + JSON.stringify(this.jsonObj));
    },

    toggleLevel(level) {
      this.jsonObj = JSON.parse(this.jsonStrLevel);
      this.jsonObj["level"] = [];
      this.jsonObj["level"] = level;
      this.setLevel = JSON.stringify(this.jsonObj);
      console.log("level-" + JSON.stringify(this.jsonObj));
    },

    toggleDuration(duration) {
      this.jsonObj = JSON.parse(this.jsonStrDuration);
      this.jsonObj["duration"] = [];
      this.jsonObj["duration"] = duration;
      this.setDuration = JSON.stringify(this.jsonObj);
      console.log("duration-" + JSON.stringify(this.jsonObj));
    },

    searchFunction() {
      this.qrcode_value2 = [];
      this.result = [];
      this.groupSelected = [];
      this.selected = [];
      if (
        this.textSearch == "" &&
        this.setDuration.length == 0 &&
        this.setLevel.length == 0
      ) {
        this.alert = true;
        window.setInterval(() => {
          this.alert = false;
          // console.log("hide alert after 3 seconds");
        }, 3000);
      } else {
        if (this.setDuration.length == 0) {
          this.setDuration = JSON.stringify({ duration: "ทุกช่วงเวลา" });
        }

        this.myloadingvariable = true;

        let setDuration2 = JSON.parse(this.setDuration);
        // console.log("setAssetType ",this.setAssetType);
        let params = [];
        console.log("itemsPerPage", this.itemsPerPage);
        //ถ้าไม่ใส่คำค้น
        if (this.textSearch.length == 0) {
          if (
            this.setLevel == "ทุกระดับ" &&
            this.setDuration !== "ทุกช่วงเวลา"
          ) {
            params = {
              setDuration: setDuration2.duration,
            };
            axios
            .post("http://localhost:8080/recipe/byduration", {
              params,
            })
            .then((resp) => {
              this.getAllResult = resp.data;
              console.log(
                "searchNoWordUnpage-" + params["region"],
                JSON.stringify(this.getAllResult)
              );

              this.data1 = resp.data.dataExcel;
              // this.itemsPerPage = resp.data.itemsPerPage;
              this.totalItems = resp.data.totalItems;
              this.myloadingvariable = false;
            })
            .catch((error) => {
              console.log(error.resp);
            });
          } else if (
            this.setDuration == "ทุกช่วงเวลา" &&
            this.setLevel !== "ทุกระดับ"
          ) {
            params = {
              SetLevel: this.setLevel.level,
            };
          } else {
            params = {
              setDuration: setDuration2.duration,
              SetLevel: this.setLevel.level,
            };
          }
          
          console.log("searchNoWordUnpage-", params);
          axios
            .get("http://localhost:8080/api/dev/searchNoWordUnpage", {
              params,
            })
            .then((resp) => {
              this.getAllResult = resp.data;
              console.log(
                "searchNoWordUnpage-" + params["region"],
                JSON.stringify(this.getAllResult)
              );

              this.data1 = resp.data.dataExcel;
              // this.itemsPerPage = resp.data.itemsPerPage;
              this.totalItems = resp.data.totalItems;
              this.myloadingvariable = false;
            })
            .catch((error) => {
              console.log(error.resp);
            });
          // }
        }
        //ถ้าใส่คำค้น
        else {
          params = {
            textSearch: this.textSearch,
            
          };
          console.log("searchFunction ", params);

          axios
            .get("http://localhost:8080/api/dev/searchWithWord", { params })
            .then((resp) => {
              this.getAllResult = resp.data;
              console.log("searchWithWord", JSON.stringify(this.getAllResult));

              this.data1 = resp.data.data1;
              this.itemsPerPage = resp.data.itemsPerPage;
              this.totalItems = resp.data.totalItems;
              this.myloadingvariable = false;
            })
            .catch((error) => {
              console.log(error.resp);
            });
        }
      }
    },

    enterSelect() {
      let e = this.selected.map((e) => e);
      // console.log(e.length); // logs all the selected items.
      this.qrcode_value2 = [];
      this.detail_value = [];
      this.groupSelected = e;
      console.log(this.groupSelected.length);
      // this.qrcode_value2 = JSON.stringify(this.groupSelected);
      // user_id: this.editedItem["tbEmployee"]["empId"],
      // user_name: this.editedItem["tbEmployee"]["empName"],
      let i = 0;
      this.result = this.groupSelected.map(({ devPeaNo }) => ({ devPeaNo }));
      this.result2 = this.groupSelected.map(({ devPeaNo }) => ({ devPeaNo }));
      // result.forEach((element) => {
      //   element.empId = this.groupSelected.tbEmployee.empId;
      // });
      for (i = 0; i < this.groupSelected.length; i++) {
        if (this.groupSelected[i].tbEmployee !== null) {
          this.result[i].empId = this.groupSelected[i].tbEmployee.empId;
          this.result[i].empName = this.groupSelected[i].tbEmployee.empName;
          // this.result2[i].empId = this.groupSelected[i].tbEmployee.empId;
          // this.result2[i].empName = this.groupSelected[i].tbEmployee.empName;
        } else {
          this.result[i].empId = "ไม่ระบุ";
          this.result[i].empName = "ไม่ระบุ";
          // this.result2[i].empId = "ไม่ระบุ";
          // this.result2[i].empName = "ไม่ระบุ";
        }
        // result[i].empId = this.groupSelected[i].tbEmployee.empId;
        // result[i].empId = this.groupSelected[i].tbEmployee.empId;
        this.result[i].devSerialNo = this.groupSelected[i].devSerialNo;
        // this.result2[i].devSerialNo =
        // this.groupSelected[i].devSerialNo;

        this.result[i].devReceivedDate = this.groupSelected[i].devReceivedDate;

        this.result[i].devReceivedPrice =
          this.groupSelected[i].devReceivedPrice;

        this.result[i].devLeftPrice = this.groupSelected[i].devLeftPrice;

        this.result[i].ccLongCode =
          this.groupSelected[i].tbCostCenterTest.ccLongCode;

        this.result[i].ccShortName =
          this.groupSelected[i].tbCostCenterTest.ccShortName;
        this.result2[i].ccShortName =
          this.groupSelected[i].tbCostCenterTest.ccShortName;

        this.result[i].devDescription = this.groupSelected[i].devDescription;
      }

      for (i = 0; i < this.result.length; i++) {
        console.log(JSON.stringify(this.result[i]));
        // this.qrcode_value2[i].push(JSON.stringify(this.groupSelected[i].devPeaNo)); ?region=ZC05020000
        this.detail_value.push(JSON.stringify(this.result[i]));
      }
      for (i = 0; i < this.result.length; i++) {
        console.log(JSON.stringify(this.result2[i]));
        // this.qrcode_value2[i].push(JSON.stringify(this.groupSelected[i].devPeaNo)); ?region=ZC05020000
        this.qrcode_value2.push(JSON.stringify(this.result2[i].devPeaNo));
      }
      if (this.selected.length == this.itemsPerPage) {
        alert("selected all");
      }
    },

    // genQR_Code() {},

    generateReport() {
      // var opt = {
      //   margin:       [30, 0, 30, 0], //top, left, buttom, right
      //   // filename:    name + '.pdf',
      //   // image:        { type: 'jpeg', quality: 0.98 },
      //   // html2canvas:  { dpi: 192, scale: 2, letterRendering: true},
      //   // jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait'},
      //   // pageBreak: { mode: 'css', after:'.break-page'}
      //   };
      if (this.groupSelected.length == 0) {
        this.alert2 = true;
        window.setInterval(() => {
          this.alert2 = false;
          // console.log("hide alert after 3 seconds");
        }, 3000);
      } else {
        this.$refs.html2Pdf.generatePdf();
      }
    },
  },
  computed: {
    likesAllFruit() {
      return this.selectedFruits.length === this.fruits.length;
    },
    likesSomeFruit() {
      return this.selectedFruits.length > 0 && !this.likesAllFruit;
    },
    icon() {
      if (this.likesAllFruit) return "mdi-close-box";
      if (this.likesSomeFruit) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    likesAllTypeSearch() {
      return this.selectedTypeSearch.length === this.typeSearch.length;
    },
    likesSomeTypeSearch() {
      return this.selectedTypeSearch.length > 0 && !this.likesAllTypeSearch;
    },
    icon2() {
      if (this.likesAllTypeSearch) return "mdi-close-box";
      if (this.likesSomeTypeSearch) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "QR Code";
    },
    formDevPeaNo() {
      return this.editedIndex === -1 ? "New Item" : this.editedItem["devPeaNo"];
    },
    treeselectClass() {
      return {
        "treeselect-invalid": !this.fieldValid,
      };
    },
  },
};
