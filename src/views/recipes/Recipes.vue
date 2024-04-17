<template>
  <div class="content">
    <div>
      <div>
        <v-alert
          :value="alert"
          color="red"
          dark
          border="top"
          icon="mdi-home"
          transition="slide-y-transition"
        >
          กรุณาเลือกตัวกรองที่ต้องการค้นหา
        </v-alert>
      </div>

      <v-form>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-container fluid>
              <v-row>
                <v-text-field v-model="textSearch" label="ค้นหา"></v-text-field>
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
                  @change="toggleDuration"
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

          <v-col cols="12" sm="3" md="2">
            <v-container>
              <v-row>
                <v-btn
                  elevation="3"
                  @click="searchFunction"
                  id="searchButton"
                  color="primary"
                >
                  <v-icon medium class="mr-2 v-white"> mdi-magnify </v-icon>
                  Serach</v-btn
                >
              </v-row>
            </v-container>
          </v-col>
          <!-- <v-col cols="12" sm="2" md="2">
            <v-img :src="('img/menu_pic/menu_pic_1.jpg')" alt="123" />
          </v-col> -->
        </v-row>
      </v-form>
    </div>

    <!-- :footer-props="footerProps"
      @update:items-per-page="getItemPerPage" -->
    <v-data-table
      :headers="headers"
      :items="data1"
      :footer-props="footerProps"
      :items-per-page="itemsPerPage"
      multi-sort
      :loading="myloadingvariable"
      loading-text="Loading... Please wait"
      class="elevation-5 mytable ma-0 pa-0"
      v-model="selected"
      @input="enterSelect()"
    >
      <template v-slot:[`item.pathimg`]="{ item }">
        <!-- Render the image in the cell -->
        <v-img
          :src="getImageUrl(item.pathimg)"
          alt="item.menu_name"
          contain    
          height="100px"
          width="150px">
        ></v-img>
      </template>
      <template #[`item.full_time`]="{ item }"><div v-if="item.duration.id === 4">60 นาทีขึ้นไป</div><div v-else>{{ item.duration.time_start }} - {{ item.duration.time_end}} นาที</div></template>
    </v-data-table>
  </div>
</template>

<script src="./recipes.js"></script>
<style src="./recipes.css"></style>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,100,0,0"
/>
