<template>
  <v-col cols="12">
    <!-- Botón para añadir un nuevo paciente -->
    <v-row>
      <v-btn block color="#123CCC" @click="showDialog = true">
        <span style="text-transform: none; color: white">
          Paciente Nuevo
        </span>
      </v-btn>
    </v-row>

    <!-- Tabla de datos de los pacientes -->
    <v-row>
      <v-data-table
        :headers="headers"
        :items="pacientes"
      >
        <template #[`item.acciones`]="{ item }">
          <v-row>
            <v-col cols="6">
              <v-btn icon color="red" @click="prepareToDelete(item)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn icon color="warning" @click="updatePatient(item)">
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-row>

    <!-- Diálogo para agregar nuevo paciente -->
    <v-dialog v-model="showDialog" persistent width="500" transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>Agregar Paciente</v-card-title>
        <v-card-text>
          <v-row v-row width="100%">
            <v-text-field
              v-model="nombre"
              label="Nombre"
              placeholder="Escribe el nombre"
              outlined
            />
          </v-row><v-row width="100%">
            <v-text-field
              v-model="apaterno"
              label="Apellido paterno"
              placeholder="Escribe el apellido paterno"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="amaterno"
              label="Apellido materno"
              placeholder="Escribe el apellido materno"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="fechaNacimiento"
              label="Fecha de Nacimiento"
              placeholder="Escribe la fecha de nacimiento"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="telefono"
              label="Teléfono"
              placeholder="Escribe el teléfono"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="historialMedico"
              label="Historial Médico"
              placeholder="Describe el historial médico"
              outlined
              multiline
            />
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-col cols="6">
            <v-btn block color="green" @click="registrarPaciente">
              <span style="text-transform: none; color: white;">Registrar</span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="red" @click="showDialog = false">
              <span style="text-transform: none; color: white;">Cancelar</span>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo para actualizar paciente -->
    <v-dialog v-model="showUpdate" persistent width="500" transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>Actualizar Paciente</v-card-title>
        <v-card-text>
          <v-row>
            <v-text-field v-model="patientToUpdate.nombre" label="Nombre" placeholder="Escribe el nombre" outlined />
          </v-row>
          <v-row>
            <v-text-field v-model="patientToUpdate.apaterno" label="Apellido Paterno" placeholder="Escribe el apellido paterno" outlined />
          </v-row>
          <v-row>
            <v-text-field v-model="patientToUpdate.amaterno" label="Apellido Materno" placeholder="Escribe el apellido materno" outlined />
          </v-row>
          <v-row>
            <v-text-field v-model="patientToUpdate.fechaNacimiento" label="Fecha de Nacimiento" placeholder="Escribe la fecha de nacimiento" outlined />
          </v-row>
          <v-row>
            <v-text-field v-model="patientToUpdate.telefono" label="Teléfono" placeholder="Escribe el teléfono" outlined />
          </v-row>
          <v-row>
            <v-text-field v-model="patientToUpdate.historialMedico" label="Historial Médico" placeholder="Describe el historial médico" outlined multiline />
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-col cols="6">
            <v-btn block color="green" @click="actualizarPaciente">
              <span style="text-transform: none; color: white;">Actualizar</span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="red" @click="showUpdate = false">
              <span style="text-transform: none; color: white;">Cancelar</span>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo para confirmación de eliminación -->
    <v-dialog v-model="showDelete" width="300" persistent>
      <v-card>
        <v-card-title>Eliminar Paciente</v-card-title>
        <v-card-text>¿Estás seguro?</v-card-text>
        <v-card-actions>
          <v-col cols="6">
            <v-btn block color="green" @click="deletePatient">
              <span style="text-transform: none; color: white;">Borrar</span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="red" @click="showDelete = false">
              <span style="text-transform: none; color: white;">Cancelar</span>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
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
          text: 'Apellido paterno',
          value: 'apaterno',
          align: 'center',
          sortable: true
        },
        {
          text: 'Apellido materno',
          value: 'amaterno',
          align: 'center',
          sortable: true
        },
        {
          text: 'Fecha de Nacimiento',
          value: 'fechaNacimiento',
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
          text: 'Historial Médico',
          value: 'historialMedico',
          align: 'center',
          sortable: false
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
      apaterno: null,
      amaterno: null,
      fechaNacimiento: null,
      telefono: null,
      historialMedico: null,
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
        apaterno: this.apaterno,
        amaterno: this.amaterno,
        fechaNacimiento: this.fechaNacimiento,
        telefono: this.telefono,
        historialMedico: this.historialMedico
      }
      this.$axios.post(url, data)
        .then((res) => {
          if (res.data.message === 'Patient registered successfully') {
            this.showDialog = false
            this.obtenerPacientes()
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error al registrar paciente:', error)
        })
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
    deletePatient () {
      if (!this.patientToDelete) { return }
      const url = `/patients/${this.patientToDelete.id}`
      this.$axios.delete(url)
        .then(() => {
          this.showDelete = false
          this.obtenerPacientes() // Refrescar la lista después de eliminar
        })
        .catch((error) => {
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
