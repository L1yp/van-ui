<template>
    <div class="v-table__header--wrapper">
      <table class="v-table__header">
        <colgroup>
          <template v-for="column in props.columns">
            <col v-if="column.slot.props?.field" :name="column.slot.props?.field" :span="column.colspan" :width="column.slot.props?.width">
          </template>
        </colgroup>
        <thead>
          <tr
            class="v-table__header--tr"
            v-for="headerRow in props.definition"
          >
            <template v-for="headerCol in headerRow">
              <td
                class="v-table__cell"
                :name="headerCol.slot.props?.field"
                :rowspan="headerCol.rowspan"
                :colspan="headerCol.colspan"
              >
                <template v-if="headerCol.slot.children && Object.hasOwn(headerCol.slot.children as object, 'header')">
                  <component :is="(headerCol.slot.children.header)"></component>
                </template>
                <template v-else>
                  {{ headerCol.slot.props?.title }}
                </template>
              </td>

            </template>
          </tr>
        </thead>
      </table>
    </div>
</template>

<script lang="ts" setup>
import { ColumnType, getColumnFields } from '../util'

interface Props {
  definition: ColumnType[][]
  columns: ColumnType[]
}

const props = defineProps<Props>()

</script>

<style scoped></style>