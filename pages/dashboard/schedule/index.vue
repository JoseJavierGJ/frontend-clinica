<template>
  <v-col cols="12">
    <v-row>
      <v-btn block color="#123CCC" @click="showDialog = true">
        <span style="text-transform: none; color: white">
          Usuario Nuevos
        </span>
      </v-btn>
    </v-row>
    <v-row>
      <v-data-table
        :headers="headers"
        :items="usuarios"
      >
        <template #[`item.email`]="{item}">
          <span style="font-weight: 800;">
            {{ item.email }}
          </span>
        </template>
        <template #[`item.acciones`]="{item}">
          <v-row>
            <v-col cols="6">
              <v-btn icon color="red" @click="deleteUser(item)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn icon color="warning" @click="updateUser(item)">
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-row>
    <v-dialog
      v-model="showDialog"
      persistent
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>Agregar Usuarios</v-card-title>
        <v-card-text>
          <v-row width="100%">
            <v-text-field
              v-model="nombre"
              class="pa-2 ma-2"
              label="Nombre"
              placeholder="Escribe el nombre"
              outlined
            />
          </v-row><v-row width="100%">
            <v-text-field
              v-model="apaterno"
              class="pa-2 ma-2"
              label="Apellido paterno"
              placeholder="Escribe el apellido paterno"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="amaterno"
              class="pa-2 ma-2"
              label="Apellido materno"
              placeholder="Escribe el apellido materno"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="especialidad"
              class="pa-2 ma-2"
              label="Epecialidad"
              placeholder="Escribe la especialidad"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="telefono"
              class="pa-2 ma-2"
              label="Telefono"
              placeholder="Escribe el telefono"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="email"
              class="pa-2 ma-2"
              label="Correo"
              placeholder="Escribre tu Password"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="password"
              class="pa-2 ma-2"
              label="Password"
              placeholder="Escribre tu Password"
              outlined
              type="password"
            />
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-col cols="6">
            <v-btn block color="green" @click="registrarUsuario">
              <span style="text-transform: none; color: white;">
                Registrar
              </span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="red" @click="showDialog = false">
              <span style="text-transform: none; color: white;">
                Cancelar
              </span>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDelete" width="300" persistent>
      <v-card>
        <v-card-title>Delete User</v-card-title>
        <v-card-text>Are you sure?</v-card-text>
        <v-card-actions>
          <v-col cols="6">
            <v-btn block color="green" @click="borrarUsuario">
              <span style="text-transform: none; color: white;">Borrar</span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="red" @click="showDelete=false">
              <span style="text-transform: none; color: white;">Cancelar</span>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showUpdate"
      persistent
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>Actualizar Usuario</v-card-title>
        <v-card-text>
          <v-row width="100%">
            <v-text-field
              v-model="userToUpdate.nombre"
              class="pa-2 ma-2"
              label="Nombre"
              placeholder="Escribe el nombre"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="userToUpdate.apaterno"
              class="pa-2 ma-2"
              label="Apellido paterno"
              placeholder="Escribe el apellido paterno"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="userToUpdate.amaterno"
              class="pa-2 ma-2"
              label="Apellido materno"
              placeholder="Escribe el apellido materno"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="userToUpdate.especialidad"
              class="pa-2 ma-2"
              label="Epecialidad"
              placeholder="Escribe la especialidad"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="userToUpdate.telefono"
              class="pa-2 ma-2"
              label="Telefono"
              placeholder="Escribe el telefono"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="userToUpdate.email"
              class="pa-2 ma-2"
              label="Correo"
              placeholder="Escribre tu Password"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="userToUpdate.password"
              class="pa-2 ma-2"
              label="Password"
              placeholder="Escribre tu Password"
              outlined
              type="password"
            />
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-col cols="6">
            <v-btn block color="green" @click="actualizarUsuario">
              <span style="text-transform: none; color: white;">
                Actualizar
              </span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="red" @click="showUpdate = false">
              <span style="text-transform: none; color: white;">
                Cancelar
              </span>
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
      usuarios: [],
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
          text: 'Email',
          value: 'email',
          align: 'center',
          sortable: true
        },
        // {
        //   text: 'Password',
        //   value: 'password',
        //   align: 'center',
        //   sortable: true
        // },
        {
          text: 'Epecialidad',
          value: 'especialidad',
          align: 'center',
          sortable: true
        },
        {
          text: 'Telefono',
          value: 'telefono',
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
      email: null,
      password: null,
      userToDelete: null,
      showDelete: false,
      nombre: null,
      apaterno: null,
      amaterno: null,
      especialidad: null,
      telefono: null,
      userToUpdate: {},
      showUpdate: false
    }
  },
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  mounted () {
    this.obtenerUsuarios()
  },
  methods: {
    obtenerUsuarios () {
      const url = '/get-all-users'
      this.$axios.get(url)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log('response => ', res)
          if (res.data.message === 'success') {
            this.usuarios = res.data.users
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('error => ', error)
        })
    },
    registrarUsuario () {
      const url = '/register'
      const data = {
        email: this.email,
        password: this.password,
        nombre: this.nombre,
        apaterno: this.apaterno,
        amaterno: this.amaterno,
        especialidad: this.especialidad,
        telefono: this.telefono
      }
      this.$axios.post(url, data)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log('@@ res => ', res)
          if (res.data.message === 'User registered successfully') {
            this.showDialog = false
            this.obtenerUsuarios()
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('@@ error => ', error)
        })
    },
    borrarUsuario () {
      const url = `/users/${this.userToDelete.email}`
      // eslint-disable-next-line no-console
      console.log('@@@ url => ', url)
      this.$axios.delete(url)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log('@@ res => , res')
          if (res.status === 204) {
            this.showDelete = false
            this.obtenerUsuarios()
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('@@ err => ', err)
        })
    },
    deleteUser (user) {
      this.userToDelete = user
      this.showDelete = true
      // eslint-disable-next-line no-console
      console.log('@@@ user => ', this.userToDelete)
    },
    updateUser (user) {
      this.userToUpdate = user
      this.showUpdate = true
    },
    actualizarUsuario () {
      const url = `/users/${this.userToUpdate.email}`
      // eslint-disable-next-line no-console
      console.log('@@@ url => ', url)
      this.$axios.put(url, this.userToUpdate)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log('@@@ res => , res')
          if (res.data.message === 'success') {
            this.showUpdate = false
            this.obtenerUsuarios()
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('@@ err => ', err)
        })
    }
  }
}
</script>
