<template>
  <div v-if="options">
    <p v-if="recordCreatorModule">
      <i18next path="block.recordCreator.preview.fieldsFromModule" tag="label">
        <span>{{ selectedFields }}</span>
        <code>{{ recordCreatorModule.name || $t('block.recordCreator.preview.untitled') }}</code>
      </i18next>
    </p>
  </div>
</template>
<script>
import base from './base'
import { mapGetters } from 'vuex'

export default {
  extends: base,

  computed: {
    ...mapGetters({
      modules: 'module/set',
    }),

    recordCreatorModule () {
      if (this.options.moduleID !== '0') {
        return this.$store.getters['module/getByID'](this.options.moduleID)
      } else {
        return undefined
      }
    },

    selectedFields () {
      return this.options.fields.filter(f => !!f).map(f => f.name).join(', ')
    },
  },
}
</script>
