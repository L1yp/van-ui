<script setup lang="ts">
import VScrollbar from './components/scrollbar/src/VScrollbar.vue';
import VTable from './components/table/VTable.vue';
import VColumn from './components/table/VColumn.vue';
import VColumnGroup from './components/table/VColumnGroup.vue';
import { ref } from 'vue'

const rows = ref([
  {
    id: 1,
    name: 'Lyp',
    age: 19,
    avatar: 'http://1111'
  },
  {
    id: 2,
    name: 'Lyp',
    age: 19,
    avatar: 'http://222'
  },
  {
    id: 3,
    name: 'Lyp',
    age: 19,
    avatar: 'http://3333'
  },
  {
    id: 4,
    name: 'Lyp',
    age: 19,
    avatar: 'http://4444'
  },
  {
    id: 5,
    name: 'Lyp',
    age: 19,
    avatar: 'http://5555'
  },
  {
    id: 5,
    name: 'Lyp',
    age: 19,
    avatar: 'http://aa'
  },
  {
    id: 5,
    name: 'Lyp',
    age: 19,
    avatar: 'http://aa'
  },
  {
    id: 5,
    name: 'Lyp',
    age: 19,
    avatar: 'http://aa'
  },
  {
    id: 5,
    name: 'Lyp',
    age: 19,
    avatar: 'http://aa'
  },
  {
    id: 5,
    name: 'Lyp',
    age: 19,
    avatar: 'http://aa'
  },
  {
    id: 5,
    name: 'Lyp',
    age: 19,
    avatar: 'http://aa'
  },
])


</script>

<template>
  
  <v-table :rows="rows">
    <v-column-group>
      <template #header>
        <span>6666</span>
      </template>
      <v-column field="id" title="#" width="80"></v-column>
      <v-column field="avatar" title="头像" width="100"></v-column>
    </v-column-group>
    
    <v-column field="name" title="名称" width="120"></v-column>
    <v-column field="age" title="年龄" width="80"></v-column>
    
  </v-table>

</template>

<style scoped>

</style>
