<template>
  <div id="app">
    <nav-bar />
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Nanum+Gothic|Quicksand&display=swap");

#app {
  font-family: "Quicksand", sans-serif;
  /* font-family: "Nanum Gothic", sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.text-line {
  background-color: transparent;
  color: black;
  outline: none;
  outline-style: none;
  outline-offset: 0;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: solid #eeeeee 1px;
  padding: 3px 10px;
}
</style>

<script>
import NavBar from "./components/NavBar";

export default {
  components: {
    NavBar
  }
};
</script>
