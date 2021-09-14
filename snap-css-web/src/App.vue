<template>
  <nav id="nav" class="shadow">
    <img
      src="@/assets/images/logo.png"
      alt="Snap CSS"
      class="logo"
      height="50"
    />
  </nav>
  <router-view />
</template>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.rounded {
  border-radius: 5px;
}

#nav {
  padding: 15px;
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
  font-family: sans-serif;
  color: gray;
  margin: 10px 10px;
}
</style>
