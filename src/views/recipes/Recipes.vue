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
          กรุณาเลือกขอบเขตการไฟฟ้าที่ต้องการค้นหา
        </v-alert>
      </div>
      <!-- <div>
        <v-alert
          :value="alert2"
          color="red"
          dark
          border="top"
          icon="mdi-home"
          transition="slide-y-transition"
        >
          กรุณาเลือกข้อมูลก่อนสร้าง PDF
        </v-alert>
      </div> -->
      <v-form>
        <v-row>
          <!-- <v-col cols="12" sm="4" md="2">
            <v-container fluid class="mt-2 mr-0 pr-0">
                <treeselect
                  :multiple="false"
                  :options="optionBranches"
                  placeholder="โปรดเลือกการไฟฟ้า"
                  :class="treeselectClass"
                  v-model="value"
                  
                  v-on:select="treeselectChange"
                >
                  <label
                    slot="option-label"
                    slot-scope="{
                      node,
                      labelClassName,
                    }"
                    :class="labelClassName"
                  >
                  <v-icon>{{ node.raw.icon }}</v-icon>
                    | {{ node.label }}
                  </label>
                </treeselect>
                <treeselect-value :value="value" />
            </v-container>
          </v-col> -->

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
                <!-- item-value="fruits.name" -->
                <v-select
                  v-model="selectedDuration"
                  :items="duration"
                  item-value="value"
                  item-text="name"
                  label="เวลาที่ใช้ทำอาหาร"
                  @change="toggleAssetType"
                >
                </v-select>
              </v-row>
            </v-container>
          </v-col>

          <v-col cols="12" sm="4" md="2">
            <v-container fluid>
              <v-row>
                <!-- item-value="fruits.name" -->
                <v-select
                  v-model="selectedLevel"
                  :items="level"
                  item-value="value"
                  item-text="name"
                  label="ความยากง่าย"
                  @change="toggleAssetType"
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
                  <!-- <i class="nc-icon nc-zoom-split mr-2"></i> -->
                  Serach</v-btn
                >
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-form>
    </div>
    <div>
      <template>
        <div>
          <Vue-Html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="true"
            :preview-modal="true"
            :paginate-elements-by-height="280"
            filename="myPDF"
            :pdf-quality="2"
            :manual-pagination="false"
            ref="html2Pdf"
            :html-to-pdf-options="{
              margin: [2, 1, 1, 1],
              jsPDF: {
                format: ('l', 'mm', [100, 75]),
                orientation: 'landscape',
              },
            }"
          >
            <section slot="pdf-content">
              <!-- <b-table class="paddingBetweenRows" > -->
              <b-table width="377px">
                <tr
                  id="pdf_tr"
                  style="text-align: center"
                  v-for="item in Math.ceil(qrcode_value2.length)"
                  v-bind:key="item.devPeaNo"
                  heigh="280px"
                  class="html2pdf__page-break"
                >
                  <section class="pdf-item">
                    <!-- <td rowspan="2"> -->
                    <table class="no-spacing">
                      <tr>
                        <td rowspan="5" width="40%">
                          <qrcode-vue
                            :value="qrcode_value2[item - 1]"
                            :size="qrcode_size"
                            level="H"
                          ></qrcode-vue>
                        </td>
                        <td width="20%" class="text-right">ทรัพย์สิน</td>
                        <td width="40%">
                          {{ JSON.parse(detail_value[item - 1]).devPeaNo }}
                        </td>
                      </tr>
                      <tr>
                        <td width="20%" class="text-right">การได้มา</td>
                        <td width="40%">
                          {{
                            JSON.parse(detail_value[item - 1]).devReceivedPrice
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td width="20%" class="text-right">ตามบัญชี</td>
                        <td width="40%">
                          {{ JSON.parse(detail_value[item - 1]).devLeftPrice }}
                        </td>
                      </tr>
                      <tr>
                        <td width="20%" class="text-right">ศูนย์ต้นทุน</td>
                        <td width="40%">
                          {{ JSON.parse(detail_value[item - 1]).ccLongCode }}
                        </td>
                      </tr>
                      <tr>
                        <td width="20%" class="text-right">สังกัด</td>
                        <td width="40%">
                          {{ JSON.parse(detail_value[item - 1]).ccShortName }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="text-right">โอนเข้าเป็นทุน</td>
                        <td width="40%">
                          {{
                            JSON.parse(detail_value[item - 1]).devReceivedDate
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="text-right">
                          {{ JSON.parse(detail_value[item - 1]).empName }}
                        </td>
                        <td width="40%">
                          {{ JSON.parse(detail_value[item - 1]).empId }}
                        </td>
                      </tr>
                      <tr>
                        <td>หมายเลขผลิตภัณฑ์</td>
                        <td width="60%" colspan="2">
                          <!-- {{ JSON.parse(detail_value[item - 1]).devSerialNo }} -->
                          1234567890ABCDEFGH
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3" class="wrap">
                          {{
                            JSON.parse(detail_value[item - 1]).devDescription
                          }}
                        </td>
                      </tr>

                      <!-- <tr>
                          <div class="html2pdf__page-break"></div>
                      </tr> -->
                    </table>
                  </section>
                </tr>
              </b-table>
            </section>
          </Vue-Html2pdf>
        </div>
      </template>
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
      show-select
      @input="enterSelect()"
    >
      <!-- :server-items-length="totalItems" -->
      <!-- :footer-props="{ 'items-per-page-options': [30, 50, 100] }" -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <qrcode-vue
                      :value="qrcode_value"
                      :size="qrcode_size"
                      level="H"
                    ></qrcode-vue>
                    <H1> {{ formDevPeaNo }} </H1>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >เชื่อมต่อไปยังหน้าแจ้งซ่อม</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon medium class="mr-2" @click="editItem(item)">
          mdi-qrcode-scan
        </v-icon>
        <v-icon medium @click="deleteItem(item)">
          mdi-folder-wrench-outline
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script src="./recipes.js"></script>
<style src="./recipes.css"></style>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,100,0,0"
/>./recipes.js./recipes.js
