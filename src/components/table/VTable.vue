<template>
  <div class="v-table" :class="[ props.border ? 'border' : undefined ]" :style="tableInnerStyle">
    <div class="v-table__inner--wrapper" :style="tableInnerStyle" ref="innerWrapper">
      <v-table-header 
        ref="headerRef" 
        :definition="headerDefinition" 
        :columns="columnFields"
        >
      </v-table-header>
      <v-table-body 
        ref="bodyRef"
        :columns="columnFields" 
        v-model:rows="data"
        :draggable="props.draggable"
        :key-field="props.keyField"
        :striped="props.striped"
        @scroll="handleScroll"
      />
      <div style="position: absolute; top: 0; left: 0; border-top: 1px solid #e8eaec; width: 100%;"></div>
      <div style="position: absolute; bottom: 0; left: 0; border-bottom: 1px solid #e8eaec; width: 100%;"></div>
      <div style="position: absolute; top: 0; left: 0; border-left: 1px solid #e8eaec; height: 100%;"></div>
      <div style="position: absolute; top: 0; right: 0; border-left: 1px solid #e8eaec; height: 100%;"></div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { computed, CSSProperties, onMounted, ref, Slots, useSlots, VNode } from 'vue';
import { normalizedColumn, getHeaderColumns, getColumnFields } from './util'
import VTableHeader from './header/VTableHeader.vue';
import VTableBody from './body/VTableBody.vue';
import { addUnit } from '../scrollbar/src/util';


interface Props {
  rows: any[]
  height?: string | number
  maxHeight?: string | number 
  draggable?: boolean // false
  keyField?: string // id
  striped?: boolean
  border?: boolean
  headerRowClassName?: string | ((row: any) => string[])
  headerRowStyle?: object | ((row: any, rowIdx: number) => object)
  headerCellClassName?: string | ((row: any, cell: any) => string[])
  headerCellStyle?: object | ((row: any, cellValue: any, rowIdx: number, columnIdx: number) => object)
  rowClassName?: string | ((row: any) => string[])
  rowStyle?: object | ((row: any, rowIdx: number) => object)
  cellClassName?: string | ((row: any, cell: any) => string[])
  cellStyle?: object | ((row: any, cellValue: any, rowIdx: number, columnIdx: number) => object)
}

interface Emits {
  (e: 'update:rows', rows: any[]): void
}

const tableInnerStyle = computed<CSSProperties>(() => {
  const height = props.height ? addUnit(props.height) : undefined
  const maxHeight = props.maxHeight ? addUnit(props.maxHeight) : undefined
  if(!height && !maxHeight) {
    return undefined
  } else {
    return {
      height, maxHeight
    }
  }
})

const data = computed<any[]>({
  get: () => props.rows,
  set: (v) => {
    // console.log('v table setter', v);
    
    emits('update:rows', v)
  }
})

const emits = defineEmits<Emits>()
const props = withDefaults(defineProps<Props>(), {
  draggable: false,
  keyField: 'id',
  striped: false,
  border: false,
})
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
  const parentWidth = parseFloat(style.width)
  const fixedWidth = columnFields.value.filter(it => it.width).map(it => it.width).reduce((prev, current) => prev + current)
  console.log('fixedWidth', fixedWidth);
  
  // 有剩余宽度
  if (parentWidth > fixedWidth) {
    console.log('rest width', parentWidth - fixedWidth)
    // columnFields.value.filter(it => !it.slot.props.width).forEach(it => it.width = it.minWidth || it.maxWidth)
    const noWidthColumns = columnFields.value.filter(it => !it.slot.props.width)
    console.log('no width', noWidthColumns);
    // 剩余宽度
    let restWidth = parentWidth - fixedWidth
    // 均分宽度
    let avgWidth = restWidth / noWidthColumns.length
    
    for (const column of noWidthColumns) {
      if (column.minWidth && avgWidth < column.minWidth) {
        column.width = Math.max(column.minWidth, 80)
      } else {
        column.width = Math.max(avgWidth, 80)
      }

      restWidth = restWidth - column.width
      avgWidth = restWidth / noWidthColumns.length
    }

    headerRef.value?.$forceUpdate()
    bodyRef.value?.$forceUpdate()
  } else {
    columnFields.value.filter(it => !it.slot.props.width).forEach(it => it.width = 80)
  }

})

function handleScroll(scrollLeft: number) {
  headerRef.value.$el.scrollLeft = scrollLeft
}

</script>

<style scoped>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid #E3E3E3;
}
</style>