<template>
  <v-col cols="12" class="pt-5">
    <v-row>
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
      <v-btn
        icon
        outlined
        class="rounded-small mr-3"
        style="width:20px; height:20px;"
        ><v-icon>mdi-chevron-left</v-icon></v-btn
      >
      <span> {{ textItems[currentIndex] }}</span>
      <v-btn
        icon
        outlined
        class="rounded-small ml-4"
        mr-3
        style="width:20px; height:20px;"
        ><v-icon>mdi-chevron-right</v-icon></v-btn
      >
      <v-btn @click="handleFourYears" class="ml-5">
        <v-icon @click="moveBackward" class="mr-2">mdi-chevron-left</v-icon>+ 4
        Years</v-btn
      >
    </v-row>

    <v-row>
      <v-col cols="12" md="12" class="d-flex justify-center align-center pt-5 ">
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
      <v-col cols="12" md="12" class="d-flex justify-center align-center ">
        <v-btn
          @click="handleQuarterly('P1')"
          class="mx-2"
          width="20%"
          height="25px"
          >P1</v-btn
        >
        <v-btn
          @click="handleQuarterly('P4')"
          class="mx-2"
          width="20%"
          height="25px"
          >P4</v-btn
        >
        <v-btn
          @click="handleQuarterly('P7')"
          class="mx-2"
          width="20%"
          height="25px"
          >P7</v-btn
        >
        <v-btn
          @click="handleQuarterly('P10')"
          class="mx-2"
          width="20%"
          height="25px"
          >P10</v-btn
        >
      </v-col>
      <v-col cols="12" md="12" class="d-flex justify-center align-center">
        <v-btn
          @click="handleQuarterly('week1')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 1</v-btn
        >
        <v-btn
          @click="handleQuarterly('week14')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 14</v-btn
        >
        <v-btn
          @click="handleQuarterly('week27')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 27</v-btn
        >
        <v-btn
          @click="handleQuarterly('week40')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 40</v-btn
        >
      </v-col>
      <v-col cols="12" md="12" class="d-flex justify-center align-center">
        <v-btn
          @click="handleQuarterly('week2')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 2</v-btn
        >
        <v-btn
          @click="handleQuarterly('week15')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 15</v-btn
        >
        <v-btn
          @click="handleQuarterly('week28')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 28</v-btn
        >
        <v-btn
          @click="handleQuarterly('week41')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 41</v-btn
        >
      </v-col>
      <v-col cols="12" md="12" class="d-flex justify-center align-center ">
        <v-btn
          @click="handleQuarterly('week3')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 3</v-btn
        >
        <v-btn
          @click="handleQuarterly('week16')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 16</v-btn
        >
        <v-btn
          @click="handleQuarterly('week29')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 29</v-btn
        >
        <v-btn
          @click="handleQuarterly('week42')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 42</v-btn
        >
      </v-col>
      <v-col cols="12" md="12" class="d-flex justify-center align-center">
        <v-btn
          @click="handleQuarterly('week4')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 4</v-btn
        >
        <v-btn
          @click="handleQuarterly('week17')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 17</v-btn
        >
        <v-btn
          @click="handleQuarterly('week30')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 30</v-btn
        >
        <v-btn
          @click="handleQuarterly('week43')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 43</v-btn
        >
      </v-col>
      <v-col
        cols="12"
        md="12"
        class="d-flex justify-center align-center pt-2  pb-2"
      >
        <v-btn
          @click="handleQuarterly('week5')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 5</v-btn
        >
        <v-btn
          @click="handleQuarterly('week18')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 18</v-btn
        >
        <v-btn
          @click="handleQuarterly('week31')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 31</v-btn
        >
        <v-btn
          @click="handleQuarterly('week44')"
          class="mx-2"
          width="20%"
          height="25px"
          color="info"
          >Week 44</v-btn
        >
      </v-col>
      <v-col cols="12" md="12" class="d-flex justify-center align-center">
        <v-btn
          @click="handleQuarterly('p2')"
          class="mx-2"
          width="20%"
          height="25px"
          >P2</v-btn
        >
        <v-btn
          @click="handleQuarterly('p5')"
          class="mx-2"
          width="20%"
          height="25px"
          >P5</v-btn
        >
        <v-btn
          @click="handleQuarterly('p8')"
          class="mx-2"
          width="20%"
          height="25px"
          >P8</v-btn
        >
        <v-btn
          @click="handleQuarterly('p11')"
          class="mx-2"
          width="20%"
          height="25px"
          >P11</v-btn
        >
      </v-col>
      <v-col cols="12" md="12" class="d-flex justify-center align-center">
        <v-btn
          @click="handleQuarterly('Week6')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 6</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week19')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 19</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week32')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 32</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week45')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 45</v-btn
        >
      </v-col>
      <v-col cols="12" md="12" class="d-flex justify-center align-center">
        <v-btn
          @click="handleQuarterly('Week7')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 7</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week20')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 20</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week33')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 33</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week46')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 46</v-btn
        >
      </v-col>
      <v-col cols="12" md="12" class="d-flex justify-center align-center">
        <v-btn
          @click="handleQuarterly('Week8')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 8</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week21')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 21</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week34')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 34</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week47')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 47</v-btn
        >
      </v-col>
      <v-col
        cols="12"
        md="12"
        class="d-flex justify-center align-center pt-2 pb-2  "
      >
        <v-btn
          @click="handleQuarterly('Week9')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 9</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week22')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 22</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week35')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 35</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week48')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 48</v-btn
        >
      </v-col>
      <v-col cols="12" md="12" class="d-flex justify-center align-center">
        <v-btn
          @click="handleQuarterly('p3')"
          class="mx-2"
          width="20%"
          height="25px"
          >P3</v-btn
        >
        <v-btn
          @click="handleQuarterly('p6')"
          class="mx-2"
          width="20%"
          height="25px"
          >P6</v-btn
        >
        <v-btn
          @click="handleQuarterly('p9')"
          class="mx-2"
          width="20%"
          height="25px"
          >P9</v-btn
        >
        <v-btn
          @click="handleQuarterly('p12')"
          class="mx-2"
          width="20%"
          height="25px"
          >P12</v-btn
        >
      </v-col>
      <v-col cols="12" md="12" class="d-flex justify-center align-center">
        <v-btn
          @click="handleQuarterly('week10')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 10</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week23')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 23</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week36')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 36</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week 49')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 49</v-btn
        >
      </v-col>
      <v-col cols="12" md="12" class="d-flex justify-center align-center">
        <v-btn
          @click="handleQuarterly('week11')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 11</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week24')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 24</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week37')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 37</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week 50')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 50</v-btn
        >
      </v-col>
      <v-col cols="12" md="12" class="d-flex justify-center align-center">
        <v-btn
          @click="handleQuarterly('week12')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 12</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week25')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 25</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week38')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 38</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week 51')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 51</v-btn
        >
      </v-col>
      <v-col cols="12" md="12" class="d-flex justify-center align-center">
        <v-btn
          @click="handleQuarterly('week13')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 13</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week26')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 26</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week39')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 39</v-btn
        >
        <v-btn
          @click="handleQuarterly('Week 52')"
          class="mx-2"
          width="20%"
          height="25px"
          outlined
          >Week 52</v-btn
        >
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "All Maintence",
  components: {
    // Register the Dashboard component
  },

  data() {
    return {
      // Date format: YYYY-MM-DD
      currentIndex: 0,
      textItems: ["Fy 2024"],

      serviceWindowOptions: ["Service Window Monthly", "Monthly"],
      frequencyOptions: ["1st Period of all Quater", "Frequency"],
    };
  },
};
</script>
