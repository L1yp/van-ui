<template>
  <div ref="scrollbar$" class="v-scrollbar">
    <div ref="wrap$" class="v-scrollbar__wrap" :style="style">
      <div ref="resize$" class="v-scrollbar__view">
        <slot></slot>
      </div>
      <div class="v-scrollbar__bar is-horizontal" ref="hBar$">
        <div class="v-scrollbar__thumb" :style="hThumbStyle"></div>
      </div>
      <div class="v-scrollbar__bar is-vertical" ref="vBar$">
        <div class="v-scrollbar__thumb" :style="vThumbStyle"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, onUpdated, nextTick, watch } from 'vue';
import type { StyleValue, CSSProperties } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { addUnit } from './util'

interface Props {
  height?: string | number
  maxHeight?: string | number
  wrapStyle?: string
}

const props = defineProps<Props>()

const style = computed<StyleValue>(() => {
  const style: CSSProperties = {}
  if (props.height) style.height = addUnit(props.height)
  if (props.maxHeight) style.maxHeight = addUnit(props.maxHeight)
  return [props.wrapStyle, style]
})

const scrollbar$ = ref<HTMLDivElement>()
const wrap$ = ref<HTMLDivElement>()
const resize$ = ref<HTMLDivElement>()
const hBar$ = ref<HTMLDivElement>()
const vBar$ = ref<HTMLDivElement>()

const ratioX = ref<number>(0)
const ratioY = ref<number>(0)
const sizeHeight = ref<string>('')
const sizeWidth = ref<string>('')

const hThumbStyle = computed<StyleValue>(() => {
  const style: CSSProperties = {}
  style.width = addUnit(sizeWidth.value)
  style.transform = `translateX(${ratioX}%)`
  return style
})

const vThumbStyle = computed<StyleValue>(() => {
  const style: CSSProperties = {}
  style.height = addUnit(sizeHeight.value)
  style.transform = `translateY(${ratioY}%)`
  return style
})

const GAP = 4 // 2 + 2
function update() {
  if (!wrap$.value) {
    return
  }
  const offsetHeight = wrap$.value.offsetHeight - GAP
  const offsetWidth = wrap$.value.offsetWidth - GAP


  const originalHeight = offsetHeight ** 2 / wrap$.value.scrollHeight
  const originalWidth = offsetWidth ** 2 / wrap$.value.scrollWidth

  const height = Math.max(originalHeight, 6)
  const width = Math.max(originalWidth, 6)
  ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width))
  ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height))

  sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : ''
  sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : ''

}

onMounted(() => {
  useResizeObserver(scrollbar$.value, update)
})

</script>

<style scoped>
.v-scrollbar__wrap::-webkit-scrollbar {
  display: none;
}
.v-scrollbar {
  overflow: hidden;
  position: relative;
  height: 100%;
  border: 1px solid #e3e3e3;
}

.v-scrollbar__wrap {
  overflow: auto;
  height: 100%;
  box-sizing: border-box;
}

.v-scrollbar__view {

}

.v-scrollbar__bar.is-horizontal {
  height: 6px;
  left: 2px;
}

.v-scrollbar__bar.is-vertical {
  width: 6px;
  top: 2px;
}

.v-scrollbar__bar.is-vertical>.v-scrollbar__thumb {
  width: 100%;
}

.v-scrollbar__bar.is-horizontal>.v-scrollbar__thumb {
  height: 100%;
}

.v-scrollbar__bar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1;
  border-radius: 4px;
}

.v-scrollbar__thumb {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: #909399;
  transition: .3s background-color;
  opacity: .3;
}
</style>