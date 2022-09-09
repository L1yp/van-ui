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
  
  <v-table :rows="rows" :max-height="300" style="width: 400px">
    <v-column field="drag-handle" width="50" align="center">
      <template #default="scope">
        <div style="cursor: move;">
          <span style="width: 1em; height: 1em;">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M909.3 506.3L781.7 405.6a7.23 7.23 0 0 0-11.7 5.7V476H548V254h64.8c6 0 9.4-7 5.7-11.7L517.7 114.7a7.14 7.14 0 0 0-11.3 0L405.6 242.3a7.23 7.23 0 0 0 5.7 11.7H476v222H254v-64.8c0-6-7-9.4-11.7-5.7L114.7 506.3a7.14 7.14 0 0 0 0 11.3l127.5 100.8c4.7 3.7 11.7.4 11.7-5.7V548h222v222h-64.8c-6 0-9.4 7-5.7 11.7l100.8 127.5c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H548V548h222v64.8c0 6 7 9.4 11.7 5.7l127.5-100.8a7.3 7.3 0 0 0 .1-11.4z" fill="currentColor"/></svg>
          </span>
        </div>
      </template>
    </v-column>
    <v-column-group>
      <template #header>
        <span>6666</span>
      </template>
      <v-column field="id" title="#" width="80" align="center"></v-column>
      <v-column field="avatar" title="头像" width="120" align="left"></v-column>
    </v-column-group>
    
    <v-column field="name" title="名称" width="120"></v-column>
    <v-column field="age" title="年龄" width="80"></v-column>
    
  </v-table>

</template>

<style scoped>

</style>
