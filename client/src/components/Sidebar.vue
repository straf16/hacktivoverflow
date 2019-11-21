<template>
  <b-menu>
      <b-menu-list>
          <b-menu-item
              label="My Questions"
              tag="router-link"
              to="/my-questions">
          </b-menu-item>
      </b-menu-list>
      <b-menu-list label="PUBLIC">
          <b-menu-item
            icon="earth"
            label="H8 overflow"
            tag="router-link"
            to="/">
          </b-menu-item>
          <b-menu-item label="Tags"></b-menu-item>
          <b-menu-item label="Users"></b-menu-item>
          <b-menu-item label="Jobs"></b-menu-item>
      </b-menu-list>
  </b-menu>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>
.menu {
  margin-top: 30px;
  padding: 5px;
  padding-left: 40px;
  overflow: hidden;
  font-size: 13px;
}
</style>
