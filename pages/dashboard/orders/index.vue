<template>
  <div>
    Aqui van las cards de los medicamentos
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

      ]
    }
  },
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  mounted () {

  },
  methods: {

  }
}

</script>
