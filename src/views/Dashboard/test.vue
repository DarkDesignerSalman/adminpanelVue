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
          <v-card-text>
            <v-card-text>
              <!-- Add your form elements here -->
              <v-form ref="maintenanceForm">
                <!-- General Section -->
                <v-row>
                  <v-col cols="12">
                    <h3>General</h3>
                  </v-col>
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
                      <v-switch label="Estimate" v-model="estimate"></v-switch>
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
                    <v-btn @click="toggleButtonState" :color="buttonColor">{{
                      buttonText
                    }}</v-btn>
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

                <!-- Notes Section -->

                <!-- Add Button -->
                <div class="text-center">
                  <v-btn
                    @click="addMaintenance"
                    color="primary"
                    style="width: 20%; height:40px;"
                    >Add</v-btn
                  >
                </div>
              </v-form>
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "AllMaintenance",
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

      // General Section

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
