<template lang="pug">
  div
    section.section
      div.container
        h1.title.size-6 Каталог товаров
        div.divider
        div.row
          ProductCard(
            v-for="index in 14"
            :key="index"
            :product="index"
          )
</template>

<script>
export default {}
</script>
