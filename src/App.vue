<template>
  <div id="app" class="main-container" :class="{ darktheme: darkThemeEnabled }">
    <AppHeader
      @show-add-modal="showAppModal"
      @switch-night-mode="switchNightMode"
    />
    <router-view />
    <Modal
      :visible="showAddModal"
      @close-modal="closeModal"
      @createwebsite="addWebsite"
    />
    <AppFooter />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import Modal from "@/components/Modal.vue";
import store from "@/store/index";

@Component({
  components: {
    AppFooter,
    AppHeader,
    Modal
  }
})
export default class App extends Vue {
  showAddModal = false;

  @Prop() private msg!: string;

  public showAppModal() {
    this.showAddModal = true;
  }
  public switchNightMode() {
    store.dispatch("changeTheme");
  }
  public closeModal() {
    this.showAddModal = false;
  }
  public addWebsite(website: object) {
    store.dispatch("addWebsite", website);
  }
  get darkThemeEnabled() {
    return store.getters.darkTheme;
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  background: #fff;
  position: relative;
  transition: all 0.3s ease;
}
#app>*{
  max-width: 1300px;
  margin: auto;
}
body {
  margin: 0;
}
html,
body {
  max-width: 100vw;
  overflow: hidden;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#app.darktheme {
  background: #000;
  color: #6787ff;
}
</style>
