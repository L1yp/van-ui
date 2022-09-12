import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Align, ColumnType } from './util'

export type ColumnFormatter = (row: any, rowIdx: number, columnInfo: ColumnType, cell: any) => string

export default defineComponent({
  name: 'VColumn',
  props: {
    field: {
      type: String as PropType<string>,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: false,
    },
    minWidth: {
      type: [String, Number]  as PropType<string | number>,
      required: false,
    },
    width: {
      type: [String, Number]  as PropType<string | number>,
      required: false,
    },
    align: {
      type: String as PropType<Align>,
      required: false,
      default: 'left',
    },
    headerAlign: {
      type: String as PropType<Align>,
      required: false,
      default: 'left',
    },
    formatter: {
      type: Function as PropType<ColumnFormatter>,
      required: false,
    },
    showOverflow: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: true,
    },
  },
})