<template>
  <div class="dashboard">
    <!-- <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h3>Dashboard</h3>
            <v-btn color="success">
                View Orders
            </v-btn>
        </v-subheader> -->
    <br />
    <v-row>
      <v-col lg="12" cols="12">
        <!-- <v-alert dense text type="success">
          Login Successfully! Welcome to <strong>Web Burden</strong>
        </v-alert> -->
        <v-row>
          <v-col
            lg="4"
            cols="12"
            v-for="(item, index) in activityLog"
            :key="index"
          >
            <v-card elevation="2" class="rounded-lg">
              <v-card-text class="d-flex justify-space-between align-center">
                <div class="text-center my-4">
                  <h2>{{ item.title }}</h2>
                  <!-- <span>My Fy23 Total</span> -->
                  <p class="paragraph">{{ item.paragraph }}</p>
                </div>
                <v-avatar tile>
                  <ul class="no-list-style">
                    <li className="desh">-</li>
                    <li>{{ item.amount }}</li>
                  </ul>
                </v-avatar>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <!-- <v-col cols="12" lg="5">
        <v-card>
          <v-card-title>Activities</v-card-title>
          <v-card-text class="py-0">
            <v-timeline align-top dense>
              <v-timeline-item color="indigo" small>
                <strong>5 Minuts ago</strong>
                <div class="text-caption">
                  You have new order please check this out
                </div>
              </v-timeline-item>
              <v-timeline-item color="green" small>
                <strong>35 Minuts ago</strong>
                <div class="text-caption mb-2">
                  A Product has delivered!
                </div>
              </v-timeline-item>

              <v-timeline-item color="indigo" small>
                <strong>44 Minuts ago</strong>
                <div class="text-caption">
                  You have new order please check this out
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col> -->

      <template>
        <v-col cols="12">
          <v-card>
            <!-- Header Row -->
            <v-row align="center" justify="space-between">
              <v-col cols="8">
                <h3 class="pl-3">My Packages (0)</h3>
              </v-col>
              <v-col cols="4" class="text-right pr-5">
                <v-icon color="blue" class="pr-1">mdi-tab</v-icon>
                <v-icon color="blue" class="pr-1"
                  >mdi-plus-circle-outline</v-icon
                >
                <v-icon color="blue">mdi-minus</v-icon>
              </v-col>
            </v-row>

            <!-- Data Table -->
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="5"
              class="elevation-1"
            >
              <!-- <template v-slot:item.action="">
                <v-btn color="success" outlined small shaped>View</v-btn>
              </template> -->
            </v-data-table>
          </v-card>
        </v-col>
      </template>
      <v-divider class="ma-5"><hr /></v-divider>

      <template>
        <v-col cols="12">
          <v-card>
            <!-- Header Row -->
            <v-row align="center" justify="space-between">
              <v-col cols="8">
                <h3 class="pl-3">All Maintence (500)</h3>
              </v-col>
              <v-col cols="4" class="text-right pr-5">
                <v-icon color="blue" class="pr-1">mdi-tab</v-icon>
                <v-icon color="blue" class="pr-1"
                  >mdi-download-box-outline</v-icon
                >
                <v-icon color="blue" class="pr-1">mdi-delete</v-icon>
                <v-icon color="blue" class="pr-1"
                  >mdi-arrow-up-bold-circle-outline</v-icon
                >
                <v-icon color="blue" class="pr-1"
                  >mdi-plus-circle-outline</v-icon
                >
                <v-icon color="blue">mdi-minus</v-icon>
              </v-col>
            </v-row>
            <v-col lg="4" cols="12" class="m-0 d-flex">
              <v-btn outlined rounded small shaped class="mr-2"
                >My Maintenance</v-btn
              >
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
                  <v-list-item
                    v-for="item in unassignedOptions"
                    :key="item.text"
                  >
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-btn outlined rounded small shaped class="mr-2"
                >Estimastes</v-btn
              >
              <v-btn outlined rounded small shaped class="mr-2"
                >Janitorial</v-btn
              >
              <v-btn outlined rounded small shaped class="mr-2">Inactive</v-btn>

              <v-icon size="28">mdi-view-list-outline</v-icon>
            </v-col>

            <!-- Data Table -->
            <v-data-table
              :headers="headersMaintence"
              :items="dessertsMaintence"
              :items-per-page="5"
              class="elevation-1"
            >
              >
              <!-- <template v-slot:item.action="">
                <v-btn color="success" outlined small shaped>View</v-btn>
              </template> -->
            </v-data-table>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      activityLog: [
        {
          title: "$123456.00",
          amount: "$0",
          paragraph: "My Fy23 Total",
          icon: "mdi-account",
          color: "cyan lighten-3",
        },
        {
          title: "$0",
          paragraph: "My Fy24 Current Total",
        },
        {
          title: "$0",
          amount: "$0",
          paragraph: "Last Finance Snapshot",
          icon: "mdi-account-group-outline",
          color: "blue-grey darken-1",
        },
        // {
        //   title: "Pending Orders",
        //   amount: 3433,
        //   icon: "mdi-account-group-outline",
        //   color: "deep-orange darken-1",
        // },
      ],
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Status", value: "status" },
        { text: "Total Cost", value: "totalCost" },
        { text: "Snapshot Cost", value: "snapshotCost" },
        { text: "Start Date", value: "StartDate" },
        { text: "Created By", value: "createdBy" },
        { text: "Data Modified", value: "dataModified" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          status: 12,
          totalCost: 1230,
          snapshotCost: 12344,
          StartDate: 12.1,
          createdBy: "Dynamic",
          dataModified: "Dynamic",
        },
      ],
      headersMaintence: [
        {
          text: "Bilding Id",
          align: "start",
          sortable: false,
          value: "bildingId",
        },
        { text: "Bilding Name", value: "bildingName" },
        { text: "Service", value: "service" },
        { text: "Problem Description", value: "problemDescription" },
        { text: "Status", value: "status" },
        { text: "Provider", value: "provider" },
        { text: "Schedule", value: "schedule" },
      ],
      dessertsMaintence: [
        {
          bildingId: "R001",
          bildingName: "Store Name A",
          service: "Service Name A",
          problemDescription: "Problem Description Name A",
          status: "Draft",
          provider: "Provider Window",
          schedule: "Friday",
        },
        {
          bildingId: "R002",
          bildingName: "Store Name B",
          service: "Service Name B",
          problemDescription: "Problem Description Name B",
          status: "Draft",
          provider: "Provider Window",
          schedule: "Sunday",
        },
      ],
      unassignedOptions: [
        { text: "Option 1" },
        { text: "Option 2" },
        { text: "Option 3" },
        // Add more options as needed
      ],
    };
  },
  methods: {
    onButtonClick(item) {
      console.log("click on " + item.no);
    },
  },
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
.no-list-style {
  list-style-type: none;
  margin: 0; /* Optional: Remove default margin */
  padding: 0; /* Optional: Remove default padding */
}

.no-list-style li:first-child {
  list-style-type: none;
  font-size: 30px;
}
</style>
