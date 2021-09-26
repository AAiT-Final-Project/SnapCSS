<template>
  <div class="home">
    <div class="main shadow-lg rounded">
      <switches v-model:optimizers="optimizers" />
      <div class="editors">
        <editor class="input" v-model:code="inputText">
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
                  class="d-none"
                  ref="cssFileInput"
                  accept="text/css"
                  @change="uploadCSS"
                />

                <button id='load-url-btn' @click="loadUrl" class="editor__btn rounded shadow-lg">
                  <mdi :path="mdiLink" size="20" />
                  <span class="icon_label">Load URL</span>
                </button>
                <button
                  @click="optimize"
                  style="cursor: pointer"
                  id="snap-btn"
                  class="editor__btn editor__run shadow-lg rounded"
                >
                  Snap
                  <mdi class="icon" :path="mdiAutoFix" size="20" />
                </button>
              </div>
            </div>
          </div>
        </editor>
        <editor
          class="output"
          v-model:code="outputText"
          :options="{ readOnly: true }"
        >
          <div class="editor__footer">
            <div class="editor__footer--left text-right">
              <a :href="downloadUrl" :download="`Optimized ${cssFileName}`">
                <button class="editor__btn rounded shadow-lg right">
                  <mdi :path="mdiFileDownload" class="icon" size="20" />
                  <span class="icon_label">Download Code</span>
                </button>
              </a>

              <button
                class="editor__btn rounded shadow-lg right"
                @click="copyCode"
              >
                <mdi :path="mdiContentCopy" class="icon" size="20" />
                <span class="icon_label">Copy Code</span>
              </button>
            </div>
          </div>
        </editor>
      </div>
    </div>
    <preview :input="inputText" :output="outputText" />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import SnapCss from 'snappy-css';
import Optimizer from 'snappy-css/lib/optimize/optimizer';
import Editor from '@/components/Editor.vue';
import {
  mdiLink,
  mdiAutoFix,
  mdiContentCopy,
  mdiFileDownload,
  mdiFileUploadOutline,
} from '@mdi/js';
import Mdi from '@/components/Mdi.vue';
import sweetAlert from 'sweetalert2';
import Switches from '@/components/Switches.vue';
import Preview from '@/components/Preview.vue';

@Options({
  data() {
    return {
      mdiLink,
      mdiAutoFix,
      mdiContentCopy,
      mdiFileDownload,
      mdiFileUploadOutline,
      inputText: '// code',
      outputText: '',
      snap: new SnapCss(),
      cssFileName: 'CSS.css',
      htmlFileName: 'file.html',
      switches: [
        { name: 'Clean CSS', value: 'c' },
        { name: 'Restructure CSS', value: 'r' },
        { name: 'Suggest CSS', value: 's' },
        { name: 'Compress CSS', value: 'k' },
      ],
      optimizers: ['c', 'r', 's', 'k'],
    };
  },
  computed: {
    downloadUrl() {
      return `data:text/plain;charset=utf-8, ${encodeURIComponent(
        this.outputText
      )}`;
    },
  },
  components: {
    Mdi,
    Editor,
    Preview,
    Switches,
    HelloWorld,
  },
  methods: {
    loadUrl() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      sweetAlert.fire({
        title: 'Enter CSS URL',
        input: 'text',
        backdrop: true,
        inputPlaceholder: 'Insert the css link here to load',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: false,
        confirmButtonText: 'Load',
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
              icon: 'error',
              title: 'Invalid URL',
              text: 'Could not load CSS from the URL',
            });
        },
        allowOutsideClick: () => !sweetAlert.isLoading(),
      });
    },
    optimize() {
      if (!this.inputText.length) {
        sweetAlert.fire({
          icon: 'info',
          title: 'Empty CSS',
          text: 'Insert Css code first',
        });
      } else if (!this.optimizers.length) {
        sweetAlert.fire({
          icon: 'question',
          title: 'What should I do?',
          text: 'Select at least one optimization option',
          // "\n\n.Detail: " +
          // errors[0]["details"],
        });
      } else {
        const optimizers = this.snap.getOptimizers(this.optimizers.join(''));
        let css = this.snap.getCSS(this.inputText);        
        optimizers.forEach(
          (optimizer: Optimizer) => (css = optimizer.optimize(css))
        );
        this.outputText = css.toString();
        sweetAlert.fire({
          icon: 'success',
          title: 'Success',
          text: 'Successfully Optimized your CSS',
        });
      }
    },
    onPickFile: (button: HTMLInputElement) => button.click(),
    readFile(event: any, task: (e: any) => void) {
      const files = event.target ? event.target.files : [];
      this.cssFileName = files[0].name;
      const reader = new FileReader();
      reader.onload = task;
      reader.readAsText(files[0]);
      this.cssFileName = files[0].name;
    },
    uploadCSS(event: any) {
      this.readFile(event, (e: any) => {
        this.inputText = e.target.result;
      });
    },
    copyCode() {
      navigator.clipboard.writeText(this.outputText).then(
        () => {
          sweetAlert.fire({
            icon: 'success',
            title: 'Success',
            text: 'Successfully Copied your CSS',
          });
          console.log('Async: Copying to clipboard was successful!');
        },
        (err) => {
          console.error('Async: Could not copy text: ', err);
        }
      );
    },
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
.input,
.output {
  width: 50%;
  border-radius: 15px;
}

.input {
  border-right: #19a500 1px solid;
}

.output {
  border-left: #19a500 1px solid;
}

.icon {
  margin-left: 10px;
}

.home {
  padding: 100px;
}

.main {
  height: max-content;
  align-self: center;
  overflow: hidden;
  margin: auto;
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
  margin: 0;
  background-color: white;
}

.right {
  float: right;
}

.editor__run {
  background-color: #19a500;
  color: #ffffff;
  height: 40px;
  width: 120px;
  float: right;
  justify-content: center;
  margin: 0 25px 0 0;
  font-size: 20px;
  align-items: center;
  border: none;
  padding: 10px 10px;
}
</style>
