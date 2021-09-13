<template>
  <div id="nav" class="shadow">
    <img
      src="@/assets/images/logo.png"
      alt="Snap CSS"
      class="logo"
      height="60"
    />
    <!--    <router-link to="/">Home</router-link> |-->
    <!--    <router-link to="/about">About</router-link>-->
  </div>
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
  padding: 25px;
  text-align: center;
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
</style>
