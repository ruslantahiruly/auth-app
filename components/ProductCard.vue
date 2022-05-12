<template lang="pug">
  div.col-3
    NuxtLink(to="#")
      div.card
        div.card-wrapper
          img.card-img(src="/placeholder-image.png")
        div.text-primary
          h3.fw-6.size-7 Товар # {{ product }}
          div Описание товара
</template>

<script>
export default {
  props: ['product']
}
</script>