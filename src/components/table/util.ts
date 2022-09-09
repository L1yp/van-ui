import { Slots, VNode, computed, ComputedRef } from "vue";

export type ColumnType = {
  slot: VNode
  colspan: number
  rowspan: number
  children?: ColumnType[]
}

/**
 * 插槽数据结构化
 * @param slots 插槽数据
 * @returns 列定义树
 */
export function normalizedColumn(slots: Slots): ComputedRef<ColumnType[]> {
  return computed<ColumnType[]>(() => {
    const columnSlots: VNode[] = slots.default()
    // column tree
    const columnTree: ColumnType[] = []
    getColumns(columnSlots, columnTree)
    return columnTree
  })
}

/**
 * 获取 表头定义 二维数组
 * @param columnTree 列定义树
 * @returns 表头定义二维数组
 */
export function getHeaderColumns(columnTree: ComputedRef<ColumnType[]>): ComputedRef<ColumnType[][]> {
  return computed<ColumnType[][]>(() => {
    /** 2D Array */
    const headerDefinition: ColumnType[][] = []

    let currentChildren = [...columnTree.value]
    while (true) {
      const nextChildren = []
      const elems = []
      for (const item of currentChildren) {
        if (item.children?.length) {
          nextChildren.push(...item.children)
        }
        elems.push(item)
      }

      headerDefinition.push(elems)
      if (!nextChildren?.length) {
        break
      }

      currentChildren = [...nextChildren]
    }
    console.log('columns', headerDefinition);

    // 最大深度
    const maxLevel = headerDefinition.length
    for (const item of columnTree.value) {
      setRowspan(item, maxLevel, 1)
      setColspan(item)
    }

    return headerDefinition
  })
  
}

/**
 * 获取实际叶子列
 * @param columnTree 列定义树
 * @returns 叶子列
 */
export function getColumnFields(columnTree: ComputedRef<ColumnType[]>) {
  return computed<ColumnType[]>(() => {
    const container: ColumnType[] = []
    getLeafColumns(columnTree.value, container)
    return container
  })
}

function getLeafColumns(children: ColumnType[], container: ColumnType[]) {

  for (const child of children) {
    if (child.children?.length) {
      getLeafColumns(child.children, container)
    } else {
      container.push(child)
    }
  }
}

function setColspan(root: ColumnType): number {
  const children: ColumnType[] | undefined = root.children
  if (!children) {
    root.colspan = 1
    return 1
  }
  let count = 0
  for (const child of children) {
    if (child.children?.length) {
      const span = setColspan(child)
      child.colspan = span
      count += span
    } else {
      count ++
    }
  }
  root.colspan = count
  return count
}

function setRowspan(root: ColumnType, maxLevel: number, currentLevel: number) {
  const children: ColumnType[] | undefined = root.children
  if (!children) {
    root.rowspan = maxLevel - currentLevel + 1
    return
  }

  for (const child of children) {
    if (child.children?.length) {
      child.rowspan = 1
      setRowspan(child, maxLevel, currentLevel + 1)
    } else {
      child.rowspan = maxLevel - currentLevel + 1
    }
  }
}

function getColumns(slots: VNode[], container: ColumnType[]) {
  for (const slot of slots) {
    /** @ts-ignore */
    if ([slot.type?.__name, slot.type?.name].includes("VColumnGroup")) {
      const children: ColumnType[] | undefined = []
      container.push({slot, rowspan: 1, colspan: 1, children})
      /** @ts-ignore */
      getColumns(slot.children.default(), children)
      /** @ts-ignore */
    } else if ([slot.type?.__name, slot.type?.name].includes('VColumn')) {
      container.push({
        slot, rowspan: 1, colspan: 1
      })
    }
  }
}