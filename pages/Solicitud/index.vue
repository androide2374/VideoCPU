<template>
  <v-card class="mx-auto" elevation="2">
    <v-card-title>
      <v-row>
        <v-col cols="12" md="12">
          <v-btn large elevation="2" color="primary" to="/Solicitud/Create">Nueva Solicitud</v-btn>
        </v-col>
        <v-col cols="12" sm="3" md="3">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="fechaDesde"
              label="Fecha Desde"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="fechaDesde"
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="fechaHasta"
                label="Fecha Hasta"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fechaHasta"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="3">
          <v-btn color="secondary" @click="getListado"> Consultar </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <Alert v-if="errorLista" :tipo="info" :message="errorlistado" />
      <Listado :lista="listado" @descarga="(filename) => getArchivo(filename)" v-if="listado !== null && listado.length > 0" />
    </v-card-text>
  </v-card>
</template>

<script>
import Listado from "~/components/ListadoSolicitud/Listado";
import Alert from '~/components/alert/alert.vue';
export default {
  components: {
    Alert,
    Listado
  },
  data() {
    return {
      fechaDesde: null,
      fechaHasta: null,
      user: 5,
      menu: false,
      modal: false,
      menu2: false,
      listado: [],
      errorlistado: '',
      errorLista:false
    };
  },
  meta: {
      breadcrumb: [{
                text: 'Solicitud',
                to: '/inicio',
                exact: true,
                disabled: true
            },
            {
                text: 'Listado',
                to: '/Operaciones/AnularOperacion',
                exact: true,
                disabled: true
            }
        ]
    }, 
  mounted() {
    debugger
    this.getListado()
  },
  methods: {
    async getArchivo(filename) {
      const _this = this
      await _this
        .$axios({
          method: "GET",
          url: `https://localhost:5001/api/Solicitud/ObtenerArchivo?filename=${filename}`,
          responseType: 'blob'
        })
        .then((response) => {
          debugger
          const url = window.URL.createObjectURL(new Blob([response.data], {
            type: response.headers['content-type']
          }))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', response.headers.filename)
          document.body.appendChild(link)
          link.click()
        })
    },
    async getListado() {
      const _this = this;
      _this.listado = []
      await _this
        .$axios({
          method: "POST",
          url: `https://localhost:5001/api/Solicitud/ObtenerSolicitudes`,
          data: {
            idUser: 5,
            fechaDesde: _this.fechaDesde,
            fechaHasta: _this.fechaHasta,
          },
        })
        .then((response) => {
          debugger
          if(response.data !== null && response.data.length > 0)
          {
            console.log(response.data)
            _this.listado = response.data
            _this.errorLista = false
          } else {
            _this.errorLista = true
            _this.errorlistado = 'No hay registros'
          }
        })
    }
  },
};
</script>
