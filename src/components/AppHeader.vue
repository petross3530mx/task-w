<template>
  <header class="header">
    <div class="logo">
      <a href="/">
        <img src="../assets/logo.png" alt="" />
        <p>Word<span>Proof</span></p>
      </a>
    </div>
    <div class="top-menu">
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/content">Content</router-link>
      <router-link to="/settings">Settings</router-link>
      <router-link to="/support">Support</router-link>
    </div>
    <div class="right-from-menu">
      <div class="notifications"></div>
      <div class="add-website-container">
        <button class="website-btn" @click="showAddModal">+ website</button>
      </div>
      <div class="nigthmode-switcher" @click="switchNightMode">
        <button class="night-mode-switch-btn"></button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component
export default class AppHeader extends Vue {
  @Emit()
  switchNightMode() {
    this.$emit("switchNightMode");
  }
  @Emit()
  showAddModal() {
    this.$emit("showAddModal");
  }
}
</script>
<style>
header.header {
  display: grid;
  grid-template-columns: 168px 1fr 300px;
  padding: 12px;
  border-bottom: 1px solid #ccc;
}
.header .logo {
  margin: 0;
}
.header .logo a {
  display: block;
}
.header .logo a img {
  display: block;
  max-width: 100%;
  max-height: 54px;
  float: left;
}
.header .logo a p {
  display: block;
  line-height: 54px;
  float: left;
  margin: 0;
  font-weight: bold;
  color: #2f12f8;
  margin-left: 8px;
  font-size: 18px;
}
.header .logo a p span {
  color: #00d1b0;
}
.top-menu {
  text-align: left;
}
.top-menu a {
  display: inline-block;
  margin: 15px 8px;
  line-height: 27px;
  text-decoration: none;
  vertical-align: middle;
  padding: 0 10px;
  color: #2f12f8;
  transition: 0.5s ease;
  border-radius: 12px;
}
.top-menu a:hover {
  background: #f5f5f5;
}
.darktheme .top-menu a:hover {
  background: #00d0b047;
  color: #e1e1e1;
}
.website-btn {
  outline: none;
  border: none !important;
  border-radius: 18px;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  padding: 4px 14px;
  padding-top: 4px;
  padding-top: 1px;
  line-height: 30px;
  background: rgba(52, 52, 247, 1);
  background: -webkit-gradient(
    left top,
    right top,
    color-stop(0%, rgba(52, 52, 247, 1)),
    color-stop(100%, rgba(198, 39, 230, 1))
  );
  background: linear-gradient(
    to right,
    rgba(52, 52, 247, 1) 0%,
    rgba(198, 39, 230, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3434f7', endColorstr='#c627e6', GradientType=1 );
  cursor: pointer;
}
.right-from-menu {
  display: grid;
  grid-template-columns: 1fr 170px 56px;
}
.nigthmode-switcher {
  margin: -12px;
  background: #f7f7f7;
  transition: all 0.3s ease;
}

.darktheme .nigthmode-switcher {
  background: #4f4bff2b;
}

.night-mode-switch-btn {
  outline: none;
  display: block;
  line-height: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #2f19f9;
  overflow: hidden;
  margin: 25px;
  position: relative;
  cursor: pointer;
}

.night-mode-switch-btn:after {
  content: "";
  background: #2f12f8;
  width: 16px;
  height: 32px;
  right: -2px;
  top: -2px;
  position: absolute;
  display: block;
  float: right;
  transition: all 0.5s ease;
}
.night-mode-switch-btn:before {
  content: "";
  background: #fff;
  width: 16px;
  height: 32px;
  left: -2px;
  top: -2px;
  position: absolute;
  display: block;
  float: left;
  transition: all 0.5s ease;
}

.night-mode-switch-btn:hover:after {
  background: #fff;
}
.night-mode-switch-btn:hover:before {
  background: #2f12f8;
}
.add-website-container {
  margin: 12px 0px;
}
@media (max-width: 768px) {
  .top-menu {
    max-height: 56px;
    overflow-y: scroll;
  }
  header.header {
    grid-template-columns: 54px 1fr 222px;
  }
  .header .logo a p {
    display: none;
  }
}
@media (max-width: 480px) {
  .top-menu {
    display: none;
  }
}
</style>
