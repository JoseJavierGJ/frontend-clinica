<template>
  <v-card rounded color="#EC9143" class="pa-7" style="height: 70%!important; margin-right: 40px; overflow-y: hidden">
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
          :rules="[v => !!v || 'Email is required']"
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
          :rules="[v => !!v || 'Password is required']"
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
      max-width="600"
      transition="dialog-bottom-transition"
    >
      <v-card color="#fff4ec">
        <v-card-title>Add User</v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-col cols="12" class="text-left">
                <span style="color: red; font-size: 12px;">Required fields *</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="emailNuevo"
                  class="pa-2"
                  label="Email *"
                  placeholder="Enter email"
                  outlined
                  rounded
                  :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Must be a valid email']"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="passwordNuevo"
                  :type="showPasswordNuevo ? 'text' : 'password'"
                  class="pa-2"
                  label="Password *"
                  placeholder="Enter password"
                  outlined
                  rounded
                  append-icon="mdi-eye"
                  :rules="[v => !!v || 'Password is required']"
                  @click:append="toggleNuevoPasswordVisibility"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="nombre"
                  class="pa-2"
                  label="First Name *"
                  placeholder="Enter first name"
                  outlined
                  rounded
                  :rules="[v => !!v || 'First name is required']"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="apaterno"
                  class="pa-2"
                  label="Last Name *"
                  placeholder="Enter last name"
                  outlined
                  rounded
                  :rules="[v => !!v || 'Last name is required']"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="amaterno"
                  class="pa-2"
                  label="Middle Name"
                  placeholder="Enter middle name"
                  outlined
                  rounded
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="especialidad"
                  :items="especialidades"
                  class="pa-2"
                  label="Specialty *"
                  placeholder="Select specialty"
                  outlined
                  rounded
                  :rules="[v => !!v || 'Specialty is required']"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="telefono"
                  class="pa-2"
                  label="Phone *"
                  placeholder="Enter phone"
                  outlined
                  rounded
                  :rules="[v => !!v || 'Phone is required', v => /^\d{3}-\d{3}-\d{4}$/.test(v) || 'Must be in the format XXX-XXX-XXXX']"
                  @input="formatPhone"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-col cols="6">
            <v-btn block color="red" @click="cancelarRegistro">
              <span style="text-transform: none; color: white;">
                Cancel
              </span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="green" @click="registrarUsuario">
              <span style="text-transform: none; color: white;">
                Register
              </span>
            </v-btn>
          </v-col>
        </v-card-actions>
        <v-alert v-if="alertMessage" type="error" dismissible @input="alertMessage = ''">
          {{ alertMessage }}
        </v-alert>
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
      showPasswordNuevo: false,
      errorMessage: '',
      alertMessage: '',
      especialidades: [
        'Cardiology',
        'Dermatology',
        'Emergency Medicine',
        'Family Medicine',
        'Gastroenterology',
        'Hematology',
        'Internal Medicine',
        'Neurology',
        'Obstetrics and Gynecology',
        'Oncology',
        'Orthopedics',
        'Pediatrics',
        'Psychiatry',
        'Radiology',
        'Surgery',
        'Anesthesiology',
        'Pathology',
        'Ophthalmology',
        'Urology',
        'Rheumatology',
        'Nephrology',
        'Endocrinology',
        'Pulmonology',
        'Infectious Disease',
        'Plastic Surgery'
      ]
    }
  },
  methods: {
    togglePasswordVisibility () {
      this.showPassword = !this.showPassword
    },
    toggleNuevoPasswordVisibility () {
      this.showPasswordNuevo = !this.showPasswordNuevo
    },
    async login () {
      this.errorMessage = ''
      if (!this.email || !this.password) {
        this.errorMessage = 'Please enter email and password'
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
          localStorage.setItem('userApaterno', result.userApaterno) // Almacena apaterno
          localStorage.setItem('userSpecialty', result.userEspecialidad)
          this.$router.push('/dashboard/home')
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errorMessage = 'Email not found'
        } else if (err.response && err.response.status === 401) {
          this.errorMessage = 'Invalid credentials'
        } else {
          this.errorMessage = 'Server error. Please try again later.'
        }
      }
    },
    registrarUsuario () {
      const form = this.$refs.form
      if (form && form.validate()) {
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
              this.alertMessage = ''
              this.clearForm()
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log('@@ error => ', error)
          })
      } else {
        this.alertMessage = 'All required fields must be filled'
      }
    },
    cancelarRegistro () {
      this.showDialog = false
      this.clearForm()
    },
    clearForm () {
      this.emailNuevo = null
      this.passwordNuevo = null
      this.nombre = null
      this.apaterno = null
      this.amaterno = null
      this.especialidad = null
      this.telefono = null
      if (this.$refs.form) {
        this.$refs.form.resetValidation()
      }
    },
    formatPhone () {
      let numbers = this.telefono.replace(/\D/g, '')
      if (numbers.length > 10) {
        numbers = numbers.slice(0, 10)
      }
      const char = { 3: '-', 6: '-' }
      this.telefono = numbers.split('').map((num, idx) => char[idx] ? char[idx] + num : num).join('')
    }
  }
}
</script>

<style scoped>
.rowCard {
  width: 100%;
  display: flex;
  justify-content: center;
}
.rowCard2 {
  width: 100%;
  display: flex;
  justify-content: end;
  padding-bottom: 20px;
}
.rowCard3 {
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
  overflow-y: hidden;
}

.v-application .rounded {
  border-radius: 30px !important;
}

.v-text-field input {
  border-radius: 15px !important;
}
</style>
