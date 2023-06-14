<template>
  <main>
    <div class="column is-5">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="Email">
          <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
          <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Password">
          <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-success" type="submit" @click="onClickLogin()">
            Login
          </button>
        </p>
      </div>
    </div>
  </main>
</template>
<style lang="scss">

main{
  align-items: center;
  justify-content: center;
  display: flex;
}
.field{

}

.container{

}

</style>