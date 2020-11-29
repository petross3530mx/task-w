<template>
  <div class="v-modal" :class="{ 'modal-shown': visible }">
    <div class="modal-inner">
      <div>
        <div class="modal-inner-container">
          <form @submit.prevent="AddWebsite">
            <div>
              <h2 class="addwebsite-text">Add website</h2>
              <label>
                <span>Website url</span>
                <input type="text" v-model="site.url" />
              </label>
              <div class="instead-label">
                <h5>Choose CMS</h5>
                <div>
                  <label
                    v-for="(cms, index) in variants"
                    :key="index"
                    class="cmsLabel"
                  >
                    <input
                      :value="cms.title"
                      type="radio"
                      v-model="site.cms"
                      :checked="site.cms == cms.title"
                    />
                    <div>
                      <img :src="getImgUrl(cms.src)" alt="" />
                      <span class="">{{ cms.title }}</span>
                    </div>
                  </label>
                </div>
              </div>

              <div class="instead-label">
                <select v-model="site.blockchain">
                  <option disabled value="">Select the blockchain</option>
                  <option value="EOS">EOS (recommended)</option>
                  <option value="Telos">Telos</option>
                  <option value="Ethereum">Ethereum</option>
                </select>
              </div>
              <label v-if="advanced">
                <span>Address</span>
                <input type="text" v-model="site.address" />
              </label>
              <label class="advanced-label">
                <p>Advanced setup</p>
                <input
                  class="advanced-checkbox"
                  type="checkbox"
                  v-model="advanced"
                />
              </label>
            </div>
            <p class="not-valid-message" v-if="notValid">
              Please, fill all required information
            </p>
            <button class="addbtn">Add website</button>
          </form>
        </div>

        <div class="advanced-div">
          <em>i</em>
          <p>Advanced port type settings can be found in your CMS plugin</p>
        </div>
      </div>
      <span @click="closeModal"></span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
@Component
export default class Modal extends Vue {
  advanced = false;
  variants = [
    {
      title: "WordPress",
      src: "logo-wp.jpg"
    },
    {
      title: "Shopify",
      src: "logo-shopify.jpg"
    },
    {
      title: "Lightspeed",
      src: "logo-lightspeed.jpg"
    },
    {
      title: "REST API",
      src: "logo-api.jpg"
    }
  ];
  notValid = false;
  site = {
    url: "",
    address: "",
    cms: "WordPress",
    blockchain: ""
  };
  public getImgUrl(pic: string) {
    const image = require.context("../assets/", false, /\.jpg$/);
    return image("./" + pic);
  }
  @Prop() private visible: boolean | undefined;
  @Emit()
  closeModal() {
    this.$emit("closeModal");
  }
  @Emit()
  AddWebsite() {
    if (this.site.url && this.site.cms && this.site.blockchain) {
      const { url, cms, blockchain, address } = this.site;
      this.$emit("createwebsite", { url, cms, blockchain, address });
      this.site = { url: "", cms: "WordPress", blockchain: "", address: "" };
      this.closeModal();
    } else {
      this.notValid = true;
    }
  }
}
</script>
<style>
.v-modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #4040406b;
  top: 0;
  left: 0;
  z-index: -10;
  transition: all 0.5s ease;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-modal.modal-shown {
  z-index: 10;
  background: #4040406b;
  opacity: 1;
}
.v-modal .modal-inner {
  position: relative;
  max-width: 80vw;
  min-width: 300px;
  width: 420px;
  overflow: auto;
  padding: 0px;
  height: 80vh;
  display: flex;
  align-items: center;
}
.v-modal .modal-inner::-webkit-scrollbar {
  display: none;
}
.v-modal .modal-inner > span {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  transition: all 0.2s ease;
}
.v-modal .modal-inner > span:hover {
  transform: rotate(90deg) translateX(0px) translateY(0px);
}
.v-modal .modal-inner > span:before {
  content: "";
  border-top: 2px solid #3625ab;
  display: block;
  position: absolute;
  width: 14px;
  top: 9px;
  left: 3px;
  transform: rotate(45deg);
}
.v-modal .modal-inner > span:after {
  content: "";
  border-top: 2px solid #3625ab;
  display: block;
  position: absolute;
  width: 14px;
  top: 9px;
  left: 3px;
  transform: rotate(315deg);
}
.v-modal .modal-inner .modal-inner-container form > div {
  position: relative;
  max-width: 280px;
  margin: auto;
}
.v-modal .modal-inner .modal-inner-container form label {
  display: block;
  margin-top: 20px;
  text-align: left;
  border: 1px solid #2d08ec;
  border-radius: 4px;
  padding: 8px;
  position: relative;
}
.darktheme .v-modal .modal-inner form label {
  border: 1px solid #8fbef6;
}
.darktheme .v-modal .modal-inner > span:before,
.darktheme .v-modal .modal-inner > span:after {
  border-top: 2px solid #8fbef6;
}
.v-modal .modal-inner .modal-inner-container form label span {
  position: absolute;
  top: -9px;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  line-height: 14px;
  font-weight: normal;
  color: #2d08ec;
}
.v-modal .modal-inner .modal-inner-container form label input {
  background: #fff;
  line-height: 18px;
  border: none;
  outline: none;
  width: 100%;
}
h2.addwebsite-text {
  color: #2d08ec;
  text-align: left;
  font-size: 28px;
  margin-top: 0;
  padding-top: 36px;
}
.darktheme h2.addwebsite-text {
  color: #8fbef6;
}
.v-modal .modal-inner .modal-inner-container form .advanced-label {
  border: none;
  text-align: right;
  padding: 0;
  margin-bottom: 24px;
  margin-top: 0;
}
.advanced-checkbox {
  display: none;
}
.v-modal .modal-inner .modal-inner-container form .advanced-label p {
  display: block;
  color: #2d08ec;
  text-decoration: underline;
  font-size: 12px;
  line-height: 28px;
  margin: 0;
  cursor: pointer;
}
.darktheme .v-modal .modal-inner .modal-inner-container form .advanced-label p {
  color: #8fbef6;
}

.v-modal .modal-inner .modal-inner-container form label.cmsLabel {
  display: block;
  width: 50px;
  float: left;
  margin-right: 10px;
  padding: 0;
  border: none;
  cursor: pointer;
  margin-top: 0;
}
.v-modal .modal-inner form {
  background: #fff;
  border-radius: 1px 1px 6px 6px;
  overflow: hidden;
}
#app.darktheme .v-modal .modal-inner form {
  background: #0d0d17;
}
.v-modal .modal-inner .modal-inner-container form label img {
  max-width: 100%;
  opacity: 0.5;
  transition: all 0.3s ease;
  border-radius: 4px;
}
.v-modal .modal-inner .modal-inner-container form label.cmsLabel input {
  display: none;
}
.v-modal .modal-inner .modal-inner-container form label.cmsLabel span {
  display: block;
  position: relative;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  margin-top: 3px;
  opacity: 0;
  line-height: 28px;
  background: transparent;
  transition: all 0.5s ease;
  margin-left: -20px;
  margin-right: -20px;
}
.wp-logo {
  background: url;
}
.cmsLabel input[type="radio"]:checked + div > span {
  opacity: 1 !important;
}
.cmsLabel input[type="radio"]:checked + div > img {
  opacity: 1;
}
.instead-label h5 {
  text-align: left;
  color: #2d08ec;
  margin-bottom: 10px;
  font-size: 16px;
}
.darktheme .instead-label h5,
.darktheme .v-modal .modal-inner .modal-inner-container form label span {
  color: #8fbef6;
  background: #0d0d17;
}
.darktheme .v-modal .modal-inner .modal-inner-container form label input {
  background: #0d0d17;
  color: #8fbef6;
}
.instead-label select {
  display: block;
  width: 100%;
  line-height: 20px;
  height: 44px;
  border-radius: 4px;
  background: #fff;
  padding: 7px 10px;
  outline: none;
  color: #777;
  font-size: 14px;
  margin-bottom: 8px;
}
.darktheme .instead-label select {
  background: #0d0d17;
  color: #8fbef6;
  border-color: #8fbef6;
}
.addbtn {
  left: 0;
  bottom: -65px;
  background: linear-gradient(45deg, #9180ff, #b095f2);
  color: #fff;
  display: block;
  font-weight: bold;
  width: 100%;
  border: none;
  padding: 18px 4px;
  border-top: 1px solid #afafaf;
  border-radius: 0;
  transition: all 0.5s ease;
}
.addbtn:hover {
  background: linear-gradient(45deg, #8574eb, #927ace);
}
.advanced-div {
  background: #ffeaca;
  margin: 10px 0 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 16px 16px;
}
.advanced-div em {
  display: inline-block;
  background: #fd8635;
  width: 24px;
  height: 20px;
  border-radius: 50%;
  color: #000;
  font-style: normal;
  font-size: 80%;
  line-height: 20px;
  margin-right: 16px;
  margin-left: 2px;
}
.advanced-div p {
  color: #555;
  font-size: 15px;
  letter-spacing: 0.3px;
  text-align: left;
  margin: 0;
}
.not-valid-message {
  color: #a30000;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
}
</style>
