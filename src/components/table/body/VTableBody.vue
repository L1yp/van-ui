<template>
  <div class="v-table__body-wrapper">
    <v-scrollbar :max-height="props.maxHeight" :height="props.height" :always="props.scrollbarAlways">
      <table class="v-table__body">
        <template v-for="column in props.columns">
          <col :name="column.slot.props?.field" :span="column.colspan" :width="column.slot.props?.width">
        </template>
        <tbody>
          <template v-for="row in props.rows">
            <tr class="v-table__header--tr">
              <template v-for="column in props.columns">
                <td class="v-table__cell">
                  <template v-if="column.slot.children">
                    <component :is="column.slot" :row="row" :column="row[column.slot.props?.field]"></component>
                  </template>
                  <template v-else>
                    <span v-text="row[column.slot.props?.field]"></span>
                  </template>
                </td>

              </template>
            </tr>
          </template>
        </tbody>
      </table>
    </v-scrollbar>

  </div>
</template>

<script lang="ts" setup>
import { ColumnType } from '../util'
import VScrollbar from '@/components/scrollbar/src/VScrollbar.vue'

interface Props {
  rows: any[]
  columns: ColumnType[]
  height?: string | number
  maxHeight?: string | number
  scrollbarAlways?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  scrollbarAlways: true
})
</script>

<style scoped>

</style>