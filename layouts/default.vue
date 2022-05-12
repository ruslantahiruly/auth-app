<template lang="pug">
  div#page
    div#wrapper
      header
        TheNavbar
      main 
        Nuxt
    TheFooter
</template>

<style lang="stylus" scoped>
#page
  display flex
  flex-direction column
  height 100%

#wrapper
  flex 1
</style>
