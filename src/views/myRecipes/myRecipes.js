import Vue from "vue";
import axios from "axios";

import { mdiUploadOutline } from "@mdi/js";
Vue.component("mdiUploadOutline", mdiUploadOutline);

import { mdiContentSaveOutline } from "@mdi/js";
Vue.component("mdiContentSaveOutline", mdiContentSaveOutline);

export default {
  data() {
    return {
      raw_mat_title: "วัตถุดิบ",
      step_title: "ขั้นตอน",
      imagePreview: null,

      file: null,
      menu_name: "ข้าวต้ม",
      pathimg: "",
      raw_material: "",
      step: "",
      difficult: "",
      user: 1,

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
      ],
      selectedDuration: {
        id: "1",
        name: "5-10 นาที",
        value: "10",
      },
      level: [
        { id: "1", name: "Easy", value: "1" },
        {
          id: "2",
          name: "Medium",
          value: "2",
        },
        { id: "3", name: "Hard", value: "3" },
      ],
      selectedLevel: {
        id: "1",
        name: "Easy",
        value: "1",
      },
    };
  },
  methods: {
    uploadFile() {
      if (!this.file) {
        console.error("No file selected");
        return;
      }
      let params = new FormData();
      params.append("image", this.file);
      params.append("menu_name", this.menu_name);
      params.append("pathimg", this.pathimg);
      params.append("raw_material", this.raw_material);
      params.append("step", this.step);
      params.append("duration", this.selectedDuration.id);
      params.append("difficult", this.selectedLevel.id);
      params.append("user", this.user);

      // for (const entry of params.entries()) {
      //   console.log(entry);
      // }
      // let params = [];
      // params = {
      //   menu_name: "กะเพราหมูสับบบ",
      //   pathimg: "pathToPic",
      //   raw_material: "ใบกะเพรา+หมูสับ+กระเทียม",
      //   step: "วิธีทำ123",
      //   duration: 1,
      //   difficult: 1,
      //   user: 2,
      // };
      // params.push("image", this.file);
      // params = {
      //   setDuration: this.setDuration,
      // };
      axios
        .post("http://localhost:8080/recipecreate", params, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Recipe created successfully " + response.data);
          // Handle response if needed
        })
        .catch((error) => {
          console.error("Error creating recipe:", error);
        });
    },

    handleFileUpload(event) {
      this.file = event.target.files[0];

      // Display preview of the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.file);
    },

    toggleLevel(selectedItem) {
      if (selectedItem) {
        // Now you can use the selectedId as needed
        // console.log('Selected ID:', selectedItem);

        // Update selectedDuration with the selected item
        this.selectedLevel = this.level[selectedItem - 1];
        console.log("this.selectedLevel:", this.selectedLevel);
      }
    },

    toggleDuration(selectedItem) {
      // Check if selectedItem is defined
      if (selectedItem) {
        // Now you can use the selectedId as needed
        // console.log('Selected ID:', selectedItem);

        // Update selectedDuration with the selected item
        this.selectedDuration = this.duration[selectedItem - 1];
        console.log("this.selectedDuration:", this.selectedDuration);
      }
    },
  },
};
