<template>
  <div>
    <!-- Campo de búsqueda para las medicinas -->
    <v-container class="mb-4">
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar medicina"
            single-line
            hide-details
            class="flex-grow-1"
          />
          <v-btn icon @click="showCartDialog = true">
            <v-icon :class="{ 'cart-full': cartFull }">
              {{ cartFull ? 'mdi-cart' : 'mdi-cart-outline' }}
            </v-icon>
          </v-btn>
          <v-btn icon @click="showAddMedicineDialog = true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
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
            <v-card-actions class="justify-space-between">
              <v-btn icon @click="deleteMedicine(medicina.nombre)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <div>
                <v-btn icon @click="decrementarCantidad(index)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-btn icon @click="incrementarCantidad(index)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Diálogo para el carrito de compras -->
    <v-dialog v-model="showCartDialog" max-width="500px">
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
          <v-btn color="red" text @click="showCartDialog = false">
            Cerrar
          </v-btn>
          <v-btn color="blue" text @click="enviarTotal">
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo para agregar medicamentos -->
    <v-dialog v-model="showAddMedicineDialog" max-width="500px">
      <v-card>
        <v-card-title>Agregar Medicamento</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="newMedicine.nombre"
              label="Nombre"
              :rules="[v => !!v || 'Nombre es requerido']"
              required
            />
            <v-textarea
              v-model="newMedicine.descripcion"
              label="Descripción"
              :rules="[v => !!v || 'Descripción es requerida']"
              required
            />
            <v-text-field
              v-model="newMedicine.precio"
              label="Precio"
              type="number"
              :rules="[v => !!v || 'Precio es requerido', v => v > 0 || 'El precio debe ser mayor que 0']"
              required
            />
            <v-text-field
              v-model="newMedicine.duracion"
              label="Duración (horas)"
              type="number"
              :rules="[v => !!v || 'Duración es requerida', v => v > 0 || 'La duración debe ser mayor que 0']"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" text @click="showAddMedicineDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="blue" text :disabled="!valid" @click="addMedicine">
            Agregar
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
      search: '',
      headers: [],
      showCartDialog: false,
      showAddMedicineDialog: false,
      carrito: [],
      newMedicine: {
        nombre: '',
        descripcion: '',
        precio: '',
        duracion: ''
      },
      valid: false,
      cartFull: false
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
      this.cartFull = this.carrito.length > 0
      this.animateCart()
    },
    enviarTotal () {
      const pacienteSeleccionado = JSON.parse(localStorage.getItem('pacienteSeleccionado'))
      const medicamentosPorPaciente = JSON.parse(localStorage.getItem('medicamentosPorPaciente')) || {}
      medicamentosPorPaciente[pacienteSeleccionado.id] = this.carrito
      localStorage.setItem('medicamentosPorPaciente', JSON.stringify(medicamentosPorPaciente))
      localStorage.setItem('total', this.totalCarrito)
      this.$router.push('/dashboard/patient')
    },
    addMedicine () {
      const url = '/medicines'
      this.$axios.post(url, this.newMedicine, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(() => {
        this.obtenerMedicina()
        this.showAddMedicineDialog = false
        this.$refs.form.reset()
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error al agregar medicina:', error)
      })
    },
    deleteMedicine (nombre) {
      const url = `/medicines/${nombre}`
      this.$axios.delete(url, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(() => {
        this.obtenerMedicina()
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error al eliminar medicina:', error)
      })
    },
    animateCart () {
      const cartIcon = this.$el.querySelector('.mdi-cart, .mdi-cart-outline')
      cartIcon.classList.add('cart-animation')
      setTimeout(() => {
        cartIcon.classList.remove('cart-animation')
      }, 500)
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

.cart-animation {
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
}
</style>
