<template>
  <div class="home">
    <div class="columns" style="overflow: hidden;">
      <div class="column is-2" style="border-right: 1px #D6D9DC solid; height: 93vh;">
        <Sidebar />
      </div>
      <div class="column" style="height: 90vh; overflow: auto; padding-right: 15vw;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'home',
  components: {
    Sidebar
  },
  computed: {
    questions () {
      return this.$store.state.questions
    }
  }
}
</script>
