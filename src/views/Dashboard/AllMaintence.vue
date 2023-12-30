<template>
  <v-col cols="12">
    <v-card>
      <!-- Header Row -->
      <v-row align="center" justify="space-between" class="pl-3">
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
                <v-col cols="12" md="12">
                  <v-tabs v-model="activeTab">
                    <v-col cols="12" class="allTabs">
                      <v-tab v-for="(tab, index) in tabs" :key="index">
                        {{ tab }}
                      </v-tab>
                    </v-col>

                    <template>
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
                                @click="addGeneral"
                                color="primary"
                                style="width: 20%; height:40px;"
                              >
                                Next
                              </v-btn>
                            </div>
                          </v-form>
                        </v-col>
                      </v-tab-item>
                    </template>

                    <!-- Schedule Tab Content -->

                    <template>
                      <v-tab-item>
                        <div
                          :class="{
                            'd-block': !addScheduleData,
                            'd-none': addScheduleData,
                          }"
                        >
                          <Schedule></Schedule>
                          <!-- ... Your existing Schedule code ... -->
                          <!-- Add Button  -->
                          <div class="text-center pt-5 pb-5">
                            <v-btn
                              @click="addSchedule"
                              color="primary"
                              style="width: 20%; height:40px;"
                            >
                              Next
                            </v-btn>
                          </div>
                        </div>

                        <div
                          :class="{
                            'd-block': addScheduleData,
                            'd-none': !addScheduleData,
                          }"
                        >
                          <v-col cols="12" class="pt-5">
                            <v-form ref="scheduleTimeForm">
                              <!-- Service From and Service To -->
                              <v-row>
                                <v-col cols="12" md="6">
                                  <v-text-field
                                    label="Service From"
                                    v-model="firstServiceDate"
                                    type="date"
                                    outlined
                                    dense
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                  <v-text-field
                                    label="Service To"
                                    v-model="firstServiceDate"
                                    type="date"
                                    outlined
                                    dense
                                  ></v-text-field>
                                </v-col>
                              </v-row>

                              <!-- Cleaner Section -->
                              <v-row>
                                <v-col cols="6">
                                  <v-btn
                                    @click="addCleaner"
                                    color="primary"
                                    style="width: 50%; height:40px;"
                                    class="mb-4"
                                  >
                                    <v-icon>mdi-plus</v-icon> Cleaner
                                  </v-btn>
                                  <v-select
                                    v-model="cleaner"
                                    :items="cleanerOptions"
                                    label="cleaner"
                                    outlined
                                    dense
                                  ></v-select>

                                  <v-text-field
                                    v-model="hourlyRate"
                                    label="$ Hourly Rate"
                                    outlined
                                    dense
                                  ></v-text-field>

                                  <v-btn
                                    @click="toggleButtonState"
                                    :color="buttonColor"
                                    class="mb-2"
                                    >{{ buttonText }}</v-btn
                                  >

                                  <v-text-field
                                    label="Tax"
                                    v-model="tax"
                                    outlined
                                    dense
                                  ></v-text-field>
                                </v-col>
                                <v-row>
                                  <v-col cols="12">
                                    <v-col>
                                      <h3>Time</h3>
                                    </v-col>
                                    <v-col cols="12">
                                      <v-text-field
                                        label="Time"
                                        v-model="serviceToTime"
                                        type="time"
                                        outlined
                                        dense
                                      ></v-text-field>
                                      <v-text-field
                                        label="Time"
                                        v-model="serviceToTime"
                                        type="time"
                                        outlined
                                        dense
                                      ></v-text-field>
                                    </v-col>
                                  </v-col>
                                </v-row>
                              </v-row>

                              <!-- Total Section -->
                              <v-row>
                                <v-col cols="6">
                                  <div>
                                    <h3>
                                      Total
                                      <v-btn class="ms-4" style="width: 40%;">{{
                                        totalAmount | currency
                                      }}</v-btn>
                                    </h3>
                                  </div>
                                </v-col>
                                <v-col cols="6">
                                  <div>
                                    <h3>
                                      Total
                                      <v-btn class="ms-4" style="width: 40%;">{{
                                        totalHours.toLowerCase() | currency
                                      }}</v-btn>
                                    </h3>
                                  </div>
                                </v-col>
                              </v-row>

                              <v-row class="d-flex justify-center">
                                <v-col
                                  v-for="(day, index) in daysOfWeek"
                                  :key="index"
                                  cols="auto"
                                >
                                  <div>{{ day }}</div>
                                  <v-checkbox v-model="selectedDays[index]">{{
                                    day.charAt(0)
                                  }}</v-checkbox>
                                </v-col>
                              </v-row>

                              <!-- Add Button (if needed) -->
                              <div class="text-center pt-5 pb-5">
                                <v-btn
                                  @click="addSchedule"
                                  color="primary"
                                  class="mr-3"
                                  style="width: 20%; height:40px;"
                                >
                                  Previous
                                </v-btn>
                                <v-btn
                                  @click="submitSchedule"
                                  color="primary"
                                  style="width: 20%; height:40px;"
                                >
                                  Submit
                                </v-btn>
                              </div>
                            </v-form>
                          </v-col>
                        </div>
                      </v-tab-item>
                    </template>

                    <!-- Building Tab Content -->
                    <template>
                      <v-tab-item>
                        <v-col
                          cols="12"
                          md="12"
                          class="d-flex justify-center text-center"
                        >
                          <!-- Add your Building tab content here -->
                          <v-text-field
                            v-model="search"
                            label="Search"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <div class="text-center">
                          <v-btn
                            @click="addBuilding"
                            color="primary"
                            style="width: 20%; height:40px;"
                          >
                            Submit
                          </v-btn>
                        </div>
                      </v-tab-item>
                    </template>
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
import Schedule from "../Dashboard/Schedule.vue";
export default {
  name: "All Maintence",
  components: {
    Schedule, // Register the Dashboard component
  },

  data() {
    return {
      daysOfWeek: ["M", "T", "W", "T", "F", "S", "S"],
      selectedDays: [false, false, false, false, false, false, false],
      currentTab: "General",
      headersMaintenance: [
        // Your existing headers
      ],
      dessertsMaintenance: [
        // Your existing data
      ],
      addModalVisible: false,
      addScheduleData: false,
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

      serviceFrom: null,
      serviceToTime: null,
      serviceTo: null,
      cleaner: "",
      cleanerOptions: ["Cleaner A", "Cleaner B", "Cleaner C"], // Replace with your actual options
      hourlyRate: "",
      isHourlyRate: false,
      totalAmount: "$0.00",
      totalHours: "0hrs",
      currentSection: 1,
      // Replace with your actual options
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
    addSchedule() {
      this.addScheduleData = !this.addScheduleData;
    },
  },
};
</script>

<style scoped>
/* Your existing styles */
.allTabs {
  display: flex;
  justify-content: center;
  gap: 90px;
}
</style>
