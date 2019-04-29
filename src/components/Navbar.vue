<template>
  <div class="navbar">
    <nav class="nav-extended indigo">
      <div class="nav-content">
        <router-link :to="{ name: 'Index' }">
          <span class="nav-title">Заметки</span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab pink">
          <router-link :to="{ name: 'AddNote' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style>

.navbar nav {
  padding: 0 10%;
}
</style>
