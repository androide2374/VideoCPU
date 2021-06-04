<template>
  <v-card class="mx-auto" elevation="2">
    <v-container>
      <v-col class="col-12">
        <h2 class="v-label theme--light">Nueva solicitud de video</h2>
      </v-col>
      <v-row class="container">
        <v-col cols="12" md="3">
          <v-text-field
            label="Nro IPP"
            placeholder="Nro IPP"
            v-model="solicitud.nroipp"
            :rules="[rules.required]"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea
            name="input-7-1"
            label="Detalle"
            value=""
            :rules="[rules.required]"
            v-model="solicitud.detalle"
            :hint="solicitud.detalle.length.toString()"
          ></v-textarea>
        </v-col>
        <v-row class="container">
          <v-col cols="12" md="3">
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
                  v-model="solicitud.desde"
                  label="Fecha Desde"
                  :rules="[rules.required]"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="solicitud.desde"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="3">
            <v-menu
              v-model="menu3"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="solicitud.hasta"
                  label="Fecha Hasta"
                  :rules="[rules.required]"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="solicitud.hasta"
                @input="menu3 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="2  ">
            <v-checkbox
              v-model="solicitud.materialReiterado"
              :label="`Materian Reiterado`"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row class="container">
          <v-col cols="12" md="12">
            <!-- <v-file-input
              v-model="currFiles"
              rounded
              outlined
              accept="application/pdf, text/plain"
              label="Adjuntar Documentacion"
              multiple
              style="height:15px"
              @change="value => $emit('SetAttachments', value)"
            >
            </v-file-input> -->
            <label class="v-label theme--light">
              <input
                type="file"
                multiple
                accept="text/plain, application/pdf"
                @change="(value) => addFiles(value)"
              />
              <br />
              Adjuntar Documentación
              <v-icon>mdi-paperclip</v-icon>
            </label>
          </v-col>
          <v-col cols="12">
            <p class="v-label theme--light">Archivos adjuntos</p>
            <v-chip
              v-for="(item, index) in attachments"
              :key="index"
              close
              @click:close="borrarArchivo(index, text)"
            >
              {{
                item.name.split(".")[0].substring(0, 10) +
                "..." +
                item.name.slice(((item.name.lastIndexOf(".") - 1) >>> 0) + 2)
              }}
            </v-chip>
            <p v-if="validateFiles.isvalid">{{ sumArchivos }}</p>
            <p :style="'color: ' + validateFiles.color">
              {{ validateFiles.message }}
            </p>
          </v-col>
        </v-row>
        <v-row class="container" style="align-content: center; justify-content: flex-end">
          <v-col cols="12" md="2">
            <v-btn large elevation="2" color="primary" @click="enviarSolicitud"
              >Enviar Solicitud</v-btn
            >
          </v-col>
          <v-col cols="12" md="2">
            <v-btn large elevation="2" color="secondary" to="/Solicitud/Create"
              >Cancelar</v-btn
            >
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
function getData() {
  return {
    user: 5,
    menu: false,
    menu2: false,
    menu3: false,
    solicitud: {
      numero: 0,
      fechaSolicitud: '',
      // cambiar por state usuario
      userId: 5,
      nroIpp: '',
      detalle: '',
      desde: '',
      hasta: '',
      materialReiterado: true,
      adjunto1: '',
      adjunto2: '',
      adjunto3: '',
      idEstado: 0,
      nroExpediente: 0,
    },
    attachments: [],
    currFiles: [],
    rules: {
      required: val =>
        (val != null && val.toString() !== '') || 'Campo Requerido.',
      minValue: (val) => {
          if (val != null && val.toString() !== '') {
            if (!parseFloat(val.replaceAll('$ ', '').replaceAll(',', '.').replaceAll('.', '')) > 0) {
                return 'Valor no puede ser menor o igual a 0.'
              }
          }
      },
      isMonth: val => (val <= 12 && val >= 0) || 'Mes invalido',
      isYear: val => (val >= 2000 && val <= 9999) || val === 0 || 'Año invalido',
      fileSize: (val) => {
          if (val) {
            let sum = 0
            val.forEach((element) => {
              sum += element.size
            })
            if (!sum || sum > 3000000) {
              return 'Tamáño total maximo: 3 MB'
            }
          } else {
            return 'Debe adjuntar un archivo'
          }
      }
    }
  }
}
export default {
  data: () => getData(),
  meta: {
    breadcrumb: [
      {
        text: 'Solicitud',
        to: '/inicio',
        exact: true,
        disabled: true,
      },
      {
        text: 'Nueva Solicitud',
        to: '/Operaciones/AnularOperacion',
        exact: true,
        disabled: true,
      },
    ],
  },
  methods: {
    addFiles(files) {
      for (const val of files.target.files) {
        this.attachments.push(val);
      }
      this.currFiles = [];
    },
    borrarArchivo(index, filename) {
      this.attachments.splice(index, 1);
    },
    validateFiles() {
      let peso = 0;
      const file = [];
      if (this.attachments.length > 0) {
        for (const arch of this.attachments) {
          peso = peso + arch.size;
        }
      }
      if (peso === 0) {
        file.message = 'Debe adjuntar un archivo';
        file.color = '#ff0000';
        file.isvalid = false;
      } else if (!peso || peso > 3000000) {
        file.message = 'Tamáño total maximo: 3 MB';
        file.color = '#ff0000';
        file.isvalid = false;
      } else {
        file.message = null;
        file.color = '#28d336';
        file.isvalid = true;
      }
      return file;
    },
    enviarSolicitud() {
      const _this = this;
      const json = JSON.stringify(_this.solicitud)
      const blob = new Blob([json], {type: 'application/json'})
      const formData = new FormData()
      if (_this.attachments !== null && _this.attachments.length > 0) {
        for (let index = 0; index < _this.attachments.length; index++) {
          formData.append('file', _this.attachments[index])
        }
      }
      formData.append('document', blob)
      _this
        .$axios.post(
          `https://localhost:5001/api/Solicitud/CargarSolicitud`,
           formData,
           {
             headers: {
               'Content-Type': 'multipart/form-data'
             }
           }
        )
        .then((response) => {
          console.log(response.data);
        });
    },
  },
};
</script>
