<template>
  <div>
    <h3 class="">Hello There!</h3>
    <a href="#" class="" @click.prevent="addSession">Add new session</a>
    <div v-for="item in sessions">
      {{ item.id }} - {{ item.config.interval }}
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    methods: {
      ...mapActions({
        'startSession': 'session/startNewSession'
      }),
      addSession () {
        this.startSession({
          interval: 42
        })
      }
    },
    computed: {
      ...mapGetters({
        'sessions': 'session/items'
      })
    }

  }
</script>

<style>

</style>
