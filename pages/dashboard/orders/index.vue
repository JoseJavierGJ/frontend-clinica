<template>
  <div>
    <!-- Campo de búsqueda para las medicinas -->
    <v-container class="mb-4">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar medicina"
            single-line
            hide-details
            append-outer-icon="mdi-cart"
            @click:append-outer="showDialog = true"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- Contenedor para las cards de los medicamentos -->
    <v-container>
      <v-row>
        <v-col
          v-for="(medicina, index) in filteredMedicines"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="info-card">
            <v-card-title>{{ medicina.nombre }}</v-card-title>
            <v-card-subtitle>{{ medicina.descripcion }}</v-card-subtitle>
            <v-card-text>
              Precio: ${{ medicina.precio }}
              <br>
              Cantidad: {{ medicina.cantidad }}
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn icon @click="decrementarCantidad(index)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-btn icon @click="incrementarCantidad(index)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Diálogo para el carrito de compras -->
    <v-dialog v-model="showDialog" max-width="500px">
      <v-card>
        <v-card-title>Carrito de compras</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="item in carrito" :key="item.nombre">
              <v-list-item-content>
                <v-list-item-title>{{ item.nombre }} - {{ item.cantidad }} x ${{ item.precio }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <div class="text-right mt-4">
            <strong>Total: ${{ totalCarrito }}</strong>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" text @click="showDialog = false">
            Cerrar
          </v-btn>
          <v-btn color="blue" text @click="enviarTotal">
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      medicinas: [],
      search: '', // Modelo para el campo de búsqueda
      headers: [],
      showDialog: false, // Controlar la visibilidad del diálogo
      carrito: []
    }
  },
  computed: {
    ...mapState({
      token: state => state.token
    }),
    filteredMedicines () {
      return this.medicinas.filter(medicina =>
        medicina.nombre.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    totalCarrito () {
      return this.carrito.reduce((total, item) => {
        return total + (item.cantidad * item.precio)
      }, 0).toFixed(2)
    }
  },
  mounted () {
    this.obtenerMedicina()
  },
  methods: {
    obtenerMedicina () {
      const url = '/all-medicines'
      this.$axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then((res) => {
        this.medicinas = res.data.medicines.map(m => ({ ...m, cantidad: 0 }))
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error al obtener medicinas:', error)
      })
    },
    incrementarCantidad (index) {
      this.medicinas[index].cantidad++
      this.actualizarCarrito(this.medicinas[index])
    },
    decrementarCantidad (index) {
      if (this.medicinas[index].cantidad > 0) {
        this.medicinas[index].cantidad--
        this.actualizarCarrito(this.medicinas[index])
      }
    },
    actualizarCarrito (medicina) {
      const existente = this.carrito.find(m => m.nombre === medicina.nombre)
      if (existente) {
        existente.cantidad = medicina.cantidad
      } else {
        this.carrito.push({ ...medicina })
      }
    },
    enviarTotal () {
      const pacienteSeleccionado = JSON.parse(localStorage.getItem('pacienteSeleccionado'))
      const medicamentosPorPaciente = JSON.parse(localStorage.getItem('medicamentosPorPaciente')) || {}
      medicamentosPorPaciente[pacienteSeleccionado.id] = this.carrito
      localStorage.setItem('medicamentosPorPaciente', JSON.stringify(medicamentosPorPaciente))
      localStorage.setItem('total', this.totalCarrito)
      this.$router.push('/dashboard/patient')
    }
  }
}
</script>

<style scoped>
.info-card {
  background-color: #feb2a0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
}
</style>
