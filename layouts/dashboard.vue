<!-- <template>
  <v-app>
    <v-navigation-drawer
      app
      permanent
      color="#1299CA"
    >
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        />

        <div>john@vuetifyjs.com</div>
      </v-sheet>

      <v-divider />

      <v-list>
        <v-list-item
          v-for="[icon, text, ruta] in links"
          :key="icon"
          link
          :to="ruta"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
  data: () => ({
    drawer: null,
    links: [
      ['mdi-account', 'Pacientes', '/dashboard/usuarios']
    ]
  })
}
</script> -->

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
        <!-- Logo con ruta relativa a tus assets -->
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
      <v-sheet
        v-if="user.email !== 'Cargando...'"
        color="#ffdec8"
        class="pa-4 text-center rounded-lg"
      >
        <div>{{ user.email }}</div>
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
      user: {
        email: 'Cargando...' // Puedes inicializarlo como null o con un mensaje de carga
      },
      drawer: null,
      links: [
        // Aquí puedes agregar más elementos si los necesitas
        { icon: 'mdi-calendar', text: 'Schedule', route: '/dashboard/schedule' },
        { icon: 'mdi-account', text: 'Patients', route: '/dashboard/usuarios' },
        { icon: 'mdi-cart', text: 'Orders', route: '/dashboard/orders' },
        { icon: 'mdi-flask', text: 'Laboratory', route: '/dashboard/laboratory' }
      ]
    }
  },
  created () {
    // Verifica si this.$store.state.user está definido antes de acceder a su propiedad email
    if (this.$store.state.user) {
      this.user.email = this.$store.state.user.email
    }
  }
}

</script>

<style>
  /* Clase personalizada para ítems de menú seleccionados */
  .selected-item {
    background-color: #673ab7; /* Morado oscuro, ajusta según tu preferencia */
    color: white !important;
  }

  .selected-item .v-list-item-content,
  .selected-item .v-list-item-icon {
    color: white !important; /* Asegura que los iconos y texto sean blancos */
  }
</style>
