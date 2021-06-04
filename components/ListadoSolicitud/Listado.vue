<template>
    <div>
    <v-data-table v-if="lista !== null"
        :headers="headers"
        :items="lista"
        :items-per-page="5"
        class="elevation-1"
    >
      <template v-slot:item.fechaSolicitud="{ item }"> 
        <span v-text="formatDateNoUTC(item.fechaSolicitud).format + ' ' + formatDateNoUTC(item.fechaSolicitud).hour" />
      </template>
      <template v-slot:item.detalle="{ item }">
        <v-tooltip v-if="item.detalle !== null && item.detalle.length > 40" bottom>
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
              v-text="item.detalle.substr(0,40)"
            />
          </template>
          <span v-text="item.detalle" />
        </v-tooltip>
        <span v-if="item.detalle !== null && item.detalle.length < 40" v-text="item.detalle" />
      </template>
      <template v-slot:item.adjunto1="{ item }">
        <v-tooltip v-if="item.adjunto1 !== null" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            fab
            small
            v-on="on"
            v-bind="attrs"
            @click="$emit('descarga', item.adjunto1)"
            >
              <v-icon small>
                mdi-paperclip
              </v-icon>
            </v-btn>
          </template>
          <span>{{ item.adjunto1 }}</span>
        </v-tooltip>
        <v-tooltip v-if="item.adjunto2 !== null" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            fab
            small
            v-on="on"
            v-bind="attrs"
            @click="$emit('descarga', item.adjunto2)"
            >
              <v-icon small>
                mdi-paperclip
              </v-icon>
            </v-btn>
          </template>
          <span>{{ item.adjunto2 }}</span>
        </v-tooltip>
        <v-tooltip v-if="item.adjunto3 !== null" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            fab
            small
            v-on="on"
            v-bind="attrs"
            @click="$emit('descarga', item.adjunto3)"
            >
              <v-icon small>
                mdi-paperclip
              </v-icon>
            </v-btn>
          </template>
          <span>{{ item.adjunto3 }}</span>
        </v-tooltip>
      </template>
    </v-data-table>
    </div>
</template>
<script>
  export default {
      name: 'Listado',
    search: '',
    props: {
        lista: {
            default: () => [],
            type: Array
        }
    },
    // this.$emit('eventChangeEvent', date)
    data () {
      return {
        headers: [
          { text: 'Numero', align: 'start', sortable: false, value: 'numero'},
          { text: 'Usuario', value: 'userName' },
          { text: 'Detalle', value: 'detalle' },
          { text: 'Fecha Solicitud', value: 'fechaSolicitud' },
          { text: 'Estado', value: 'estado' },
          { text: 'Adjuntos', value: 'adjunto1' },
        ],
      }
    },
  }
</script>
