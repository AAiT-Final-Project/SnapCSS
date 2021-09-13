<template>
  <div class="header">
    <div class="options">
      <label class="switch">
        <input value="clean" type="checkbox" checked />
        <span class="slider round"></span>
      </label>
      <h4 class="labels">CSS Clean</h4>
    </div>

    <div class="options">
      <label class="switch">
        <input value="restructure" type="checkbox" checked />
        <span class="slider round"></span>
      </label>
      <h4 class="labels">CSS Restructure</h4>
    </div>

    <div class="options">
      <label class="switch">
        <input value="compress" type="checkbox" checked />
        <span class="slider round"></span>
      </label>
      <h4 class="labels">CSS Compress</h4>
    </div>

    <div class="options">
      <label class="switch">
        <input value="suggest" type="checkbox" checked />
        <span class="slider round"></span>
      </label>
      <h4 class="labels">CSS Suggestion</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class HelloWorld extends Vue {
  msg!: string;
}
</script>
