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
          กรุณาเลือกหน่วยงานที่ต้องการตรวจสอบ
        </v-alert>
      </div>
      <v-card-text>
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12" sm="2" md="2">
              <v-autocomplete
                color="primary"
                v-model="modelEmp"
                :items="itemsEmp"
                :item-text="getItemEmp"
                label="รหัสพนักงาน"
                item-value="empId"
                @change="(event) => updateCCFromEmp(modelEmp)"
                return-object
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <v-autocomplete
                color="primary"
                v-model="modelCC"
                :items="itemsCC"
                :item-text="getItemCC"
                label="การไฟฟ้า"
                item-value="ccLongCode"
                @change="(event) => updateCC(modelCC)"
                return-object
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="2" md="2">
              <v-select
                v-model="selectedAssetComType"
                :items="assetComType"
                item-value="value"
                item-text="name"
                label="ประเภทย่อยทรัพย์สินคอมพิวเตอร์"
                @change="toggleAssetComType"
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="2" md="2" align-self="center">
              <!-- <div > -->
              <!-- <input type="checkbox" id="checkbox" v-model="checked" />
                <label for="only7year" class="font-checkbox"
                  >เฉพาะทรัพย์สินอายุ 7 ปี</label
                > -->
              <!-- <v-checkbox
                id="checkbox"
                v-model="checked7"
                @change="checked7year"
                label="เฉพาะทรัพย์สินอายุ 7 ปี"
              ></v-checkbox> -->

              <template>
                <div class="text-center">
                  <!-- <v-btn color="primary" @click="dialog = true">
                    Open Dialog"
                  </v-btn> 
                  @change="checked7year
                  v-model="checked7"
                  @click="dialog = true"-->
                  <v-checkbox
                    id="checkbox"
                    readonly
                    v-model="checked7"
                    @click="openDialog"
                    label="เฉพาะทรัพย์สินอายุ 7 ปี"
                  ></v-checkbox>

                  <v-dialog v-model="dialog" width="auto">
                    <v-card>
                      <div class="container">
                        <v-card-text xs12 mb-4>
                          <h4>กรุณากรอกรหัสผ่าน เพื่อใช้งาน Function นี้</h4>
                        </v-card-text>
                      </div>
                      <div class="container">
                        <v-text-field
                          id="passworTextField"
                          class="v-text-field-password centered-input"
                          xs12
                          mb-4
                          v-model="passwordField"
                          clearable
                          type="password"
                        >
                        </v-text-field>
                      </div>
                      <!-- <v-card-actions>
                        <v-btn color="primary" block @click="dialog = false"
                          >Close Dialog</v-btn
                        >
                      </v-card-actions> id="wrongPassword"-->
                      <div v-if="wrongPassword" class="text-center">
                        <v-card-text class="text-warning" xs12 mb-4>
                          <h4>รหัสผ่านไม่ถูกต้อง!</h4>
                        </v-card-text>
                      </div>

                      <v-card-actions>
                        <v-btn color="primary" block @click="checked7year"
                          >Check</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </template>
            </v-col>
            <v-col cols="12" sm="2" md="1" align-self="center">
              <v-btn
                elevation="3"
                @click="checkQuota"
                id="searchButton"
                color="primary"
                >ตรวจสอบ
              </v-btn>
            </v-col>
            <v-col cols="12" sm="2" md="1" align-self="center">
              <v-btn
                elevation="3"
                @click="genQuotaReport"
                id="genQuotaReportt"
                color="primary"
                >สร้างรายงาน</v-btn
              >
            </v-col>

            <v-col cols="12" sm="2" md="1" align-self="center">
              <v-btn
                elevation="3"
                @click="idmLogin"
                id="idmLogin"
                color="primary"
                >Login</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <div>
        <template>
          <div>
            <VueHtml2pdf
              :show-layout="false"
              :float-layout="true"
              :enable-download="true"
              :preview-modal="true"
              :paginate-elements-by-height="1400"
              filename=modelCC
              :pdf-quality="2"
              :manual-pagination="false"
              pdf-format="a4"
              pdf-orientation="portrait"
              pdf-content-width="800px"
              ref="html2Pdf"
              :html-to-pdf-options="{
                margin: [5, 10, 5, 10],
              }"
            >
              <section slot="pdf-content">
                <!-- <table cellspacing="0" class="no-spacing"> -->
                <v-card-text>
                  <v-form>
                    <template v-if="showVRow">
                      <v-row>
                        <h5>{{ itemName }} - {{ checkQuotaResult }}</h5>
                      </v-row>
                      <v-row >
                        <H5
                          >พนักงานจำนวน {{ totalEmployeeResult }} คน -
                          ทรัพย์สินคอมพิวเตอร์จำนวน
                          {{ totalDeviceResult }} เครื่อง</H5
                        >
                      </v-row>
                    </template>
                  </v-form>

                  <v-row>
                    <v-col cols="12" sm="11" md="11">
                      <H5>พนักงานในสังกัด</H5
                      ><v-data-table
                        class="elevation-1"
                        :headers="employeeheaders"
                        :items="getEmployeeResult"
                        :hide-default-footer="true"
                        :items-per-page="-1"
                      >
                      </v-data-table>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="11" md="11"
                      ><H5>รายการทรัพย์สิน</H5>
                      <v-data-table
                        class="elevation-1 mytableReport"
                        :headers="deviceheaders"
                        :items="getDeviceResult"
                        sort-by="devReceivedDate"
                        :sort-desc="true"
                        :hide-default-footer="true"
                        :items-per-page="-1"
                      >
                      </v-data-table
                    ></v-col>
                  </v-row>
                </v-card-text>
              </section>
            </VueHtml2pdf>
          </div>
        </template>
      </div>

      <v-card-text>
        <v-form>
          <template v-if="showVRow">
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <H3>พนักงานจำนวน {{ totalEmployeeResult }} คน</H3>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <H3
                  >ทรัพย์สินคอมพิวเตอร์จำนวน {{ totalDeviceResult }} เครื่อง</H3
                >
              </v-col>
            </v-row><v-row>
              <v-col cols="12" sm="12" md="12">
                <H3 >{{ checkQuotaResult }}</H3>
              </v-col>

              <v-col cols="12" sm="11" md="11">
                <H5
                  ><a @click="dialog = true"
                    >แบบฟอร์มขอจัดสรรเครื่องคอมพิวเตอร์</a
                  ></H5
                >
              </v-col>
              <v-col cols="12" sm="11" md="11">
                <H5
                  ><a @click="dialog2 = true"
                    >แบบฟอร์มขอจัดสรรเครื่องคอมพิวเตอร์2</a
                  ></H5
                >
              </v-col>
            </v-row>
          </template>
        </v-form>
      </v-card-text>

      
        <div class="text-center">
          <v-dialog id="1" v-model="dialog" width="700">
            <v-card>
              <v-card-text>
                <img src="@/assets/kos123/CCI_000001.jpg" width="650" />
                <img src="@/assets/kos123/CCI_000002.jpg" width="650" />
                <img src="@/assets/kos123/CCI_000003.jpg" width="650" />
                <img src="@/assets/kos123/CCI_000004.jpg" width="650" />
                <img src="@/assets/kos123/CCI_000005.jpg" width="650" />
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <div class="text-center2">
          <v-dialog id="2" v-model="dialog2" width="700">
            <v-card>
              <v-card-text>
                <img src="@/assets/kos123/CCI_000005.jpg" width="650" />
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog2 = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="12" md="4" 
            ><H4 class="primary--text">พนักงานในสังกัด</H4
            ><v-data-table
              id="empTable"
              class="elevation-1 mytable"
              :headers="employeeheaders"
              :items="getEmployeeResult"
            >
            <!-- :item-class="itemRowBackground" -->
            </v-data-table>
          </v-col>
          <v-col cols="12" sm="12" md="8"
            ><H4 class="primary--text">รายการทรัพย์สิน</H4>
            <v-data-table
              class="elevation-1 mytable"
              :headers="deviceheaders"
              :items="getDeviceResult"
              sort-by="devReceivedDate"
              :sort-desc="true"
            >
            </v-data-table
          ></v-col>
        </v-row>
      </v-card-text>
    </div>
  </div>
</template>

<script src="./checkQuota.js"></script>
<style src="./checkQuota.css"></style>
