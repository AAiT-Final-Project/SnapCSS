<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import SnapCss from "snappy-css";

@Options({
  mounted() {
    const snap = new SnapCss();
    const optimizers = snap.getOptimizers("a");
    const css = snap.getCSS("Trial CSS code Goes Here");
    optimizers.forEach((optimizer) => optimizer.optimize(css));
  },
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
