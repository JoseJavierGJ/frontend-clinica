<template>
  <v-container>
    <v-card v-if="paciente" class="pa-3 custom-card mb-4">
      <v-card-title>{{ paciente.nombre }}</v-card-title>
      <v-card-text>
        <div>
          <strong>Age:</strong> {{ paciente.edad }} years<br>
          <strong>Sex:</strong> {{ paciente.sexo }}<br>
          <strong>Phone Number:</strong> {{ paciente.telefono }}<br>
          <strong>E-mail:</strong> {{ paciente.email }}<br>
          <strong>Address:</strong> {{ paciente.direccion }}<br>
        </div>
      </v-card-text>
    </v-card>

    <v-card v-if="!enfermedadEnviada" class="pa-3 mb-4 enfermedad-card">
      <v-card-title>Patient's Disease</v-card-title>
      <v-card-text>
        <v-form ref="enfermedadForm" v-model="valid" lazy-validation>
          <v-text-field
            v-model="enfermedadPaciente.enfermedad"
            label="Disease"
            outlined
            class="mb-4"
            :rules="[v => !!v || 'Disease is required']"
          />
          <v-textarea
            v-model="enfermedadPaciente.descripcionEnfermedad"
            label="Disease Description"
            outlined
            height="40px"
            :rules="[v => !!v || 'Description is required']"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="blue" text @click="enviarEnfermedad">
          Submit Disease
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-if="enfermedadEnviada" class="pa-3 mb-4 enfermedad-card">
      <v-card-title>Patient's Disease</v-card-title>
      <v-card-text>
        <div>
          <strong>Disease:</strong> {{ enfermedadPaciente.enfermedad }}<br>
          <strong>Description:</strong> {{ enfermedadPaciente.descripcionEnfermedad }}
        </div>
      </v-card-text>
    </v-card>

    <!-- Display medicines in cards -->
    <v-row>
      <v-col v-for="(medicina, index) in medicinas" :key="index" cols="12">
        <v-card class="pa-3 mb-4 medicina-card">
          <v-card-title>{{ medicina.nombre }}</v-card-title>
          <v-card-subtitle>{{ medicina.descripcion }}</v-card-subtitle>
          <v-card-text>
            <strong>Hours:</strong> Every {{ medicina.duracion }} hours<br>
            <div class="d-flex align-center">
              <strong>Days:</strong>
              <v-form ref="medicinaForm" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="medicina.dias"
                  type="number"
                  label=""
                  min="1"
                  outlined
                  dense
                  class="small-input"
                  :rules="[v => !!v || 'Days are required', v => /^\d+$/.test(v) || 'Days must be a number']"
                  style="width: 100px; margin-left: 8px;"
                />
              </v-form>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="blue" text @click="enviarMedicamento(index)">
              Submit
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
      enfermedadEnviada: false,
      valid: false
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
      if (this.$refs.enfermedadForm.validate()) {
        localStorage.setItem('enfermedadPaciente', JSON.stringify(this.enfermedadPaciente))
        this.enfermedadEnviada = true
      }
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
  width: 100px;
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
