<template>
  <div id="app">
    <div class="navigation">
      <img src="../assets/image/logo.png" alt="" class="logo" />
    </div>
    <div class="main">
      <div class="editors">
        <div class="input">
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
          <MonacoEditor
            id="editor1"
            width="100%"
            height="400"
            language="css"
            theme="vs"
            code
            @mounted="onMounted"
            @codeChange="onCodeChange"
          >
          </MonacoEditor>
          <div class="editor__footer">
            <div class="editor__footer--left">
              <div class="editor__btn uploadBtn" id="btnFileUpload">
                <img
                  class="icons"
                  src="../assets/image/cloud-upload-icon-16.png"
                />
                <h4 class="icon_lebel">Upload File</h4>
              </div>

              <input
                type="file"
                accept=".css"
                id="FileUpload1"
                style="display: none"
              />

              <div @click="loadUrl" class="editor__btn loadBtn">
                <img
                  class="icons"
                  src="../assets/image/link-icon-gray-grey-link-icon-11562963096unfmtzimkj.png"
                />
                <h4 class="icon_lebel">Load URL</h4>
              </div>
              <button
                style="
                  box-shadow: 0px 3px 4px -1px black;
                  border-color: #19a500;
                  margin-right: 15px;
                "
                @click="run"
                class="editor__btn editor__run"
              >
                Snap
              </button>
            </div>
          </div>
        </div>

        <div class="output">
          <div class="header"></div>
          <MonacoEditor
            id="editor2"
            width="100%"
            height="400"
            theme="vs"
            code
            language="css"
            :options="options"
            @mounted="resultMounted"
          >
          </MonacoEditor>
          <div
            style="border: 0; border-left: 1px solid #dadada"
            class="editor__footer"
          >
            <div class="editor__footer--left">
              <div
                @click="downloadCode"
                style="background-color: white; border: 0px; width: max-content"
                class="editor__btn editor__run"
              >
                <img
                  style="width: 25px; height: 25px"
                  class="icons"
                  src="../assets/image/download.png"
                />
              </div>
              <div
                @click="copyCode"
                style="background-color: white; border: 0px; width: max-content"
                class="editor__btn editor__run"
              >
                <img
                  style="width: 25px; height: 25px"
                  class="icons"
                  src="../assets/image/copy.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="htmlButton">
      <h2>To see the demo insert your html file here</h2>
      <input type="file" id="input1" accept=".html" />
    </div>
    <div id="displayHtml">
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
</template>
<style scoped>
#app {
  height: max-content;
  display: flex;
  flex-direction: column;
}
h2 {
  align-self: center;
}
#htmlButton {
  margin-top: 10px;
  margin-left: 75px;
  display: none;
}
#displayHtml {
  display: none;
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
.navigation {
  background-color: white;
  height: max-content;
  width: 100%;
}
.logo {
  height: 60px;
  margin: 10px 35px;
}
.main {
  height: max-content;
  width: 1200px;
  align-self: center;
  margin-top: 50px;
}

#editor1 {
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: #dadada;
}

#editor2 {
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: #dadada;
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
  width: 100%;
  background-color: #fffffe;
  border-bottom: 2px solid #dadada;
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
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: #dadada;
}

.editor__btn {
  height: 30px;
  margin-top: 8px;
  margin-bottom: 8px;
  float: left;
  display: flex;
}
.loadBtn {
  align-items: center;
  background-color: white;
  border: 0;
}
.uploadBtn {
  align-items: center;
  background-color: white;
  border: 0;
}
.icons {
  height: 20px;
  width: 20px;
}
.icon_lebel {
  font-size: 12px;
  font-family: sans-serif;
  color: gray;
}

.editor__run {
  background-color: #19a500;
  color: #ffffff;
  height: 40px;
  width: 120px;
  float: right;
  justify-content: center;
  margin: 0;
  margin-right: 10px;

  font-size: 20px;
  align-items: center;
}

.input,
.output {
  width: 50%;
  height: 500px;
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
<script lang="ts">
import MonacoEditor from "vue-monaco-editor";
import Swal from "sweetalert2";

// use in component
export default {
  code: String,
  output: MonacoEditor,
  input: MonacoEditor,
  restructure: Boolean,
  clean: Boolean,
  compress: Boolean,
  suggest: Boolean,
  finalResult: String,

  components: {
    MonacoEditor,
  },
  mounted() {
    const input = document.querySelector("#input1");
    input.addEventListener("change", this.readSingleHtml, false);
  },
  data() {
    return {
      options: {
        readOnly: true,
      },
    };
  },
  created: function () {
    this.restructure = true;
    this.clean = true;
    this.compress = true;
    this.suggest = true;
  },
  methods: {
    onMounted(editor) {
      this.input = editor;

      const uploadBtn = document.querySelector("#FileUpload1");
      var button = document.getElementById("btnFileUpload");
      button.onclick = function () {
        uploadBtn.click();
      };
      uploadBtn.addEventListener("change", this.readSingleFile, false);

      var checkbox = document.querySelectorAll('input[type="checkbox"]');

      checkbox.forEach((el) =>
        el.addEventListener("click", (event) => {
          if (event.target.value == "restructure") {
            this.restructure = event.target.checked;
          } else if (event.target.value == "clean") {
            this.clean = event.target.checked;
          } else if (event.target.value == "compress") {
            this.compress = event.target.checked;
          } else if (event.target.value == "suggest") {
            this.suggest = event.target.checked;
          }
        })
      );
    },
    onCodeChange(editor) {
      this.input = editor;
    },
    resultMounted(result) {
      this.output = result;
    },
    async loadUrl() {
      Swal.fire({
        //title: "Enter URL",
        input: "text",
        inputPlaceholder: "Insert the css link here to load",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: false,
        confirmButtonText: "Load",
        // showLoaderOnConfirm: true,
        preConfirm: async (url) => {
          const response = await fetch(url, { mode: "no-cors" });
          const data = await response.json();
          console.log(data);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    },
    run() {
     
        if (this.clean == true) {
          console.log('clear')
        }

        if (this.compress == true) {
          console.log('compress')
        }

        if (this.restructure == true) {
          console.log('restructure')
        }

        if (this.suggest == true) {
          console.log('suggest')
      }
    },

    readSingleHtml(e) {
      var file = e.target.files[0];
      if (!file) {
        return;
      }

      var reader = new FileReader();
      const getExtension = file.name.split(".");
      const extension = getExtension[getExtension.length - 1];
      if (extension.trim() == "html" || extension.trim() == "php") {
        reader.onload = (e) => {
          var contents = e.target.result;

          this.displayHtml(contents);
        };
        reader.readAsText(file);
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid FIle",
          text: "The file you selected is invalid.",
        });
      }
    },

    displayHtml(contents) {
      let contents2 = "";
      let contents1 = "";
      if (contents.includes("</head>")) {
        const index = contents.indexOf("</head>");
        contents1 = this.addStr(
          contents,
          index - 1,
          "<style>" + this.input.getModel().getValue() + "</style>"
        );
        contents2 = this.addStr(
          contents,
          index - 1,
          "<style>" + this.output.getModel().getValue() + "</style>"
        );
      } else if (contents.includes("<?php")) {
        const index = contents.indexOf("<?php");
        contents1 = this.addStr(
          contents,
          index - 1,
          "<style>" + this.input.getModel().getValue() + "</style>"
        );
        contents2 = this.addStr(
          contents,
          index - 1,
          "<style>" + this.output.getModel().getValue() + "</style>"
        );
      }
      // console.log(contents);
      document.getElementById("displayHtml").style.display = "flex";

      var ifrm = document.getElementById("before");
      ifrm =
        ifrm.contentWindow ||
        ifrm.contentDocument.document ||
        ifrm.contentDocument;
      ifrm.document.open();
      ifrm.document.write(contents1);
      ifrm.document.close();

      var ifrm1 = document.getElementById("after");
      ifrm1 =
        ifrm1.contentWindow ||
        ifrm1.contentDocument.document ||
        ifrm1.contentDocument;
      ifrm1.document.open();
      ifrm1.document.write(contents2);
      ifrm1.document.close();
      //   console.log(contents);
      window.scrollBy({ top: 1000, behavior: "smooth" });
    },

    readSingleFile(e) {
      this.output.getModel().setValue("");
      var file = e.target.files[0];
      if (!file) {
        return;
      }

      var reader = new FileReader();
      const getExtension = file.name.split(".");
      const extension = getExtension[getExtension.length - 1];
      if (extension.trim() == "css") {
        reader.onload = (e) => {
          var contents = e.target.result;

          this.displayContents(contents);
        };
        reader.readAsText(file);
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid FIle",
          text: "The file you selected is invalid.",
        });
      }
    },

    displayContents(contents) {
      this.input.getModel().setValue(contents);
    },
    addStr(str, index, stringToAdd) {
      return (
        str.substring(0, index) + stringToAdd + str.substring(index, str.length)
      );
    },

    copyCode() {
      var dummy = document.createElement("textarea");
      // to avoid breaking orgain page when copying more words
      // cant copy when adding below this code
      // dummy.style.display = 'none'
      document.body.appendChild(dummy);
      //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
      dummy.value = this.output.getModel().getValue();
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    },
    downloadCode() {
      const data = this.output.getModel().getValue();
      if (data.trim().length > 0) {
        var element = document.createElement("a");
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
};
</script>

