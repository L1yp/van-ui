<template>
  <div class="v-table">
    <div class="v-table__inner-wrapper" ref="innerWrapper">
      <v-table-header ref="headerRef" :definition="headerDefinition" :columns="columnFields"></v-table-header>
      <v-table-body 
        ref="bodyRef"
        :columns="columnFields" 
        :rows="props.rows" 
        :height="props.height"
        :max-height="props.maxHeight"
      />
    </div>
  </div>

</template>

<script lang="ts" setup>
import { onMounted, ref, Slots, useSlots, VNode } from 'vue';
import { normalizedColumn, getHeaderColumns, getColumnFields } from './util'
import VTableHeader from './header/VTableHeader.vue';
import VTableBody from './body/VTableBody.vue';

interface Props {
  rows: any[]
  height?: string | number
  maxHeight?: string | number
}


const props = defineProps<Props>()
const slots: Slots = useSlots()

const columnTree = normalizedColumn(slots)

const headerDefinition = getHeaderColumns(columnTree)

const columnFields = getColumnFields(columnTree)

const headerRef = ref<InstanceType<typeof VTableHeader>>()
const bodyRef = ref<InstanceType<typeof VTableBody>>()
const innerWrapper = ref<HTMLDivElement>()
onMounted(() => {
  const style = window.getComputedStyle(innerWrapper.value, null)
  console.log('parent width', style.width)
  const maxWidth = parseFloat(style.width)
  const fixedWidth = columnFields.value.filter(it => it.slot.props.width).map(it => parseFloat(it.slot.props.width)).reduce((prev, current) => prev + current)
  console.log('fixedWidth', fixedWidth);
  const restWidth = maxWidth - fixedWidth
  if (restWidth > 0) {
    console.log('rest width', maxWidth - fixedWidth)
    const noWidthColumns = columnFields.value.filter(it => !it.slot.props.width)
    console.log('no width', noWidthColumns);
    const width = restWidth / noWidthColumns.length
    noWidthColumns.forEach(it => it.slot.props.width = width)
    headerRef.value?.$forceUpdate()
    bodyRef.value?.$forceUpdate()
  }

})

</script>

<style scoped>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid #E3E3E3;
}
</style>