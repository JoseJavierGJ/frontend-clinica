<template>
  <v-container>
    <v-card v-if="paciente" class="pa-3 custom-card mb-4">
      <v-card-title>{{ paciente.nombre }}</v-card-title>
      <v-card-text>
        <div>
          <strong>E-mail:</strong> {{ paciente.email }}<br>
          <strong>Edad:</strong> {{ paciente.edad }} años<br>
          <strong>Sexo:</strong> {{ paciente.sexo }}<br>
          <strong>Teléfono:</strong> {{ paciente.telefono }}<br>
          <strong>Dirección:</strong> {{ paciente.direccion }}<br>
          <strong>Fecha:</strong> {{ paciente.fecha }}
        </div>
      </v-card-text>
    </v-card>

    <v-card v-if="!enfermedadEnviada" class="pa-3 mb-4 enfermedad-card">
      <v-card-title>Enfermedad del Paciente</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="enfermedadPaciente.enfermedad"
          label="Enfermedad"
          outlined
          class="mb-4"
        />
        <v-textarea
          v-model="enfermedadPaciente.descripcionEnfermedad"
          label="Descripción de la enfermedad"
          outlined
        />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="blue" text @click="enviarEnfermedad">
          Enviar Enfermedad
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-if="enfermedadEnviada" class="pa-3 mb-4 enfermedad-card">
      <v-card-title>Enfermedad del Paciente</v-card-title>
      <v-card-text>
        <div>
          <strong>Enfermedad:</strong> {{ enfermedadPaciente.enfermedad }}<br>
          <strong>Descripción:</strong> {{ enfermedadPaciente.descripcionEnfermedad }}
        </div>
      </v-card-text>
    </v-card>

    <!-- Mostrar los medicamentos en tarjetas -->
    <v-row>
      <v-col v-for="(medicina, index) in medicinas" :key="index" cols="12">
        <v-card class="pa-3 mb-4 medicina-card">
          <v-card-title>{{ medicina.nombre }}</v-card-title>
          <v-card-subtitle>{{ medicina.descripcion }}</v-card-subtitle>
          <v-card-text>
            <strong>Horas:</strong> Cada {{ medicina.duracion }}<br>
            <div class="d-flex align-center">
              <strong>Días:</strong>
              <v-text-field
                v-model="medicina.dias"
                type="number"
                label=""
                min="1"
                outlined
                class="small-input"
              />
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="blue" text @click="enviarMedicamento(index)">
              Enviar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      paciente: null,
      medicinas: [],
      enfermedadPaciente: {
        enfermedad: '',
        descripcionEnfermedad: ''
      },
      enfermedadEnviada: false
    }
  },
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  mounted () {
    const pacienteData = localStorage.getItem('pacienteSeleccionado')
    if (pacienteData) {
      this.paciente = JSON.parse(pacienteData)
    }
    const medicinasPorPaciente = JSON.parse(localStorage.getItem('medicamentosPorPaciente')) || {}
    const pacienteId = this.paciente ? this.paciente.id : null
    if (pacienteId && medicinasPorPaciente[pacienteId]) {
      this.medicinas = medicinasPorPaciente[pacienteId]
    }
    const enfermedadData = localStorage.getItem('enfermedadPaciente')
    if (enfermedadData) {
      this.enfermedadPaciente = JSON.parse(enfermedadData)
      this.enfermedadEnviada = true
    }
  },
  methods: {
    enviarMedicamento (index) {
      const medicamento = this.medicinas[index]
      const medicamentosEnviados = JSON.parse(localStorage.getItem('medicamentosEnviados')) || []
      medicamentosEnviados.push(medicamento)
      localStorage.setItem('medicamentosEnviados', JSON.stringify(medicamentosEnviados))
      // Remover el medicamento enviado de la lista actual
      this.medicinas.splice(index, 1)
      const pacienteId = this.paciente ? this.paciente.id : null
      const medicinasPorPaciente = JSON.parse(localStorage.getItem('medicamentosPorPaciente')) || {}
      if (pacienteId) {
        medicinasPorPaciente[pacienteId] = this.medicinas
        localStorage.setItem('medicamentosPorPaciente', JSON.stringify(medicinasPorPaciente))
      }
    },
    enviarEnfermedad () {
      localStorage.setItem('enfermedadPaciente', JSON.stringify(this.enfermedadPaciente))
      this.enfermedadEnviada = true
    }
  }
}
</script>

<style scoped>
.custom-card {
  background-color: #ffdec8;
}

.enfermedad-card {
  background-color: #d9d9d9;
}

.medicina-card {
  background-color: #d9d9d9;
}

.small-input .v-input__control {
  width: 50px;
  margin-left: 8px;
}

.mb-4 {
  margin-bottom: 16px;
}

.d-flex {
  display: flex;
  align-items: center;
}
</style>
