<template>
  <nav id="nav" class="shadow">
    <img src="@/assets/snap.svg" alt="Snap CSS" class="logo" height="35" />
    <div class="snap_logo_label">SNAP CSS</div>
  </nav>
  <router-view />
  <footer style="background: white">
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 25px 0px;
      "
    >
      <!-- <div> -->
      <div>Avaliable on</div>
      <div style="display: flex; align-items: center; justify-content: center">
        <img src="https://img.icons8.com/color/48/000000/npm.png" />
        <img
          width="30"
          style="margin-left: 10px"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1024px-Visual_Studio_Code_1.35_icon.svg.png"
        />
        <img
          style="margin-left: 10px"
          src="https://img.icons8.com/ios-glyphs/30/000000/github.png"
        />
      </div>
      <div>©{{ new Date().getFullYear() }} Snap-CSS</div>
    </div>
    <!-- </div> -->
  </footer>
</template>

<style>
body {
  margin: 0;
  background: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.rounded {
  border-radius: 5px;
}

#nav {
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1) !important;
}

.shadow {
  box-shadow: 0 0.35rem 0.75rem rgba(0, 0, 0, 0.07) !important;
}

.shadow-lg {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.15) !important;
}

.shadow-none {
  box-shadow: none !important;
}

.shadow-in {
  box-shadow: 0 0 5px #dededede inset !important;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.d-none {
  display: none;
}

.d-block {
  display: block;
}

.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
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

.icon_label {
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 10px 10px 10px 5px;
}

.snap_logo_label {
  font-weight: 500;
  font-size: 25px;
  color: #19a500;
  display: flex;
  align-items: center;
}
</style>
