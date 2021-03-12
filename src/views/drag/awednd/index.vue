<template>
  <div>
    <a-tabs v-model="acTab">
      <a-tab-pane key="Easy" tab="普通"></a-tab-pane>
      <a-tab-pane key="Complex" tab="复杂"></a-tab-pane>
    </a-tabs>
    <components :is="acTab" />
  </div>
</template>
<script>
import Easy from './Easy';
import Complex from './Complex';
export default {
  components: {
    Easy,
    Complex
  },
  data () {
    return {
      acTab: 'Easy'
    };
  },
  methods: {
  },
};
</script>
