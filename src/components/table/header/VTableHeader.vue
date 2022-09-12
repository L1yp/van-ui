<template>
    <div class="v-table__header--wrapper">
      <table class="v-table__header" :style="headerStyle">
        <colgroup>
          <template v-for="column in props.columns">
            <col :name="`col_${column.slot.props?.field}`" :style="{width: addUnit(column.width)}">
          </template>
        </colgroup>
        <thead>
          <tr
            class="v-table__header--tr"
            v-for="headerRow in props.definition"
          >
            <template v-for="headerCol in headerRow">
              <th
                class="v-header__column"
                :class="[headerCol.slot.props['header-align'], headerCol.slot.props?.headerAlign, `col_${headerCol.slot.props?.field}`]"
                :name="headerCol.slot.props?.field"
                :rowspan="headerCol.rowspan"
                :colspan="headerCol.colspan"
              >
                <template v-if="headerCol.slot.children && Object.hasOwn(headerCol.slot.children as object, 'header')">
                  <div class="v-cell">
                    <component :is="(headerCol.slot.children.header)"></component>
                  </div>
                  
                </template>
                <template v-else>
                  <div class="v-cell" v-text="headerCol.slot.props?.title"></div>
                </template>
              </th>

            </template>
          </tr>
        </thead>
      </table>
    </div>
</template>

<script lang="ts" setup>
import { ColumnType, getColumnFields } from '../util'
import { addUnit } from '@/components/scrollbar/src/util'
import { computed, CSSProperties } from 'vue';

interface Props {
  definition: ColumnType[][]
  columns: ColumnType[]
}

const props = defineProps<Props>()

const headerStyle = computed<CSSProperties>(() => {
  const width = props.columns
    .map(it => it.slot.props.width ? parseFloat(it.slot.props.width) : 80)
    .reduce((prev, current) => prev + current)
  const style: CSSProperties = { width: addUnit(width) }
  return style
})


</script>

<style scoped></style>