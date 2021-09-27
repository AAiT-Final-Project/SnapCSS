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
                  class="editor__btn util-btn"
                >
                  <mdi :path="mdiFileUploadOutline" size="20" />
                  <span class="icon_label">Upload File</span>
                </button>
                <input
                  type="file"
                  class="d-none"
                  ref="cssFileInput"
                  accept=".css,.html,.vue"
                  @change="uploadCSS"
                />

                <button
                  id="load-url-btn"
                  @click="loadUrl"
                  class="editor__btn util-btn"
                >
                  <mdi :path="mdiLink" size="20" />
                  <span class="icon_label">Load URL</span>
                </button>
                <button
                  @click="optimize"
                  style="cursor: pointer"
                  id="snap-btn"
                  class="editor__btn editor__run shadow-lg rounded"
                >
                  SNAP
                </button>
              </div>
            </div>
          </div>
        </editor>
        <editor class="output" v-model:code="outputText">
          <div class="editor__footer">
            <div class="editor__footer--left text-right">
              <a :href="downloadUrl" :download="`snapped.${cssFileName}`">
                <button class="editor__btn util-btn right">
                  <mdi :path="mdiFileDownload" class="icon" size="20" />
                  <span class="icon_label">Download Code</span>
                </button>
              </a>

              <button class="editor__btn util-btn right" @click="copyCode">
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
import Editor from '@/components/Editor.vue';
import {
  mdiLink,
  mdiAutoFix,
  mdiContentCopy,
  mdiFileDownload,
  mdiFileUploadOutline,
} from '@mdi/js';
import * as snap from 'snappy-css';
import Mdi from '@/components/Mdi.vue';
import sweetAlert from 'sweetalert2';
import Switches from '@/components/Switches.vue';
import Preview from '@/components/Preview.vue';
import FileImportExport from '@/util/fileImportExport';

@Options({
  data() {
    return {
      mdiLink,
      mdiAutoFix,
      mdiContentCopy,
      mdiFileDownload,
      mdiFileUploadOutline,
      inputText: '',
      outputText: '',
      fileImportExport: new FileImportExport(),
      cssFileName: 'CSS.css',
      htmlFileName: 'file.html',
      switches: [
        { name: 'Clean CSS', value: 'c' },
        { name: 'Restructure CSS', value: 'r' },
        { name: 'Suggest CSS', value: 's' },
        { name: 'Compress CSS', value: 'k' },
      ],
      optimizers: ['c', 'r', 'k'],
    };
  },
  computed: {
    downloadUrl() {
      if (
        this.wholeText &&
        (this.cssFileName.endsWith('.html') ||
          this.cssFileName.endsWith('.vue'))
      ) {
        return this.fileImportExport.exportToVueHTML(
          this.wholeText,
          this.outputText
        );
      }

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
        let message = '';
        let css = snap.getCSS('', () => {console.log('')});
        try {
          css = snap.getCSS(this.inputText, (messages) => {
            message = messages.join('\n')
          });
        } catch (e) {
          message = 'Failed to Load CSS'
          console.log(e);
        }
        if (message !== 'Successfully Loaded CSS')
          sweetAlert.fire({
            icon: 'error',
            title: 'Invalid CSS',
            text: message,
          });
        else
          snap.optimize(css, this.optimizers.join('')).then(result => {
            this.outputText = result.toString();
            sweetAlert.fire({
              icon: 'success',
              title: 'Success',
              text: 'Successfully Optimized your CSS',
            });
        })
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
        const importedFile = e.target.result;
        if (
          this.cssFileName.endsWith('.html') ||
          this.cssFileName.endsWith('.vue')
        ) {
          this.inputText =
            this.fileImportExport.extractCSSFromHtmlOrVue(importedFile);
        } else {
          this.inputText = importedFile;
        }
        this.wholeText = importedFile;
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
}

.output {
  border-left: #aaaaaa 1px solid;
}

.icon {
  margin-left: 10px;
}

.home {
  padding: 100px 0px;
  max-width: 1200px;
  margin: 0 auto;
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
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 25px 0 0;
  font-size: 16px;
  border: none;
  box-shadow: 0 10px 14px rgba(0, 0, 0, 0.35);
  padding: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.util-btn {
  border: 0px solid #ddd;
  cursor: pointer;
  color: #3c3c3c;
}

.util-btn:hover {
  color: #19a500 !important;
}
</style>
