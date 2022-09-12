<template>
  <div class="v-table__body--wrapper">
    <v-scrollbar height="100%" :always="props.scrollbarAlways" @scroll="handleBodyScroll">
      <table class="v-table__body" :style="bodyStyle">
        <colgroup>
          <template v-for="column in props.columns">
            <col :name="`col_${column.slot.props?.field}`" :style="{width: addUnit(column.width)}">
          </template>
        </colgroup>


        <template v-if="props.draggable">
          <Draggable 
            v-model="data" 
            tag="tbody" 
            :item-key="props.keyField"
            handle=".drag-handle"
          >
            <template #item="{ element, index }">
              <tr class="v-table__body--tr" :class="[ props.striped && index % 2 === 0 ? 'striped' : undefined ]">
                <template v-for="column in props.columns">
                  <td 
                    class="v-body__column" 
                    :class="[column.slot.props.align, `col_${column.slot.props?.field}`]" 
                    :colid="column.slot.props?.field"
                    >
                    <template v-if="column.slot.children">
                      <div 
                        class="v-cell" 
                        :class="[ (column.slot.props.showOverflow || column.slot.props['show-overflow']) ? 'tooltip' : '' ]"
                        :style="(column.slot.props.showOverflow || column.slot.props['show-overflow']) ? { width: addUnit(column.width) } : undefined"
                      >
                        <component :is="column.slot.children.default" :row="element" :column="element[column.slot.props?.field]"></component>
                      </div>
                      
                    </template>
                    <template v-else>
                      <div 
                        class="v-cell" 
                        :class="[ (column.slot.props.showOverflow || column.slot.props['show-overflow']) ? 'tooltip' : '' ]" 
                        :style="(column.slot.props.showOverflow || column.slot.props['show-overflow']) ? { width: addUnit(column.width) } : undefined"
                        v-text="renderColumn(element, index, column)">
                    </div>
                    </template>
                  </td>

                </template>
              </tr>
            </template>
          </Draggable>
        </template>
        <template v-else>
          <tr 
            class="v-table__body--tr" 
            v-for="(element, idx) in data"
            :class="[ props.striped && idx % 2 === 0 ? 'striped' : undefined ]"
            :key="element[props.keyField]"
          >
            <template v-for="column in props.columns">
              <td 
                class="v-body__column" 
                :class="[column.slot.props.align, `col_${column.slot.props?.field}`]" 
                
                :colid="column.slot.props?.field"
                >
                <template v-if="column.slot.children">
                  <div 
                    class="v-cell" 
                    :class="[ (column.slot.props.showOverflow || column.slot.props['show-overflow']) ? 'tooltip' : '' ]"
                    :style="(column.slot.props.showOverflow || column.slot.props['show-overflow']) ? { width: addUnit(column.width) } : undefined"
                  >
                    <component :is="column.slot.children.default" :row="element" :column="element[column.slot.props?.field]"></component>
                  </div>
                  
                </template>
                <template v-else>
                  <div 
                    class="v-cell" 
                    :class="[ (column.slot.props.showOverflow || column.slot.props['show-overflow']) ? 'tooltip' : '' ]" 
                    :style="(column.slot.props.showOverflow || column.slot.props['show-overflow']) ? { width: addUnit(column.width) } : undefined"
                    v-text="renderColumn(element, idx, column)">
                  </div>
                </template>
              </td>

            </template>
          </tr>
        </template>
        
      </table>
    </v-scrollbar>

  </div>
</template>

<script lang="ts" setup>
import { ColumnType, renderCellTooltipStyle } from '../util'
import VScrollbar from '@/components/scrollbar/src/VScrollbar.vue'
import Draggable from 'vuedraggable'
import { computed, CSSProperties } from 'vue';
import { addUnit } from '@/components/scrollbar/src/util'
import type { ColumnFormatter } from '../VColumn';

interface Props {
  rows: Array<any>
  columns: ColumnType[]
  height?: string | number
  maxHeight?: string | number
  scrollbarAlways?: boolean
  draggable?: boolean
  keyField?: string
  striped: boolean
}

interface Emits {
  (e: 'update:rows', rows: any[]): void
  (e: 'scroll', scrollLeft: number, scrollTop: number): void
}

const emits = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {
  scrollbarAlways: true,
  draggable: false,
})

const data = computed<any[]>({
  get: () => props.rows,
  set: (v) => {
    // console.log('tbody data setter', v);
    
    emits('update:rows', v)
  }
})


const bodyStyle = computed<CSSProperties>(() => {
  const width = props.columns
    .map(it => it.slot.props.width ? parseFloat(it.slot.props.width) : 80)
    .reduce((prev, current) => prev + current)
  const style: CSSProperties = { width: addUnit(width) }
  console.log('body style', style);
  
  return style
})

function handleBodyScroll(scrollInfo: {scrollLeft: number, scrollTop: number}) {
  emits('scroll', scrollInfo.scrollLeft, scrollInfo.scrollTop)
}

function renderColumn(row: any, rowIdx: number, column: ColumnType): string {
  const formatter: ColumnFormatter = column.slot.props.formatter
  if (formatter) {
    return formatter(row, rowIdx, column, row[column.slot.props?.field])
  }
  return row[column.slot.props?.field]
}
</script>

<style scoped>

</style>