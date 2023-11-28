<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-img height="70" class="pa-4">
      <div class="text-center">
        <!-- <v-avatar class="mb-4" color="grey darken-1" size="64">
          <v-img
            aspect-ratio="30"
            src="https://yt3.ggpht.com/esazPAO03T0f0vKdByJvkDy6MSwjyG5f-c_2S2CJapszQ3KPQyZarpoqvgv0Us0atUbILytj=s88-c-k-c0x00ffffff-no-rj"
          />
        </v-avatar> -->
        <h3 class="black--text ">Planned Maintenance</h3>
      </div>
    </v-img>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="[icon, text] in links" :key="icon" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- filter list -->

    <hr />

    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="[icon, text] in filter" :key="icon" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">{{
            text
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <template>
        <v-autocomplete
          v-model="selectedItem"
          :items="filterOptions"
          label="My Fy 22-23(Q1 & Q2)"
          item-text="text"
          item-value="value"
          outlined
          clearable
          class="mr-3 ml-3 "
        >
          <template #selection="{ item }">
            <v-chip v-if="item" v-on="on" close @input="removeItem(item)">
              {{ item.text }}
            </v-chip>
          </template>
        </v-autocomplete>
      </template>
      <!-- icon filter -->
      <div>
        <v-icon class="ml-3 " size="25">mdi-heart-box-outline</v-icon>
        <v-icon class="ml-2" size="25">mdi-refresh-circle</v-icon>
        <v-icon class="ml-2" size="25">mdi-close-box-outline</v-icon>
      </div>
      <!-- search Query -->

      <v-text-field
        v-model="searchQuery"
        label="Search"
        outlined
        clearable
        class="ml-3 mr-3 my-5"
      ></v-text-field>

      <!-- Year Query -->

      <h3 class="ml-3 mb-5">Dates</h3>
      <div class="mx-3 my-2">
        <v-text-field
          v-model="selectedYear"
          label="Fiscal Year"
          outlined
          clearable
          type="month"
        ></v-text-field>
        <!-- Quarter Query -->
        <v-text-field
          v-model="selectedNumber"
          label="Quarter"
          outlined
          clearable
          type="month"
        ></v-text-field>
        <!-- Quarterend end-->
        <v-text-field
          v-model="selectedDate"
          label="Date Range"
          outlined
          clearable
          type="date"
        ></v-text-field>
      </div>
      <!-- Date -->
      <!-- Users list -->
      <template>
        <h3 class="ml-3 mb-5">Users</h3>
        <v-autocomplete
          v-model="selectedFacility"
          :items="filterFacility"
          label="Facility Representative"
          item-text="text"
          item-value="value"
          outlined
          clearable
          class="mr-3 ml-3 "
        >
          <template #selection="{ item }">
            <v-chip v-if="item" v-on="on" close @input="removeItem(item)">
              {{ item.text }}
            </v-chip>
          </template>
        </v-autocomplete>
      </template>
      <!-- Users end -->
      <!-- Regional Manager -->
      <template>
        <v-autocomplete
          v-model="selectedRegional"
          :items="filterRegional"
          label="Regional Manager"
          item-text="text"
          item-value="value"
          outlined
          clearable
          class="mr-3 ml-3 "
        >
          <template #selection="{ item }">
            <v-chip v-if="item" v-on="on" close @input="removeItem(item)">
              {{ item.text }}
            </v-chip>
          </template>
        </v-autocomplete>
      </template>
      <!-- Regional Manager -->
      <template>
        <v-autocomplete
          v-model="selectedGeo"
          :items="filterGeo"
          label="Geo Lead"
          item-text="text"
          item-value="value"
          outlined
          clearable
          class="mr-3 ml-3 "
        >
          <template #selection="{ item }">
            <v-chip v-if="item" v-on="on" close @input="removeItem(item)">
              {{ item.text }}
            </v-chip>
          </template>
        </v-autocomplete>
      </template>
      <!-- Users end -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      links: [
        ["mdi-view-dashboard", "Dashboard"],
        ["mdi-calendar", "Plan"],
        ["mdi-compare", "Compare"],
        ["mdi-camera", "Snapshots"],
      ],
      filter: [["mdi-tune", "Filters"]],
      selectedItem: null,
      filterOptions: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" },
        { text: "Option 3", value: "option3" },
        // Add more options as needed
      ],
      selectedUser: null,
      filterUsers: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" },
        { text: "Option 3", value: "option3" },
        // Add more options as needed
      ],
      selectedFacility: null,
      filterFacility: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" },
        { text: "Option 3", value: "option3" },
        // Add more options as needed
      ],
      selectedRegional: null,
      filterRegional: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" },
        { text: "Option 3", value: "option3" },
        // Add more options as needed
      ],
      selectedGeo: null,
      filterGeo: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" },
        { text: "Option 3", value: "option3" },
        // Add more options as needed
      ],

      searchQuery: "",
      selectedYear: null,
      selectedNumber: null,
    };
  },
};
</script>

<style scoped></style>
