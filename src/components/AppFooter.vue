<template>
  <footer class="footer">
    <div v-if="msg">
      {{ msg }}
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class AppFooter extends Vue {
  @Prop() private msg!: string;
}
</script>
<style scoped>
.bottom-menu a {
  display: block;
  text-align: center;
}
</style>
