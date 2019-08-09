<template>
  <div>
    <div v-if="activeSession">
      <h4>Session Running</h4>
      Session ID: {{ activeSession.id }}
    </div>
    <h3 class="">Hello There!</h3>
    <a href="#" class="" @click.prevent="addSession">Add new session</a>
    <div v-for="item in sessions">
      {{ item.id }} - {{ item.config.interval }} - {{ item.config.status }}
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
          interval: 3
        })
      }
    },
    computed: {
      ...mapGetters({
        'sessions': 'session/items',
        'activeSession': 'session/runningSession'
      })
    }

  }
</script>

<style>

</style>
