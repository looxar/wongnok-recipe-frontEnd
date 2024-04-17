import Vue from "vue";
import axios from "axios";
// import DataService from "../../services/dataServices.js"; // NEW
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);

import { mdiMicrosoftExcel } from "@mdi/js";
Vue.component("mdiMicrosoftExcel", mdiMicrosoftExcel);

import { mdiFileFindOutline } from "@mdi/js";
Vue.component("mdiFileFindOutline", mdiFileFindOutline);

import { mdiMagnify } from "@mdi/js";
Vue.component("mdiMagnify", mdiMagnify);

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
      setDuration: 5,
      setLevel: 4,
      // jsonStrAssetType: '{"assetType":["53"]}',
      // jsonStrDuration: '{"duration":["ทุกช่วงเวลา"]}',
      // jsonStrLevel: '{"level":["ทุกระดับ"]}',
      dataExcel: [],

      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      groupSelected: [],
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

        this.itemsPerPage = resp.data.length;
        console.log("at mounted ", this.data1);
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
    getImageUrl(pathimg) {
      console.log("/recipes-img/" + pathimg);
      // return require('/recipes-img/' + pathimg);
      return `${pathimg}`;
    },

    getItemPerPage(val) {
      this.itemsPerPage = val;
      console.log("setItemPerPage ", this.itemsPerPage);
      this.searchFunction();
    },

    toggleLevel(level) {
      this.setLevel = level;
      console.log("level-" + this.setLevel);
    },

    toggleDuration(duration) {
      this.setDuration = duration;
      console.log("duration-" + this.setDuration);
    },

    searchFunction() {
      this.result = [];
      console.log(
        "this.textSearch: " +
          this.textSearch +
          " this.setDuration: " +
          this.setDuration +
          " this.setLevel: " +
          this.setLevel
      );
      if (
        this.textSearch == "" &&
        this.setDuration == 0 &&
        this.setLevel == 0
      ) {
        this.alert = true;
        window.setInterval(() => {
          this.alert = false;
          // console.log("hide alert after 3 seconds");
        }, 3000);
      } else {
        this.myloadingvariable = true;

        // console.log("setAssetType ",this.setAssetType);
        let params = [];
        console.log("itemsPerPage", this.itemsPerPage);
        //ถ้าไม่ใส่คำค้น
        if (this.textSearch.length == 0) {
          if (this.setLevel == 4 && this.setDuration !== 5) {
            console.log("byduration-", this.setDuration);
            params = {
              setDuration: this.setDuration,
            };
            axios
              .post("http://localhost:8080/recipe/byduration", {
                params,
              })
              .then((resp) => {
                this.getAllResult = resp.data;

                this.data1 = resp.data;
                console.log(this.data1);
                this.myloadingvariable = false;
              })
              .catch((error) => {
                console.log(error.resp);
              });
          } else if (this.setDuration == 5 && this.setLevel !== 4) {
            console.log("bylevel-", this.setLevel);
            params = {
              setLevel: this.setLevel,
            };
            axios
              .post("http://localhost:8080/recipe/bylevel", {
                params,
              })
              .then((resp) => {
                this.getAllResult = resp.data;
                this.data1 = resp.data;
                console.log(this.data1);
                this.myloadingvariable = false;
              })
              .catch((error) => {
                console.log(error.resp);
              });
          } else {
            params = {
              setDuration: this.setDuration,
              setLevel: this.setLevel,
            };
            console.log(
              "bybothcon-level-" +
                this.setLevel +
                " duration-" +
                this.setDuration
            );
            axios
              .post("http://localhost:8080/recipe/bybothcon", {
                params,
              })
              .then((resp) => {
                this.getAllResult = resp.data;
                console.log(
                  "setDuration-" + params["setDuration"],
                  JSON.stringify(this.getAllResult)
                );
                this.data1 = resp.data;
                this.myloadingvariable = false;
              })
              .catch((error) => {
                console.log(error.resp);
              });
          }
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
              this.itemsPerPage = resp.data.length;
              this.myloadingvariable = false;
            })
            .catch((error) => {
              console.log(error.resp);
            });
        }
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
