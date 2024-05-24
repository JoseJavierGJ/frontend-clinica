<template>
  <v-card rounded color="#EC9143" class="pa-7" style="height: 70%!important; margin-right: 40px;">
    <v-card-title>
      <v-row class="rowCard fontTitle">
        Welcome
      </v-row>
      <v-row class="rowCard2 fontTitle">
        Back
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-text-field
          v-model="email"
          rounded
          label="E-Mail"
          outlined
          :rules="[v => !!v || 'Email es requerido']"
        />
      </v-row>
      <v-row>
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          rounded
          label="Password"
          outlined
          append-icon="mdi-eye"
          :rules="[v => !!v || 'Contraseña es requerida']"
          @click:append="togglePasswordVisibility"
        />
      </v-row>
      <v-alert v-if="errorMessage" type="error" dismissible @input="errorMessage = ''">
        {{ errorMessage }}
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-col cols="12">
        <v-row>
          <v-btn block class="pa-2" color="#134700" @click="login">
            <span style="text-transform: none; color: white;">Log-in</span>
          </v-btn>
        </v-row>
        <v-row>
          <v-spacer />
          <span class="rowCard3">
            If You Don't Have Account
            &nbsp; <!-- Espacio en blanco -->
            <a @click="showDialog = true">Sign Up</a>
          </span>
        </v-row>
      </v-col>
    </v-card-actions>
    <v-dialog
      v-model="showDialog"
      persistent
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>Agregar Usuario</v-card-title>
        <v-card-text>
          <v-row width="100%">
            <v-text-field
              v-model="emailNuevo"
              class="pa-2 ma-2"
              label="Correo"
              placeholder="Escribe el correo"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="passwordNuevo"
              class="pa-2 ma-2"
              label="Password"
              placeholder="Escribe la contraseña"
              outlined
              type="password"
            />
          </v-row>
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
              label="Especialidad"
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
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      email: null,
      password: null,
      showDialog: null,
      emailNuevo: null,
      passwordNuevo: null,
      nombre: null,
      apaterno: null,
      amaterno: null,
      especialidad: null,
      telefono: null,
      showPassword: false,
      errorMessage: ''
    }
  },
  methods: {
    togglePasswordVisibility () {
      this.showPassword = !this.showPassword
    },
    async login () {
      this.errorMessage = ''
      if (!this.email || !this.password) {
        this.errorMessage = 'Por favor, ingrese el correo y la contraseña'
        return
      }

      const sendData = {
        email: this.email,
        password: this.password
      }
      try {
        const res = await this.$auth.loginWith('local', { data: sendData })
        const result = res.data
        if (result.message === 'success') {
          localStorage.setItem('userEmail', this.email)
          localStorage.setItem('userName', result.userNombre)
          localStorage.setItem('userEspecialidad', result.userEspecialid)
          this.$router.push('/dashboard/home')
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errorMessage = 'Correo no encontrado'
        } else if (err.response && err.response.status === 401) {
          this.errorMessage = 'Credenciales inválidas'
        } else {
          this.errorMessage = 'Error en el servidor. Por favor, inténtelo de nuevo más tarde.'
        }
      }
    },
    registrarUsuario () {
      const url = '/register'
      const data = {
        email: this.emailNuevo,
        password: this.passwordNuevo,
        nombre: this.nombre,
        apaterno: this.apaterno,
        amaterno: this.amaterno,
        especialidad: this.especialidad,
        telefono: this.telefono
      }
      this.$axios.post(url, data)
        .then((res) => {
          if (res.data.message === 'User registered successfully') {
            this.showDialog = false
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('@@ error => ', error)
        })
    }
  }
}
</script>

<style scoped>

.rowCard{
  width: 100%;
  display: flex;
  justify-content: center;
}
.rowCard2{
  width: 100%;
  display: flex;
  justify-content: end;
  padding-bottom: 20px;
}
.rowCard3{
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.fontTitle {
  font-size: 52px!important;
  line-height: 78px!important;
}
html {
    /* height: 100%; */
    overflow: hidden;
}

.v-application .rounded {
    border-radius: 30px !important;
}

</style>
