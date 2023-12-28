<template>
  <v-col cols="12">
    <v-card>
      <!-- Header Row -->
      <v-row align="center" justify="space-between">
        <v-col cols="8" class="justify-center">
          <h3>All Maintenance (500)</h3>
        </v-col>
        <v-col cols="4" class="text-right pr-5">
          <v-icon color="blue" class="pr-1">mdi-tab</v-icon>
          <v-icon color="blue" class="pr-1">mdi-download-box-outline</v-icon>
          <v-icon color="blue" class="pr-1">mdi-delete</v-icon>
          <v-icon color="blue" class="pr-1"
            >mdi-arrow-up-bold-circle-outline</v-icon
          >
          <v-icon color="blue" class="pr-1" @click="openAddModal"
            >mdi-plus-circle-outline</v-icon
          >
          <v-icon color="blue">mdi-minus</v-icon>
        </v-col>
      </v-row>
      <v-col lg="4" cols="12" class="m-0 d-flex">
        <v-btn outlined rounded small shaped class="mr-2">My Maintenance</v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              outlined
              rounded
              small
              shaped
              class="mr-2"
              v-bind="attrs"
              v-on="on"
            >
              Unassigned<v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="item in unassignedOptions" :key="item.text">
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn outlined rounded small shaped class="mr-2">Estimates</v-btn>
        <v-btn outlined rounded small shaped class="mr-2">Janitorial</v-btn>
        <v-btn outlined rounded small shaped class="mr-2">Inactive</v-btn>

        <v-icon size="28">mdi-view-list-outline</v-icon>
      </v-col>

      <!-- Data Table -->
      <v-data-table
        :headers="headersMaintenance"
        :items="dessertsMaintenance"
        :items-per-page="5"
        class="elevation-1"
      >
        <!-- <template v-slot:item.action="">
          <v-btn color="success" outlined small shaped>View</v-btn>
        </template> -->
      </v-data-table>

      <!-- Add Maintenance Modal -->
      <v-dialog v-model="addModalVisible" max-width="800">
        <v-card>
          <div class="pt-5 pl-5">
            <v-btn @click="closeAddModal">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>

          <v-card-title class="headline justify-center"
            >Add Maintenance</v-card-title
          >
          <v-col cols="12">
            <v-card>
              <!-- Header Row -->
              <!-- ... Your existing header code ... -->

              <!-- Tabs -->
              <template>
                <v-col cols="12">
                  <v-tabs v-model="activeTab">
                    <v-tab v-for="(tab, index) in tabs" :key="index">
                      {{ tab }}
                    </v-tab>

                    <!-- General Tab Content -->
                    <v-tab-item>
                      <v-col cols="12" class="pt-5">
                        <v-form ref="maintenanceForm">
                          <!-- General Section -->
                          <v-row>
                            <!-- ... Your existing general code ... -->
                            <v-col cols="12" md="6">
                              <!-- Service Type Dropdown -->
                              <v-select
                                v-model="serviceType"
                                :items="serviceTypeOptions"
                                label="Service Type"
                                outlined
                                dense
                              ></v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                              <!-- Service Type Dropdown -->
                              <v-select
                                v-model="problemDescription"
                                :items="problemDescriptionOptions"
                                label="Problem Description"
                                outlined
                                dense
                              ></v-select>
                            </v-col>

                            <v-col cols="12" md="6">
                              <!-- Provider Dropdown -->
                              <v-select
                                v-model="provider"
                                :items="providerOptions"
                                label="Provider"
                                outlined
                                dense
                              ></v-select>
                            </v-col>
                          </v-row>

                          <!-- Maintenance Cost Section -->
                          <v-row>
                            <v-col cols="12">
                              <h3>Maintenance Cost</h3>
                              <div class="d-flex justify-end">
                                <v-switch
                                  label="Estimate"
                                  v-model="estimate"
                                ></v-switch>
                              </div>
                            </v-col>

                            <v-col cols="12" md="6">
                              <v-select
                                v-model="currency"
                                :items="currencyOptions"
                                label="Currency"
                                outlined
                                dense
                              ></v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                              <v-text-field
                                label="Unit Cost"
                                v-model="unitCost"
                                outlined
                                dense
                              ></v-text-field>
                            </v-col>

                            <v-col cols="6" md="2">
                              <v-btn
                                @click="toggleButtonState"
                                :color="buttonColor"
                                >{{ buttonText }}</v-btn
                              >
                            </v-col>
                            <v-col>
                              <v-text-field
                                label="Tax"
                                v-model="tax"
                                outlined
                                dense
                              ></v-text-field>
                            </v-col>
                            <!-- Add other fields as needed -->
                          </v-row>

                          <!-- Status Section -->
                          <v-row>
                            <v-col cols="12">
                              <h3>Status</h3>
                            </v-col>
                            <v-col cols="12" md="6">
                              <v-select
                                v-model="status"
                                :items="statusOptions"
                                label="Status"
                                outlined
                                dense
                              ></v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                              <v-select
                                v-model="autoComplete"
                                :items="autoCompleteOptions"
                                label="Auto Complete"
                                outlined
                                dense
                              ></v-select>
                            </v-col>
                            <!-- Add other fields as needed -->
                            <v-col cols="12" md="12">
                              <v-text-field
                                label="Note"
                                v-model="note"
                                outlined
                                dense
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <!-- Add Button -->
                          <div class="text-center">
                            <v-btn
                              @click="addMaintenance"
                              color="primary"
                              style="width: 20%; height:40px;"
                            >
                              Add
                            </v-btn>
                          </div>
                        </v-form>
                      </v-col>
                    </v-tab-item>

                    <!-- Schedule Tab Content -->

                    <v-tab-item>
                      <v-col cols="12" class="pt-5">
                        <v-row>
                          <!-- ... Your existing general code ... -->
                          <v-col cols="12" md="4">
                            <v-text-field
                              label="First Service Date"
                              v-model="firstServiceDate"
                              type="date"
                              outlined
                              dense
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-select
                              v-model="serviceWindow"
                              :items="serviceWindowOptions"
                              label="Service Window"
                              outlined
                              dense
                            ></v-select>
                          </v-col>

                          <v-col cols="12" md="4">
                            <v-select
                              v-model="frequency"
                              :items="frequencyOptions"
                              label="Frequency"
                              outlined
                              dense
                            ></v-select>
                          </v-col>
                        </v-row>

                        <v-row class="d-flex justify-center align-center pb-5">
                          <v-icon @click="moveBackward" class="mr-2"
                            >mdi-chevron-left</v-icon
                          >
                          <h4>FY2024</h4>
                          <v-icon @click="moveForward" class="ml-2"
                            >mdi-chevron-right</v-icon
                          >
                          <v-btn @click="handleFourYears" class="ml-2">
                            <v-icon @click="moveBackward" class="mr-2"
                              >mdi-chevron-left</v-icon
                            >+ 4 Years</v-btn
                          >
                        </v-row>

                        <v-row>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-5 "
                          >
                            <v-btn
                              @click="handleQuarterly('Q1')"
                              class="mx-2"
                              width="20%"
                              height="250%"
                              >Q1</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Q2')"
                              class="mx-2"
                              width="20%"
                              height="250%"
                              >Q2</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Q3')"
                              class="mx-2"
                              width="20%"
                              height="250%"
                              >Q3</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Q4')"
                              class="mx-2"
                              width="20%"
                              height="250%"
                              >Q4</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-4 "
                          >
                            <v-btn
                              @click="handleQuarterly('P1')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              >P1</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('P2')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              >P4</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('P3')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              >P7</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('P4')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              >P10</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-3"
                          >
                            <v-btn
                              @click="handleQuarterly('p1')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 1</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p2')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 14</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p3')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 27</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p4')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 40</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-3  "
                          >
                            <v-btn
                              @click="handleQuarterly('p1')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 2</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p2')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 15</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p3')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 28</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p4')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 41</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-3  "
                          >
                            <v-btn
                              @click="handleQuarterly('p1')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 3</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p2')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 16</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p3')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 29</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p4')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 42</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-3  "
                          >
                            <v-btn
                              @click="handleQuarterly('p1')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 4</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p2')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 17</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p3')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 30</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p4')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 43</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-5  pb-5"
                          >
                            <v-btn
                              @click="handleQuarterly('p1')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 5</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p2')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 18</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p3')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 31</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p4')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              color="primary"
                              >Week 44</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-5  "
                          >
                            <v-btn
                              @click="handleQuarterly('p2')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              >P2</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p5')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              >P5</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p8')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              >P8</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p11')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              >P11</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-3"
                          >
                            <v-btn
                              @click="handleQuarterly('Week6')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 6</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week19')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 19</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week32')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 32</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week45')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 45</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-3"
                          >
                            <v-btn
                              @click="handleQuarterly('Week7')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 7</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week20')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 20</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week33')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 33</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week46')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 46</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-3"
                          >
                            <v-btn
                              @click="handleQuarterly('Week8')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 8</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week20')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 21</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week34')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 34</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week47')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 47</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-3 pb-5  "
                          >
                            <v-btn
                              @click="handleQuarterly('Week9')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 9</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week22')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 22</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week35')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 35</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week48')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 48</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-5  "
                          >
                            <v-btn
                              @click="handleQuarterly('p3')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              >P3</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p6')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              >P6</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p9')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              >P9</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('p12')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              >P12</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-5  "
                          >
                            <v-btn
                              @click="handleQuarterly('week10')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 10</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week23')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 23</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week36')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 36</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week 49')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 49</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-5  "
                          >
                            <v-btn
                              @click="handleQuarterly('week11')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 11</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week24')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 24</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week37')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 37</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week 50')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 50</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-5  "
                          >
                            <v-btn
                              @click="handleQuarterly('week12')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 12</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week25')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 25</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week38')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 38</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week 51')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 51</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="d-flex justify-center align-center pt-5  "
                          >
                            <v-btn
                              @click="handleQuarterly('week13')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 13</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week26')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 26</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week39')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 39</v-btn
                            >
                            <v-btn
                              @click="handleQuarterly('Week 52')"
                              class="mx-2"
                              width="20%"
                              height="160%"
                              outlined
                              >Week 52</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-col>
                      <!-- Add Button (if needed) -->
                      <div class="text-center pt-5 pb-5">
                        <v-btn
                          @click="addMaintenance"
                          color="primary"
                          style="width: 20%; height:40px;"
                        >
                          Add
                        </v-btn>
                      </div>
                    </v-tab-item>

                    <!-- Building Tab Content -->
                    <v-tab-item>
                      <v-col cols="12" md="6">
                        <!-- Add your Building tab content here -->
                      </v-col>
                    </v-tab-item>
                  </v-tabs>

                  <!-- Other components and sections in your template -->
                </v-col>
              </template>

              <!-- Data Table -->
              <!-- ... Your existing data table code ... -->

              <!-- Add Maintenance Modal -->
              <!-- ... Your existing modal code ... -->
            </v-card>
          </v-col>
        </v-card>
      </v-dialog>
    </v-card>
  </v-col>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
// import Schedule from "../Dashboard/Schedule.vue";

Vue.use(VueAxios, axios);
export default {
  name: "All Maintence",
  components: {
    // Register the Dashboard component
  },

  data() {
    return {
      headersMaintenance: [
        // Your existing headers
      ],
      dessertsMaintenance: [
        // Your existing data
      ],
      addModalVisible: false,
      // Other modal data and methods
      buttonState: false,
      textareaValue: "",

      tabs: ["General", "Schedule", "Building"],
      // General Section
      currencyOptions: ["Currency A", "Currency B", "Currency C"],
      serviceTypeOptions: ["Service A", "Service B", "Service C"], // Replace with your actual options
      providerOptions: ["Provider X", "Provider Y", "Provider Z"],
      problemDescriptionOptions: [
        "problemDescription X",
        "problemDescription Y",
        "problemDescription Z",
      ],
      serviceType: "",
      provider: "",
      // Maintenance Cost Section
      currency: "",
      unitCost: "",
      tax: "",
      // Status Section
      status: "",
      statusOptions: ["Active", "Inactive"],
      autoCompleteOptions: ["Yes", "No"],
      autoComplete: false,
      // Notes Section
      notes: "",

      firstServiceDate: "", // Date format: YYYY-MM-DD
      serviceWindow: "", // Selected service window
      frequency: "", // Selected frequency
      serviceWindowOptions: ["Service Window Monthly", "Another Option"], // Replace with your actual options
      frequencyOptions: [
        "Frequency 1st Period of all Quater",
        "Another Option",
      ],
    };
  },
  computed: {
    // Computed properties to dynamically set button properties
    buttonText() {
      return this.buttonState ? "$" : "%";
    },

    buttonColor() {
      return this.buttonState ? "success" : "primary";
    },
  },
  methods: {
    openAddModal() {
      this.addModalVisible = true;
    },
    closeAddModal() {
      this.addModalVisible = false;
    },
    // Other methods for your component
    toggleButtonState() {
      this.buttonState = !this.buttonState;
    },
  },
};
</script>

<style scoped>
/* Your existing styles */
</style>
