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
      <AllMaintence></AllMaintence>
    </v-row>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import AllMaintence from "../Dashboard/AllMaintence.vue";

Vue.use(VueAxios, axios);
export default {
  name: "Dashboard",
  components: {
    // Register the Dashboard component
    AllMaintence,
  },

  data() {
    return {
      list: undefined,
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

      dessertsMaintence: [],
      unassignedOptions: [
        { text: "Option 1" },
        { text: "Option 2" },
        { text: "Option 3" },
        // Add more options as needed
      ],
    };
  },
  mounted() {
    Vue.axios.get("http://127.0.0.1:8000/api/admin/doctors").then((resp) => {
      this.list = resp.data.data;
      console.warn(resp);
      this.list.forEach((doctor) => {
        // Do something with each doctor, for example, log the name
        this.dessertsMaintence.push({
          bildingId: doctor.id,
          bildingName: doctor.first_name + " " + doctor.last_name,
          service: doctor.email,
          problemDescription: doctor.join_date,
          status: doctor.birth_date,
          provider: doctor.gender,
          schedule: "Friday",
        });
      });
    });
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
