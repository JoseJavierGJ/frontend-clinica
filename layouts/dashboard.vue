<template>
  <v-app>
    <v-navigation-drawer
      app
      permanent
      color="#ffdec8"
    >
      <v-sheet
        color="#ffdec8"
        class="pa-4 text-center rounded-lg"
      >
        <v-img
          :src="require('@/assets/images/logo.svg')"
          height="200"
          width="200"
          class="mb-4 mx-auto d-block rounded-lg"
          contain="true"
        />
      </v-sheet>

      <v-divider />

      <!-- Lista de elementos en la barra lateral -->
      <v-list dense>
        <v-list-item
          v-for="item in links"
          :key="item.icon"
          link
          :to="item.route"
          active-class="selected-item"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-spacer />

      <v-sheet color="#ffdec8" class="pa-4 text-center rounded-lg">
        <v-img
          :src="require('@/assets/images/docat.jpg')"
          height="60"
          width="60"
          class="mb-2 mx-auto d-block rounded-circle"
          contain="true"
          aspect-ratio="1"
        />
        <div>
          {{ userEmail }}
        </div>
        <div>
          {{ userNombre }}
        </div>
        <v-btn
          color="#c8a2c8"
          class="dark--text rounded-pill"
          :class="{ 'white--text': hover }"
          style="margin-top: 40px; position: relative; overflow: hidden;"
          @mouseover="hover = true"
          @mouseleave="hover = false"
          @click="logout"
        >
          Logout
          <v-img
            :src="require('@/assets/images/capsula.png')"
            height="24"
            width="24"
            class="mx-auto"
            contain="true"
          />
        </v-btn>
      </v-sheet>
    </v-navigation-drawer>

    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      userEmail: '',
      userNombre: '',
      hover: false,
      links: [
        { icon: 'mdi-calendar', text: 'Schedule', route: '/dashboard/schedule' },
        { icon: 'mdi-account', text: 'Patients', route: '/dashboard/usuarios' },
        { icon: 'mdi-cart', text: 'Orders', route: '/dashboard/orders' }
      ]
    }
  },
  mounted () {
    this.fetchUserEmail()
    this.fetchUserNombre()
  },
  methods: {
    fetchUserEmail () {
      const email = localStorage.getItem('userEmail')
      this.userEmail = email || 'No disponible'
    },
    fetchUserNombre () {
      const nombre = localStorage.getItem('userNombre')
      this.userNombre = nombre || 'No disponible'
    },
    logout () {
      localStorage.removeItem('userEmail')
      this.$router.push('/')
    }
  }
}
</script>

<style>
.selected-item {
  background-color: #673ab7;
  color: white !important;
}

.selected-item .v-list-item-content,
.selected-item .v-list-item-icon {
  color: white !important;
}

.rounded-circle {
  border-radius: 50%;
}

.rounded-pill {
  border-radius: 25px;
}

.v-main {
  overflow: hidden;
  height: 100vh;
}

.v-navigation-drawer__content {
    height: 100%;
    overflow: hidden;
}
</style>
