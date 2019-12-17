<template>
  <b-tab :title="$t('block.record.label')">
    <fieldset class="form-group">
      <label>{{ $t('block.general.module') }}</label>
      <b-form-select v-model="o.moduleID" required>
        <option :value="undefined">{{ $t('general.label.none') }}</option>
        <option
          v-for="module in modules"
          :key="module.moduleID"
          :value="module.moduleID">

          {{ module.name }}
        </option>
      </b-form-select>
    </fieldset>
    <field-picker
      v-if="recordCreatorModule"
      :module="recordCreatorModule"
      :fields.sync="o.fields"
      :system-fields="[]"
    />
  </b-tab>
</template>
<script>
import { mapGetters } from 'vuex'
import base from './base'
import FieldPicker from 'corteza-webapp-compose/src/components/Common/Module/FieldPicker'

export default {
  name: 'Record',

  components: {
    FieldPicker,
  },

  extends: base,

  computed: {
    ...mapGetters({
      modules: 'module/set',
    }),

    recordCreatorModule () {
      if (this.o.moduleID !== '0') {
        return this.$store.getters['module/getByID'](this.o.moduleID)
      } else {
        return undefined
      }
    },
  },

  watch: {
    'o.moduleID' (newModuleID) {
      // Everytime moduleID changes, do a lookup among module-page pairs and
      // reset the pageID
      this.o.pageID = this.modulePageID[newModuleID] || undefined
      this.o.fields = []
    },
  },
}
</script>
<style lang="scss" scoped>
  div.fields {
    display: flex;
    flex-flow: row nowrap;

    & > div {
      flex: 1;
      margin: 5px;

      button.all {
        float: right;
        font-size: 80%;
      }

      .drag-area {
        height: 150px;
        overflow-x: auto;
        border: 1px solid silver;
        padding: 2px;
      }
    }
  }
</style>
