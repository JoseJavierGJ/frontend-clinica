<template>
  <v-container class="bg-cream-100 pa-4">
    <v-row align="center" class="mx-0">
      <v-col cols="10" sm="8" class="d-flex align-center">
        <v-text-field
          v-model="searchQuery"
          class="flex-grow-1"
          placeholder="Search..."
          solo
          append-icon="mdi-magnify"
          background-color="transparent"
          hide-details
        />
      </v-col>

      <v-col cols="6" sm="3" class="d-flex flex-column py-2 text-right">
        <div class="d-flex align-center justify-end my-1">
          <v-avatar color="green darken-1" size="16" />
          <span class="ml-2">Patients With Doctor</span>
        </div>
        <div class="d-flex align-center justify-end my-1">
          <v-avatar color="red darken-1" size="16" />
          <span class="ml-2">Patients Without Doctor</span>
        </div>
      </v-col>
    </v-row>
    <div class="main-content">
      <v-row>
        <v-col cols="12" md="8">
          <v-row>
            <v-col v-for="paciente in filteredPacientes" :key="paciente.id" cols="12">
              <v-card class="pa-3 mb-2 patient-card">
                <div class="card-header">
                  <v-card-title>{{ paciente.nombre }}</v-card-title>
                  <div>
                    <v-btn color="blue" @click="verDetallePaciente(paciente)">
                      View Details
                    </v-btn>
                    <v-btn color="green" @click="gestionarMedicinas(paciente)">
                      View Medicines
                    </v-btn>
                  </div>
                </div>
                <v-card-text class="patient-card-content">
                  <v-img
                    :src="require('@/assets/images/docat.jpg')"
                    class="patient-image"
                  />
                  <div class="patient-details">
                    <span><strong>E-mail:</strong> {{ paciente.email }}</span><br>
                    <span><strong>Age:</strong> {{ paciente.edad }} years</span><br>
                    <span><strong>Sex:</strong> {{ paciente.sexo }}</span><br>
                    <span><strong>Phone Number:</strong> {{ paciente.telefono }}</span><br>
                    <span><strong>Address:</strong> {{ paciente.direccion }}</span><br>
                    <span><strong>Date:</strong> {{ paciente.fecha }}</span>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn icon color="red" class="delete-btn" @click="prepareToDelete(paciente)">
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="pa-3 my-card form-card">
            <v-card-title>For an Appointment</v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field
                  v-model="nombre"
                  label="Name"
                  placeholder="Enter the name"
                  outlined
                  dense
                  :rules="[v => !!v || 'Name is required']"
                  style="background-color: transparent !important; border-radius: 15px"
                />
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="edad"
                      label="Age"
                      outlined
                      dense
                      :rules="[v => !!v || 'Age is required', v => /^\d+$/.test(v) || 'Age must be a number']"
                      style="background-color: transparent !important; border-radius: 15px"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="sexo"
                      :items="['Male', 'Female']"
                      label="Sex"
                      outlined
                      dense
                      :rules="[v => !!v || 'Sex is required']"
                      style="background-color: transparent !important; border-radius: 15px"
                    />
                  </v-col>
                </v-row>

                <v-text-field
                  v-model="email"
                  label="E-mail"
                  placeholder="Enter the e-mail"
                  outlined
                  dense
                  :rules="[v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
                  style="background-color: transparent !important; border-radius: 15px"
                />
                <v-text-field
                  v-model="telefono"
                  label="Phone Number"
                  placeholder="Enter the phone number"
                  outlined
                  dense
                  :rules="[v => !!v || 'Phone Number is required', v => /^\d{3}-\d{3}-\d{4}$/.test(v) || 'Phone Number must be valid (XXX-XXX-XXXX)']"
                  style="background-color: transparent !important; border-radius: 15px"
                  @input="formatPhone"
                />
                <v-text-field
                  v-model="direccion"
                  label="Address"
                  placeholder="Enter the address"
                  outlined
                  dense
                  :rules="[v => !!v || 'Address is required']"
                  style="background-color: transparent !important; border-radius: 15px"
                />
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="fecha"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="fecha"
                      label="Consultation Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      :rules="[v => !!v || 'Date is required']"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="fecha"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(fecha)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-form>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-btn color="green" block @click="registrarPaciente">
                Booking
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Dialog for deleting patient -->
    <v-dialog v-model="showDelete" max-width="500px" persistent>
      <v-card>
        <v-card-title class="headline">
          Confirm Delete
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete the patient "{{ patientToDelete?.nombre }}"?
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" text class="mr-auto" @click="showDelete = false">
            Cancel
          </v-btn>
          <v-btn color="blue" text class="ml-auto" @click="borrarPaciente">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      searchQuery: '',
      pacientes: [],
      headers: [
        {
          text: 'Nombre',
          value: 'nombre',
          align: 'center',
          sortable: true
        },
        {
          text: 'Edad',
          value: 'edad',
          align: 'center',
          sortable: true
        },
        {
          text: 'Sexo',
          value: 'sexo',
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
      sexo: null,
      edad: null,
      patientToDelete: null,
      patientToUpdate: {},
      showUpdate: false,
      menu: false,
      minDate: null // No hay fecha mínima ahora
    }
  },
  computed: {
    ...mapState({
      token: state => state.token
    }),
    filteredPacientes () {
      return this.pacientes.filter(paciente =>
        paciente.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  mounted () {
    this.obtenerPacientes()
    this.setMinDate()
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
    verDetallePaciente (paciente) {
      localStorage.setItem('pacienteSeleccionado', JSON.stringify(paciente))
      this.$router.push('/dashboard/patient')
    },
    gestionarMedicinas (paciente) {
      localStorage.setItem('pacienteSeleccionado', JSON.stringify(paciente))
      this.$router.push('/dashboard/orders')
    },
    registrarPaciente () {
      if (this.$refs.form.validate()) {
        const url = '/register-patient'
        const data = {
          nombre: this.nombre,
          edad: this.edad,
          sexo: this.sexo,
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
      }
    },
    clearForm () {
      this.nombre = null
      this.edad = null
      this.sexo = null
      this.email = null
      this.telefono = null
      this.direccion = null
      this.fecha = null
      this.$refs.form.resetValidation()
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
        this.obtenerPacientes()
        this.$emit('pacienteEliminado', patient.id)
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error al eliminar paciente:', error)
      })
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
    },
    formatPhone () {
      let numbers = this.telefono.replace(/\D/g, '')
      if (numbers.length > 10) {
        numbers = numbers.slice(0, 10)
      }
      const char = { 3: '-', 6: '-' }
      this.telefono = numbers.split('').map((num, idx) => char[idx] ? char[idx] + num : num).join('')
    },
    setMinDate () {
      const today = new Date()
      this.minDate = today.toISOString().substr(0, 10)
    }
  }
}
</script>

<style scoped>
.my-card {
  max-height: 590px;
  overflow: hidden;
  background-color: #ffdec8;
  border-radius: 30px;
}
.v-text-field--solo .v-input__control .v-input__slot {
  height: 32px;
}

.v-card-actions {
  padding-top: 0;
  justify-content: flex-end;
  position: relative;
  margin-top: auto;
}

.v-card-text div {
  display: flex;
  flex-direction: column;
}

.v-card-text span {
  margin-bottom: 4px;
}

strong {
  font-weight: bold;
}

.patient-card {
  min-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #fff4ec;
  overflow-wrap: break-word;
  min-height: 150px;
}

.patient-card-content {
  display: flex;
  align-items: center;
}

.patient-image {
  max-width: 140px;
  max-height: 280px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}

.patient-details {
  flex-grow: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
}

.v-card-actions {
  justify-content: flex-end;
  position: relative;
  margin-top: auto;
}

.delete-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 12px;
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
  padding: 0 !important;
}

.form-card {
  background-color: #ffdec8 !important;
}

.d-flex.justify-end {
  justify-content: flex-end;
}

.my-1 {
  margin-left: auto;
}
</style>
