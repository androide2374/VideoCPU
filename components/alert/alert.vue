<template>
     <v-alert
      border="top"
      colored-border
      :type="tipo"
      elevation="2"
    >
      {{ message }}
    </v-alert>
</template>
<script>
export default {
    name:"Alert",
    props: {
        tipo: {
            default: () => 'error',
            type: String
        },
        message: {
            default: () => null,
            type: String
        }
    },
}
</script>