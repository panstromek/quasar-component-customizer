<template>
  <div>
    <div class="q-pa-xs" dense v-for="component in components" :key="component.name">
      <q-btn :label="component.name"
             :to="`/components/${component.name}`"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TestComponent',
  created () {
  },
  data () {
    return {
      components: process.env.COMPONENTS
    }
  },
  methods: {
    /**
     * @this {Vue}
     */
    annotated () {

    },
    blank () {
      this.$emit()
    }
  }
}

</script>
