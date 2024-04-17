<template>
  <div class="content">
    <v-form>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-container fluid>
            <v-row>
              <v-text-field
                v-model="menu_name"
                label="ชื่อเมนู"
              ></v-text-field>
            </v-row>
          </v-container>
        </v-col>

        <v-col cols="12" sm="4" md="2">
          <v-container fluid>
            <v-row>
              <v-select
                v-model="selectedDuration"
                :items="duration"
                item-value="id"
                item-text="name"
                label="เวลาที่ใช้ทำอาหาร"
                @change="toggleDuration($event)"
              >
              </v-select>
            </v-row>
          </v-container>
        </v-col>

        <v-col cols="12" sm="4" md="2">
          <v-container fluid>
            <v-row>
              <v-select
                v-model="selectedLevel"
                :items="level"
                item-value="id"
                item-text="name"
                label="ความยากง่าย"
                @change="toggleLevel"
              >
              </v-select>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="2">
          <v-container fluid>
            <v-row
              >
              <input type="file" accept="image/jpeg,image/png,image/gif" @change="handleFileUpload">
              </v-row
          ></v-container>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-container fluid>
            <v-row>
              <v-img v-if="imagePreview" :src="imagePreview" alt="Preview Image"/>
            </v-row></v-container
          ></v-col
        >
      </v-row>
      <v-row>
        <v-col cols="12" sm="1" md="1">
          <v-container fill-height fluid>
            <v-row align="center" justify="center"
              ><div>
                <v-text-field
                  readonly
                  class="centered-input"
                  color="primary"
                  v-model="raw_mat_title"
                ></v-text-field></div></v-row
          ></v-container>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-container fluid>
            <v-row>
              <v-textarea
                placeholder="รายการที่ 1 ..."
                v-model="raw_material"
              ></v-textarea> </v-row></v-container
        ></v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="1" md="1">
          <v-container fill-height fluid>
            <v-row align="center" justify="center"
              ><div>
                <v-text-field
                  readonly
                  class="centered-input"
                  v-model="step_title"
                ></v-text-field></div></v-row
          ></v-container>
        </v-col>
        <v-col cols="12" sm="4" md="4">
          <v-container fluid>
            <v-row>
              <v-textarea
                placeholder="ขั้นตอนที่ 1 ..."
                v-model="step"
              ></v-textarea> </v-row></v-container
        ></v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          
        </v-col>
        <v-col cols="12" sm="4" md="2">
          <v-container fluid>
            <v-row>
              <v-btn
                elevation="3"
                @click="uploadFile"
                id="searchButton"
                color="primary"
              >
                <v-icon medium class="mr-2 v-white"> mdi-content-save-outline </v-icon>
                บันทึกเมนู</v-btn
              >
            </v-row>
          </v-container>
        </v-col></v-row
      >
    </v-form>
  </div>
</template>

<script src="./myRecipes.js"></script>
<style src="./myRecipes.css"></style>
