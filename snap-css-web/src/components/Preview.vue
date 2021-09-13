<template>
  <div class="preview" :class="showHTML">
    <div class="preview-title">
      <h1>Demo The Style</h1>
      <h2>
        <button
          @click="onPickFile(this.$refs.htmlFileInput)"
          class="editor__btn rounded shadow-lg"
        >
          <mdi :path="mdiLanguageHtml5" size="20" />
          <span class="icon_label">Upload HTML</span>
        </button>
        <input
          type="file"
          class="d-none"
          ref="htmlFileInput"
          accept="text/html, text/php"
          @change="uploadHTML"
        />
      </h2>
    </div>

    <div class="d-flex justify-center text-center">
      <div class="frame-container">
        <h2>Unoptimized CSS</h2>
        <iframe
          class="shadow-in rounded frame"
          ref="unoptimizedPreview"
          height="500px"
          width="100%"
          src=""
        ></iframe>
      </div>
      <div class="frame-container">
        <h2>Optimized CSS</h2>
        <iframe
          class="shadow-in rounded frame"
          ref="optimizedPreview"
          height="500px"
          width="100%"
          src=""
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Options, Vue } from "vue-class-component";
import { mdiLanguageHtml5 } from "@mdi/js";
import Mdi from "@/components/Mdi.vue";

@Options({
  props: {
    input: String,
    output: String,
  },
  components: {
    Mdi,
  },
  computed: {
    showHTML() {
      return this.input.length + this.output.length == 0 ? "d-none" : "d-block";
    },
  },
  data() {
    return {
      mdiLanguageHtml5,
      switches: [
        { name: "Clean CSS", value: "c" },
        { name: "Restructure CSS", value: "r" },
        { name: "Suggest CSS", value: "s" },
        { name: "Compress CSS", value: "k" },
      ],
      optimizers: ["c", "r", "s", "k"],
    };
  },
  methods: {
    onPickFile: (button: HTMLInputElement) => button.click(),
    uploadHTML(event: any) {
      this.readFile(event, (e: any) => {
        this.displayHtml(e.target.result);
      });
    },
    makeHTMLContent(html: string, css: string) {
      if (html.includes("</head>") || html.includes("<?php")) {
        const index = html.includes("</head>")
          ? html.indexOf("</head>") - 1
          : html.indexOf("<?php") - 1;
        html =
          html.substring(0, index) +
          `<style>${css}</style>` +
          html.substring(index, html.length);
      }
      return html;
    },
    fillFrame(frame: any, html: string) {
      frame =
        frame.contentWindow ||
        frame.contentDocument.document ||
        frame.contentDocument;
      frame.document.open();
      frame.document.write(html);
      frame.document.close();
    },
    readFile(event: any, task: (e: any) => void) {
      const files = event.target ? event.target.files : [];
      this.cssFileName = files[0].name;
      const reader = new FileReader();
      reader.onload = task;
      reader.readAsText(files[0]);
      this.cssFileName = files[0].name;
    },
    displayHtml(contents: string) {
      let before = this.makeHTMLContent(contents, this.input);
      this.fillFrame(this.$refs.unoptimizedPreview, before);
      let after = this.makeHTMLContent(contents, this.output);
      this.fillFrame(this.$refs.optimizedPreview, after);

      window.scrollBy({ top: 1000, behavior: "smooth" });
    },
  },
})
export default class Preview extends Vue {}
</script>

<style>
.preview-title {
  display: flex;
  justify-content: space-between;
  padding: 75px 20px 0 20px;
}

.frame-container {
  width: 50%;
  padding: 0 15px 15px;
}

.frame {
  width: 100%;
  box-shadow: none;
  border: #eeeeee solid 1px;
}
</style>
