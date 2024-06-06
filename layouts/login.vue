<template>
  <v-app style="overflow-y: hidden">
    <v-main>
      <v-sheet
        class="pa-0 ma-0"
        height="100vh"
        width="100vw"
        color="#FFDEC8"
      >
        <v-row style="padding-top: 23px;">
          <v-col cols="6">
            <v-row height="300px" align="center" justify="center">
              <h1 style="padding-top: 50px;">
                Clinic Patient's Dashboard
              </h1>
            </v-row>
            <v-row align="center" justify="center">
              <v-img
                :src="require('@/assets/images/logo.svg')"
                max-width="500px"
                max-height="500px"
                style="margin-top: -30px;"
              />
            </v-row>
          </v-col>
          <v-col cols="6" style="height: 100%!important;" align-self="center">
            <Nuxt />
          </v-col>
        </v-row>
      </v-sheet>
    </v-main>
  </v-app>
</template>
