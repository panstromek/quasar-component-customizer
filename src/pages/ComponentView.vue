<template>
  <q-page padding>
    <div class="text-h5">
      {{component.name}}
    </div>
    <div class="q-pa-lg">
      <component :is="name" v-bind="binding"/>
    </div>
    <div class="row">
      <div :class="[prop.component.class]" v-for="prop in props" :key="prop.name">
        <component
          dense
          :is="prop.component.name"
          v-bind="component.props"
          v-model="binding[prop.name]"
          :label="prop.name"
          :hint="prop.desc"
        />
      </div>
    </div>
    <div class="text-h5 q-pa-md">
      Code:
    </div>
    <code>
      {{rendered}}
    </code>
  </q-page>
</template>

<script>
export default {
  name: 'ComponentView',
  props: {
    name: {
      type: String,
      default: '0'
    }
  },
  data () {
    const component = process.env.COMPONENTS.find(({ name }) => name === this.name)

    function getDefault (api) {
      if (api.default) {
        return api.default
      } else if (api.type === 'Boolean') {
        return false
      } else if (api.type === 'Array') {
        return []
      }
      return undefined
    }

    function getComponent (type) {
      if (Array.isArray(type)) {
        // TODO what here?
        return {
          name: 'QInput',
          class: 'col-4 q-pa-sm',
          props: {
            type: 'Text'
          }
        }
      } else if (type === 'Boolean') {
        return {
          name: 'QToggle',
          class: 'col-2 q-pa-sm'
        }
      } else if (type === 'Number') {
        return {
          name: 'QInput',
          class: 'col-4 q-pa-sm',
          props: {
            type: 'Number'
          }
        }
      }
      return {
        name: 'QInput',
        class: 'col-4 q-pa-sm',
        props: {}
      }
    }

    const props = Object.entries(component.api.props)
      .map(([name, api]) => ({
        name,
        api,
        ...api,
        component: getComponent(api.type)
      }))
      .sort((a, b) => a.type === 'Boolean' ? -1 : 1)

    console.log(component.api.props)
    const binding = props.reduce((binding, prop) => {
      binding[prop.name] = getDefault(prop.api)
      return binding
    }, {})

    return {
      component,
      props,
      binding
    }
  },
  computed: {
    rendered () {
      return `<${this.component.name}${this.renderedProps}/>`
    },
    renderedProps () {
      return Object.entries(this.binding)
        .map(([prop, value]) => {
          if (!value) {
            return ``
          }
          if (value === true) {
            return `
              ${prop}
            `
          }
          if (typeof value === 'number' || !isNaN(Number(value))) {
            return `
          :${prop}="${value}"
          `
          }

          return `
          ${prop}="${value}"
          `
        })
        .reduce((list, attr) => list + attr, ``)
    }
  }
}
</script>
