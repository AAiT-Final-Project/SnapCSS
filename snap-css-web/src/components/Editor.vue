<template>
  <div class="editor" style="padding: 3px 10px; overflow: hidden">
    <MonacoEditor
      :value="codeModel"
      width="100%"
      height="400"
      language="css"
      :options="options"
      @change="(val) => $emit('update:code', val)"
    />
    <slot />
  </div>
</template>

<script>
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import MonacoEditor from "monaco-editor-vue3";

export default {
  name: "Editor",
  components: { MonacoEditor },
  props: { options: Object, code: String },
  computed: {
    codeModel() {
      return this.code;
    },
  },
  data() {
    return {
      trial: "new code",
    };
  },
  methods: {
    trials(val) {
      this.$emit("update:code", val);
      console.log(val);
    },
  },
};
</script>

<style scoped></style>
