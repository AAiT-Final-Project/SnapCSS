<template>
  <div id="app">
    <MonacoEditor />
  </div>
</template>

<script >
import MonacoEditor from "./components/MonacoEditor";
export default {
  name: "App",
  components: {
    MonacoEditor,
  },
  data() {
    return {
      css: "",
    };
  },
  methods: {
    onChildClick(value) {
      this.css = value;
    },
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f0f1f1;
}
</style>
