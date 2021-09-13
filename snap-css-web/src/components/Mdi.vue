<template>
  <svg
    viewBox="0 0 24 24"
    :fill="fill"
    :height="size"
    :width="size"
    class="mdi-icon"
    :style="{ transform: `rotate(${this.rotate}deg)`, display: 'inline-block' }"
  >
    <title v-if="title">{{ title }}</title>
    <path :d="icon"></path>
  </svg>
</template>

<script>
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default {
  name: "mdi",
  props: {
    name: String,
    title: String,
    size: {
      type: [String, Number],
      default: 24,
    },
    fill: {
      type: String,
      default: "currentColor",
    },
    rotate: {
      type: Number,
      default: 0,
    },
    path: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      lib: {},
    };
  },
  add(icons) {
    if (typeof icons === "object" && icons !== null) {
      this.lib = icons;
    }
  },
  computed: {
    icon() {
      if (this.path) return this.path;

      const icon = this.$options.lib[this.toCamelCase(this.name)];

      if (typeof icon === "undefined") {
        console.error(`[${this.name}] Name of the icon is incorrect`);
        return;
      }

      return icon;
    },
  },
  methods: {
    toCamelCase(str) {
      const result = str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      });

      return result.replace(/\s+|[-]/g, "");
    },
  },
};
</script>
