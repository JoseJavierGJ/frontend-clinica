<template>
  <v-container class="pa-4 bg-rose-50">
    <v-row class="mb-4">
      <v-col class="d-flex align-center">
        <v-text-field
          class="flex-grow-1"
          outlined
          hide-details
          single-line
          append-icon="mdi-magnify"
          placeholder="Search..."
        />
      </v-col>
    </v-row>
    <v-card color="#ffdec8" class="pa-4 d-flex align-center">
      <v-avatar color="blue darken-2" class="white--text mr-4">
        <v-icon>mdi-information</v-icon>
      </v-avatar>
      <v-col>
        <div class="font-weight-bold">
          New Covid-19 Update For Patients
        </div>
        <p>
          All Patients That Have Not Received Their Result For Covid-19 Will Need To Ensure They Stay
          Isolated For A Minimum Of 14 Days
        </p>
      </v-col>
      <v-btn color="blue darken-2" class="white--text">
        See More
      </v-btn>
    </v-card>

    <!-- Inicio del segundo componente -->
    <v-row class="gap-4 mt-4">
      <!-- Ajustamos las columnas aquí -->
      <v-col cols="12" md="4">
        <v-card class="pa-6" color="#ffdec8" elevation="2" style="height: auto;">
          <v-card-title class="text-h5 font-weight-bold mb-4">
            Appointment
          </v-card-title>
          <v-list color="#ffdec8" class="appointment-list">
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="require('@/assets/images/docat.jpg')" alt="Doctor Image" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">
                  Dr. {{ userNombre }} MBBS,.MS.
                </v-list-item-title>
                <v-list-item-subtitle>{{ userEspecialidad }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item
              v-for="paciente in sortedPacientes"
              :key="paciente.id"
              class="patient-item"
              @click="goToSchedule(paciente)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ paciente.nombre }}</v-list-item-title>
                <v-list-item-subtitle>{{ paciente.fecha }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="pa-6" color="#ffdec8" elevation="2">
          <v-card-title class="text-h5 font-weight-bold mb-4">
            Recent Activity
          </v-card-title>
          <v-list three-line color="#ffdec8">
            <v-list-item-group>
              <v-list-item v-for="activity in activities" :key="activity.id">
                <v-list-item-avatar>
                  <v-img :src="require(`@/assets/images/${activity.image}`)" alt="Doctor Image" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium">
                    {{ activity.doctor }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ activity.specialty }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-chip :color="activity.statusColor" small />
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <!-- Medication Section -->
      <v-col>
        <v-card class="pa-4" elevation="2" color="#ffdec8">
          <v-card-title class="text-h5 font-weight-bold mb-4">
            Medication
          </v-card-title>
          <v-list color="#ffc198" class="medication-list">
            <v-list-item-group>
              <v-list-item v-for="medication in medications" :key="medication.nombre">
                <v-list-item-content class="d-flex justify-space-between align-center">
                  <div>
                    <div class="text-h6 font-weight-bold">
                      {{ medication.nombre }}
                    </div>
                    <div class="subtitle-1">
                      Cada {{ medication.duracion }}
                    </div>
                    <div class="caption text-primary">
                      Por {{ medication.dias }} días
                    </div>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <!-- Current Condition Section -->
      <v-col>
        <v-card class="pa-6 current-condition-card" elevation="2" color="#ffdec8">
          <v-card-title class="text-h5 font-weight-bold mb-4">
            Current Condition Of Patients
          </v-card-title>
          <div class="text-h5 font-weight-bold mb-2">
            {{ enfermedadPaciente.enfermedad }}
          </div>
          <div class="subtitle-1 mb-4">
            {{ enfermedadPaciente.descripcionEnfermedad }}
          </div>
          <v-row>
            <v-col>
              <div class="subtitle-2 font-weight-bold">
                Treatment
              </div>
              <div v-for="medication in medications" :key="medication.nombre">
                {{ medication.nombre }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- Recent Bills Section -->
      <v-col>
        <v-card class="pa-6" elevation="2" color="#ffdec8">
          <v-card-title class="text-h5 font-weight-bold mb-4">
            Recent Bills
          </v-card-title>
          <div>
            <div class="subtitle-1">
              Your Payment
            </div>
            <div class="text-h4 font-weight-bold">
              ${{ totalAmount }}
            </div>
          </div>
          <v-row class="subtitle-1 my-4">
            <v-col>
              <div>Medicare</div>
              <div class="font-weight-bold">
                $125.00
              </div>
            </v-col>
            <v-col>
              <div>Total</div>
              <div class="font-weight-bold">
                ${{ totalWithMedicare }}
              </div>
            </v-col>
          </v-row>
          <div class="caption mb-4">
            Paid On The 27 April, 2020 To Dorian Med Pty Ltd
          </div>
          <div class="caption mb-4">
            Suite 206/203-233 New King James Rd, Edgecliff NSW 2027
          </div>
          <v-btn text color="primary" @click="borrarDatosPaciente">
            Next Appointment
          </v-btn>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      activities: [
        {
          id: 1,
          doctor: 'Dr. Daniel MBBS,.MS.',
          specialty: 'Orthopedists Specialist',
          image: 'batcat.png',
          statusColor: 'green'
        },
        {
          id: 2,
          doctor: 'Dr. Itzel MBBS,.MS.',
          specialty: 'Hearts Specialist',
          image: 'docat.jpg',
          statusColor: 'red'
        },
        {
          id: 3,
          doctor: 'Dr. Yoselin MBBS,.MS.',
          specialty: 'Lungs Specialist',
          image: 'docat.jpg',
          statusColor: 'green'
        }
      ],
      medications: [],
      totalAmount: 0,
      medicareAmount: 125.00,
      enfermedadPaciente: {},
      pacientes: [],
      userEspecialidad: '',
      userNombre: ''
    }
  },
  computed: {
    totalWithMedicare () {
      return (parseFloat(this.totalAmount) + this.medicareAmount).toFixed(2)
    },
    sortedPacientes () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.pacientes.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    }
  },
  mounted () {
    this.fetchUserEspecialidad()
    this.fetchUserName()
    this.obtenerPacientes()

    const total = localStorage.getItem('total') || 0
    this.totalAmount = parseFloat(total).toFixed(2)

    const medicamentosEnviados = localStorage.getItem('medicamentosEnviados')
    if (medicamentosEnviados) {
      this.medications = JSON.parse(medicamentosEnviados)
    }

    const enfermedadData = localStorage.getItem('enfermedadPaciente')
    if (enfermedadData) {
      this.enfermedadPaciente = JSON.parse(enfermedadData)
    }
  },
  methods: {
    fetchUserEspecialidad () {
      const especialidad = localStorage.getItem('userEspecialidad')
      this.userEspecialidad = especialidad || 'No disponible'
    },
    fetchUserName () {
      const nombre = localStorage.getItem('userName')
      this.userNombre = nombre || 'No disponible'
    },
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
    goToSchedule (paciente) {
      localStorage.setItem('pacienteSeleccionado', JSON.stringify(paciente))
      this.$router.push('/dashboard/schedule')
    },
    borrarDatosPaciente () {
      const pacienteSeleccionado = JSON.parse(localStorage.getItem('pacienteSeleccionado'))
      const pacientes = JSON.parse(localStorage.getItem('pacientes')) || []

      const pacientesActualizados = pacientes.filter(p => p.id !== pacienteSeleccionado.id)
      localStorage.setItem('pacientes', JSON.stringify(pacientesActualizados))

      localStorage.removeItem('pacienteSeleccionado')
      localStorage.removeItem('medicamentosEnviados')
      localStorage.removeItem('total')
      localStorage.removeItem('carrito')
      localStorage.removeItem('enfermedadPaciente')
      this.medications = []
      this.enfermedadPaciente = {}
      this.totalAmount = 0

      this.$axios.delete(`/patients/${pacienteSeleccionado.id}`).then(() => {
        // eslint-disable-next-line no-console
        console.log('Paciente eliminado del backend')
        this.obtenerPacientes()
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error al eliminar paciente del backend:', error)
      })
    },
    actualizarPacientes (idEliminado) {
      this.pacientes = this.pacientes.filter(paciente => paciente.id !== idEliminado)
    }
  }
}
</script>

<style scoped>
.bg-rose-50 {
  background-color: #fff4ec;
}

.pa-4 {
  padding: 16px;
}

.mb-4 {
  margin-bottom: 16px;
}

.mx-2 {
  margin-left: 8px;
  margin-right: 8px;
}

.mr-4 {
  margin-right: 16px;
}

.patient-item {
  cursor: pointer;
}

.appointment-list {
  height: 400px;
  max-height: 280px;
  overflow-y: auto;
}

.medication-list {
  height: 455px;
  max-height: 344px;
  overflow-y: auto;
}

.current-condition-card {
  height: 455px;
}
</style>
