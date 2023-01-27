<template>
  <div class="container">
    <router-link to="/" class="header">
      <img src="@/assets/img/logo.png" alt="SVO" class="header__logo" />
    </router-link>
    <div class="error content">
      <img
        src="@/assets/img/plane.png"
        alt="This is not the web page you are looking for."
      />
      <img src="@/assets/img/404.png" alt="404" />
    </div>
  </div>
</template>

<style lang="scss">
.error {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  img {
    padding: 10px;
  }
}
</style>
