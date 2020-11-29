<template>
  <div>
    <h1>Dashboard page</h1>
    <table>
      <tbody>
        <tr>
          <th>#</th>
          <th>url</th>
          <th>cms</th>
          <th>blockchain</th>
          <th>delete</th>
        </tr>
        <tr v-for="(website, index) in websites" :key="index">
          <td>{{ index }}</td>
          <td>{{ website.url }}</td>
          <td>{{ website.cms }}</td>
          <td>{{ website.blockchain }}</td>
          <td class="cursor-pointer red" @click="removeWebsite(website)">x</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store/index";

@Component
export default class Dashboard extends Vue {
  @Prop() private msg!: string;
  public removeWebsite(website: object) {
    store.dispatch("deleteWebsite", website);
  }
  get websites() {
    return store.getters.websites;
  }
}
</script>
<style scoped>
table {
  width: 100%;
  border: 2px solid #ccc;
}
table tr,
table th {
  border-bottom: 1px solid #ccc;
}
.cursor-pointer {
  cursor: pointer;
}
.red {
  color: #a00;
}
td {
  padding: 6px 0;
}
</style>
