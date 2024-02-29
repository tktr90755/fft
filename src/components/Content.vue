<script>
import init from '@/lib/main.js';
import { onMounted } from 'vue';

export default {
  setup() {
    onMounted(() => {
      init()
    });
  }
}
</script>
<template lang="pug">
v-row.pa-6
  v-col(cols="12" md="6").multi-container
    v-card(width="500" height="500")
      p(id="draw-zone-instruction").instruction Draw here!
      canvas(id="draw-zone" width="500" height="500").sketch-child
  v-col(cols="12" md="6").sketch
    v-card(width="500" height="500")
      canvas(id="circle-zone" width="500" height="500").sketch
  v-col(cols="12")
    v-btn(id="draw-zone-undo-button" variant="outlined").button.embedded-button 一つ戻す
  v-col(cols="12")
    p
      span.pr-2 フーリエ変換のかけっぷり
      input(id="circle-zone-slider" type="range" min="0" max="1" step="any")
  v-col(cols="12")
    a.pr-2(href="https://github.com/tktr90755/fft") ソースコード
    a(href="https://bit.ly/3UZWSHI") 参照元
</template>