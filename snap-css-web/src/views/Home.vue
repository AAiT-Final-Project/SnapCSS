<template>
  <div class="home" style="padding: 100px">
    <!--    <img alt="Vue logo" src="../assets/logo.png" />-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />-->
    {{ image }}
    <div class="main shadow-lg rounded" style="margin: auto; overflow: hidden">
      <div class="header shadow-sm">
        <div class="options">
          <label class="switch">
            <input value="c" type="checkbox" v-model="optimizers" />
            <span class="slider round"></span>
          </label>
          <h4 class="labels">CSS Clean</h4>
        </div>

        <div class="options">
          <label class="switch">
            <input value="r" type="checkbox" v-model="optimizers" />
            <span class="slider round"></span>
          </label>
          <h4 class="labels">CSS Restructure</h4>
        </div>

        <div class="options">
          <label class="switch">
            <input value="k" type="checkbox" v-model="optimizers" />
            <span class="slider round"></span>
          </label>
          <h4 class="labels">CSS Compress</h4>
        </div>

        <div class="options">
          <label class="switch">
            <input value="s" type="checkbox" v-model="optimizers" />
            <span class="slider round"></span>
          </label>
          <h4 class="labels">CSS Suggestion</h4>
        </div>
      </div>

      <div class="editors">
        <editor
          class="input"
          v-model:code="inputText"
          style="width: 50%; border-right: #19a500 1px solid"
        >
          <div>
            <div class="editor__footer">
              <div class="editor__footer--left">
                <button
                  @click="onPickFile(this.$refs.cssFileInput)"
                  class="editor__btn rounded shadow-lg"
                >
                  <mdi :path="mdiFileUploadOutline" size="20" />
                  <span class="icon_label">Upload File</span>
                </button>
                <input
                  type="file"
                  style="display: none"
                  ref="cssFileInput"
                  accept=".css"
                  @change="uploadCSS"
                />

                <button @click="loadUrl" class="editor__btn rounded shadow-lg">
                  <mdi :path="mdiLink" size="20" />
                  <span class="icon_label">Load URL</span>
                </button>
                <button
                  @click="optimize"
                  style="border: none; margin-right: 25px; padding: 10px 10px"
                  class="editor__btn editor__run shadow-lg rounded"
                >
                  Snap
                  <mdi :path="mdiAutoFix" size="20" style="margin-left: 15px" />
                </button>
              </div>
            </div>
          </div>
        </editor>
        <editor
          class="output"
          v-model:code="outputText"
          :options="{ readOnly: true }"
          style="width: 50%; border-left: #19a500 1px solid"
        >
          <div class="editor__footer">
            <div class="editor__footer--left" style="text-align: right">
              <a :href="downloadUrl" :download="`Optimized ${cssFileName}`">
                <button class="editor__btn rounded shadow-lg right">
                  <mdi
                    :path="mdiFileDownload"
                    size="20"
                    style="margin-left: 10px"
                  />
                  <span class="icon_label">Download Code</span>
                </button>
              </a>

              <button
                class="editor__btn rounded shadow-lg right"
                @click="copyCode"
              >
                <mdi
                  :path="mdiContentCopy"
                  size="20"
                  style="margin-left: 10px"
                />
                <span class="icon_label">Copy Code</span>
              </button>
            </div>
          </div>
        </editor>
      </div>
    </div>
    <div class="html">
      <div id="htmlButton">
        <h2>To see the demo insert your html file here</h2>

        <button
          @click="onPickFile(this.$refs.htmlFileInput)"
          class="editor__btn rounded shadow-lg"
        >
          <mdi :path="mdiLanguageHtml5" size="20" />
          <span class="icon_label">Upload HTML</span>
        </button>
        <input
          type="file"
          style="display: none"
          ref="htmlFileInput"
          accept=".html"
          @change="onFilePicked"
        />
        <!--        <input type="file" id="input1" accept=".html" />-->
      </div>

      <div id="displayHtml" :style="displayHTML">
        <div id="iframeL">
          <h2>Before</h2>
          <iframe id="before" src="" width="100%" height="500px"></iframe>
        </div>
        <div id="iframeR">
          <h2>After</h2>
          <iframe id="after" width="100%" height="500px" src=""></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import SnapCss from "snappy-css";
import Optimizer from "snappy-css/lib/optimize/optimizer";
import Editor from "@/components/Editor.vue";
import {
  mdiLink,
  mdiAutoFix,
  mdiFileUploadOutline,
  mdiContentCopy,
  mdiFileDownload,
  mdiLanguageHtml5,
} from "@mdi/js";
import Mdi from "@/components/Mdi.vue";
import sweetAlert from "sweetalert2";

@Options({
  data() {
    return {
      mdiLink,
      mdiAutoFix,
      mdiFileUploadOutline,
      mdiContentCopy,
      mdiFileDownload,
      mdiLanguageHtml5,
      optimizers: ["r", "c", "k", "s"],
      inputText: "// code",
      outputText: "",
      snap: new SnapCss(),
      cssFileName: "CSS.css",
      htmlFileName: "file.html",
    };
  },
  computed: {
    displayHTML() {
      return `display: ${
        (this.inputText.length && this.outputText.length) == 0 ? "none" : "flex"
      }`;
    },
    downloadUrl() {
      return `data:text/plain;charset=utf-8, ${encodeURIComponent(
        this.outputText
      )}`;
    },
  },
  components: {
    Editor,
    HelloWorld,
    Mdi,
  },
  methods: {
    loadUrl() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      sweetAlert.fire({
        title: "Enter CSS URL",
        input: "text",
        backdrop: true,
        inputPlaceholder: "Insert the css link here to load",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: false,
        confirmButtonText: "Load",
        // showLoaderOnConfirm: true,
        preConfirm(url: string) {
          let valid = !!url.match(
            /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?/gi
          );
          console.log(valid);
          if (valid)
            fetch(url)
              .then((response) => response.text())
              .then(
                (data) => (self.inputText = data),
                () => (valid = false)
              );
          if (!valid)
            sweetAlert.fire({
              icon: "error",
              title: "Invalid URL",
              text: "Could not load CSS from the URL",
            });
        },
        allowOutsideClick: () => !sweetAlert.isLoading(),
      });
    },
    optimize() {
      if (!this.inputText.length) {
        sweetAlert.fire({
          icon: "info",
          title: "Empty CSS",
          text: "Insert Css code first",
        });
      } else if (!this.optimizers.length) {
        sweetAlert.fire({
          icon: "question",
          title: "What should I do?",
          text: "Select at least one optimization option",
          // "\n\n.Detail: " +
          // errors[0]["details"],
        });
      } else {
        const optimizers = this.snap.getOptimizers(this.optimizers.join(""));
        let css = this.snap.getCSS("Trial CSS code Goes Here");
        optimizers.forEach(
          (optimizer: Optimizer) => (css = optimizer.optimize(css))
        );
        this.outputText = css.toString();
        sweetAlert.fire({
          icon: "success",
          title: "Success",
          text: "Successfully Optimized your CSS",
        });
      }
    },
    onPickFile: (button: HTMLInputElement) => button.click(),
    uploadCSS(event: any) {
      const files = event.target ? event.target.files : [];
      this.cssFileName = files[0].name;
      const reader = new FileReader();
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      reader.onload = (e: any) => (self.inputText = e.target.result);
      reader.readAsText(files[0]);
      this.cssFileName = files[0].name;
    },
    onFilePicked(event: any) {
      const files = event.target.files;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
    displayContents(contents: string) {
      this.input.getModel().setValue(contents);
    },
    addStr(str: string, index: number, stringToAdd: string) {
      return (
        str.substring(0, index) + stringToAdd + str.substring(index, str.length)
      );
    },

    copyCode() {
      navigator.clipboard.writeText(this.outputText).then(
        () => {
          sweetAlert.fire({
            icon: "success",
            title: "Success",
            text: "Successfully Copied your CSS",
          });
          console.log("Async: Copying to clipboard was successful!");
        },
        (err) => {
          console.error("Async: Could not copy text: ", err);
        }
      );
    },
    downloadCode() {
      this.downloadUrl = `data:text/plain;charset=utf-8, ${encodeURIComponent(
        this.outputText
      )}`;
      if (this.outputText.trim().length) {
        this.$refs.downloader.click();
      }
      const data = this.output.getModel().getValue();
      if (this.outputText.trim().length && this.downloadUrl.length) {
        const element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/plain;charset=utf-8, " + encodeURIComponent(data)
        );
        element.setAttribute("download", "css.css");
        document.body.appendChild(element);
        element.click();
        //document.body.removeChild(element);
      }
    },
  },
})
export default class Home extends Vue {}
</script>

<style>
#htmlButton {
  margin-top: 10px;
  margin-left: 75px;
}
#displayHtml {
  width: 100%;
  justify-content: center;
}
#iframeR {
  width: 44.5%;
  height: 500px;
}
#before {
  height: 94%;
  width: 100%;
}
#after {
  height: 94%;
  width: 100%;
}
#iframeL {
  width: 44.5%;
  height: 500px;
}
.main {
  height: max-content;
  align-self: center;
  margin-top: 50px;
}

/* .paste {
  width: fit-content;
  padding: 20px 70px 20px 70px;
  border: 2px solid #208918;
  border-radius: 17px;
  position: absolute;
  z-index: 1;
  top: 300px;
  left: 265px;
  cursor: pointer;
} */
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
  top: 0px;
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
  font-family: -webkit-pictograph;
  font-size: 11px;
}

.editors {
  height: max-content;
  display: flex;
  flex-direction: row;
}

.editor__footer--left {
  width: 100%;
  align-items: center;
  display: block;
  background-color: white;
}

.editor__footer {
  width: 100%;
  height: 50px;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
  background-color: white;
}

.editor__btn {
  height: 30px;
  margin: 8px;
  float: left;
  display: flex;

  align-items: center;
  background-color: white;
  border-width: 1px;
}

.right {
  float: right;
}

.icons {
  height: 20px;
  width: 20px;
}
.icon_label {
  font-size: 12px;
  font-family: sans-serif;
  color: gray;
  margin: 10px 10px;
}

.editor__run {
  background-color: #19a500;
  color: #ffffff;
  height: 40px;
  width: 120px;
  float: right;
  justify-content: center;
  margin: 0 10px 0 0;
  font-size: 20px;
  align-items: center;
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
