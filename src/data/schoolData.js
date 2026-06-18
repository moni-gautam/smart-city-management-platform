export const schoolData = {

  metrics: {
    teachers: 82,
    roomsActive: 32,
    energy: "67%",
    temperature: "25°C",
  },

  scanners: {

    SC_GATE: {
      name: "Main Gate",
      floor: "GROUND",
      position: [2, 3, -14],
    },

    SC_GROUND: {
      name: "Ground Floor",
      floor: "GROUND",
      position: [-6, 2, -14],
    },

    SC_FIRST: {
      name: "First Floor",
      floor: "FIRST",
      position: [-4, 5, -14],
    },

    SC_SECOND: {
      name: "Second Floor",
      floor: "SECOND",
      position: [-1, 8, -14],
    },

    SC_LIB: {
      name: "Library",
      floor: "FIRST",
      position: [-6, 6, -14],
    },

  },

  students: [

    { id: "STU_101", scannerId: "SC_FIRST", rssi: -42 },
    { id: "STU_102", scannerId: "SC_FIRST", rssi: -45 },
    { id: "STU_103", scannerId: "SC_LIB", rssi: -48 },
    { id: "STU_104", scannerId: "SC_GROUND", rssi: -50 },
    { id: "STU_105", scannerId: "SC_GATE", rssi: -55 },
    { id: "STU_106", scannerId: "SC_FIRST", rssi: -44 },
{ id: "STU_119", scannerId: "SC_LIB", rssi: -46 },

    { id: "STU_201", scannerId: "SC_GROUND", rssi: -41 },
    { id: "STU_202", scannerId: "SC_GROUND", rssi: -49 },
   {
  id: "STU_203",
  scannerId: "SC_SECOND",
  rssi: -53,

  offset: [0.5, 0, 1.2]
},
    { id: "STU_204", scannerId: "SC_FIRST", rssi: -42 },

    { id:"STU_301", scannerId: "SC_LIB", rssi: -40 },
    { id: "STU_302", scannerId: "SC_FIRST", rssi: -46 },
    { id: "STU_303", scannerId: "SC_GROUND", rssi: -50 },

    { id: "STU_401", scannerId: "SC_GATE", rssi: -70 },
    { id: "STU_402", scannerId: "SC_GATE", rssi: -68 },

    { id: "STU_501", scannerId: "SC_SECOND", rssi: -49 },
    { id: "STU_502", scannerId: "SC_SECOND", rssi: -51 },

    { id: "STU_601", scannerId: "SC_FIRST", rssi: -43 },
    { id: "STU_602", scannerId: "SC_LIB", rssi: -47 },
    { id: "STU_603", scannerId: "SC_GROUND", rssi: -53 },

    { id: "STU_604", scannerId: "SC_GATE", rssi: -61 },
    { id: "STU_605", scannerId: "SC_SECOND", rssi: -50 },
    { id: "STU_606", scannerId: "SC_FIRST", rssi: -44 },
    { id: "STU_607", scannerId: "SC_LIB", rssi: -46 },
    { id: "STU_608", scannerId: "SC_GROUND", rssi: -55 },
    { id: "STU_609", scannerId: "SC_FIRST", rssi: -45 },
    { id: "STU_610", scannerId: "SC_SECOND", rssi: -49 },

  ],

};