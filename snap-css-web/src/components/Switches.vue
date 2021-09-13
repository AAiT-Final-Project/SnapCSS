<template>
  <div class="switches">
    <div class="header shadow-sm">
      <div class="options" v-for="opt in switches" :key="opt.value">
        <label class="switch">
          <input
            :value="opt.value"
            type="checkbox"
            v-model="optimizers"
            @change="() => $emit('update:optimizers', optimizers)"
          />
          <span class="slider round"></span>
        </label>
        <h4 class="labels">{{ opt.name }}</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  data() {
    return {
      switches: [
        { name: "Clean CSS", value: "c" },
        { name: "Restructure CSS", value: "r" },
        { name: "Suggest CSS", value: "s" },
        { name: "Compress CSS", value: "k" },
      ],
      optimizers: ["c", "r", "s", "k"],
    };
  },
})
export default class Switches extends Vue {}
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  background-color: #fffffe;
  padding: 1%;
  height: 50px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 27px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 8px;
  bottom: 0;
  border-top-width: 3px;
  border-right-width: 3px;
  border-bottom-width: 3px;
  border-left-width: 3px;
  border-top-style: solid;
  border-right-style: solid;
  border-bottom-style: solid;
  border-left-style: solid;
  border-top-color: #19a500;
  border-right-color: #19a500;
  border-bottom-color: #19a500;
  border-left-color: #19a500;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  top: -3px;
  left: -3px;
  height: 20px;
  width: 20px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #19a500;
}

input:focus + .slider {
  box-shadow: 0 0 1px #ffffff;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.options {
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  align-items: center;

  color: #111;
  font-weight: bold;
  line-height: 1;
  text-align: center;
  font-size: large;
}

.labels {
  width: max-content;
  font-family: -webkit-pictograph, serif;
  font-size: 11px;
}

.slider.round,
.slider.round:before {
  border-top-width: 3px;
  border-right-width: 3px;
  border-bottom-width: 3px;
  border-left-width: 3px;
  border-top-style: solid;
  border-right-style: solid;
  border-bottom-style: solid;
  border-left-style: solid;
  border-top-color: #19a500;
  border-right-color: #19a500;
  border-bottom-color: #19a500;
  border-left-color: #19a500;
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
