<script setup lang="ts">
import VTable from './components/table/VTable.vue';
import VColumn from './components/table/VColumn.vue';
import VColumnGroup from './components/table/VColumnGroup.vue';
import { ref } from 'vue'



const rows = ref(Array.from({length: 100}).map((_, idx) => {
  return {
    id: idx,
    name: `Lyp-${idx}`,
    age: 19,
    avatar: `http://${idx}`
  }
}))


</script>

<template>
  
  <v-table :rows="rows" :max-height="300" style="width: 200px">
    <v-column-group>
      <template #header>
        <span>6666</span>
      </template>
      <v-column field="id" title="#" width="80"></v-column>
      <v-column field="avatar" title="头像"></v-column>
    </v-column-group>
    
    <v-column field="name" title="名称" width="120"></v-column>
    <v-column field="age" title="年龄" width="80"></v-column>
    
  </v-table>

</template>

<style scoped>

</style>
