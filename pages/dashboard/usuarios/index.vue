<template>
  <div class="main-content">
    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <!-- Muestra las tarjetas de pacientes -->
          <v-col v-for="paciente in pacientes" :key="paciente.id" cols="12" sm="6" md="4">
            <v-card class="pa-3 mb-2 patient-card">
              <v-card-title>{{ paciente.nombre }}</v-card-title>
              <v-card-text>
                {{ paciente.email }}<br>
                {{ paciente.telefono }}<br>
                {{ paciente.direccion }}
                {{ paciente.fecha }}<br>
              </v-card-text>

              <v-card-actions>
                <v-btn icon color="red" @click="deletePatient(paciente)">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
                <v-btn icon color="warning" @click="updatePatient(paciente)">
                  <v-icon>mdi-account-edit</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-3 my-card">
          <v-card-title>Agregar Paciente</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="nombre"
                label="Nombre"
                placeholder="Escribe el nombre"
                outlined
                dense
                solo
              />
              <v-text-field
                v-model="email"
                label="E-mail"
                placeholder="Escribe el apellido e-mail"
                outlined
                dense
                solo
              />
              <v-text-field
                v-model="telefono"
                label="Teléfono"
                placeholder="Escribe el teléfono"
                outlined
                dense
                solo
              />
              <v-text-field
                v-model="direccion"
                label="Direccion"
                placeholder="Escribe la direccion"
                outlined
                dense
                solo
              />
              <v-text-field
                v-model="fecha"
                label="Fecha"
                placeholder="Escribe la fecha"
                outlined
                dense
                solo
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn color="green" block @click="registrarPaciente">
              Registrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      pacientes: [],
      headers: [
        {
          text: 'Nombre',
          value: 'nombre',
          align: 'center',
          sortable: true
        },
        {
          text: 'Email',
          value: 'email',
          align: 'center',
          sortable: true
        },
        {
          text: 'Teléfono',
          value: 'telefono',
          align: 'center',
          sortable: true
        },
        {
          text: 'Direccion',
          value: 'direccion',
          align: 'center',
          sortable: true
        },
        {
          text: 'Fecha',
          value: 'fecha',
          align: 'center',
          sortable: true
        },
        {
          text: 'Acciones',
          value: 'acciones',
          align: 'center'
        }
      ],
      showDialog: false,
      showDelete: false,
      nombre: null,
      email: null,
      telefono: null,
      direccion: null,
      fecha: null,
      patientToDelete: null,
      patientToUpdate: {},
      showUpdate: false
    }
  },
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  mounted () {
    this.obtenerPacientes()
  },
  methods: {
    obtenerPacientes () {
      const url = '/get-all-patients'
      this.$axios.get(url)
        .then((res) => {
          if (res.data.message === 'success') {
            this.pacientes = res.data.patients
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error al obtener pacientes:', error)
        })
    },
    registrarPaciente () {
      const url = '/register-patient'
      const data = {
        nombre: this.nombre,
        email: this.email,
        telefono: this.telefono,
        direccion: this.direccion,
        fecha: this.fecha
      }
      this.$axios.post(url, data)
        .then((res) => {
          if (res.data.message === 'Patient registered successfully') {
            this.showDialog = false
            this.obtenerPacientes()
            this.clearForm()
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error al registrar paciente:', error)
        })
    },

    clearForm () {
      // Limpia todos los campos del formulario después del registro
      this.nombre = null
      this.email = null
      this.telefono = null
      this.direccion = null
      this.fecha = null
    },

    borrarPaciente () {
      const url = `/patients/${this.patientToDelete.id}`
      this.$axios.delete(url)
        .then((res) => {
          if (res.status === 204) {
            this.showDelete = false
            this.obtenerPacientes()
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error al eliminar paciente:', error)
        })
    },
    prepareToDelete (patient) {
      this.patientToDelete = patient
      this.showDelete = true
    },
    deletePatient (patient) {
      const url = `/patients/${patient.id}`
      this.$axios.delete(url).then(() => {
        this.obtenerPacientes() // Refrescar la lista después de eliminar
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error al eliminar paciente:', error)
      })
    },
    updatePatient (patient) {
      this.patientToUpdate = patient
      this.showUpdate = true
    },
    actualizarPaciente () {
      const url = `/patients/${this.patientToUpdate.id}`
      this.$axios.put(url, this.patientToUpdate)
        .then((res) => {
          if (res.data.message === 'success') {
            this.showUpdate = false
            this.obtenerPacientes()
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error al actualizar paciente:', error)
        })
    }
  }
}
</script>

<style scoped>
.my-card {
  max-height: 550px; /* Ajusta la altura máxima del formulario */
  overflow: hidden/* Permite desplazarse si el contenido es muy largo */
}
.v-text-field--solo .v-input__control .v-input__slot {
  height: 32px; /* Reduce la altura de los campos de texto */
}

.v-card-actions {
  padding-top: 0; /* Elimina el espacio por encima del botón */
}

.patient-card {
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main-content {
  margin: 0;
  padding: 0;
  background-color: #fff4ec;
  min-height: 100vh;
  width: 100%;
}

.v-navigation-drawer__content {
  overflow: hidden;
}

.v-application .py-8 {
    padding-top: 32px !important;
    padding-bottom: 32px !important;
    background-color: #fff4ec!important;
}

</style>
