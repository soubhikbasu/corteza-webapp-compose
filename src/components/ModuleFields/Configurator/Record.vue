<template>
  <div>
    <b-form-group>
      <label
        class="d-block"
      >
        {{ $t('field.kind.record.moduleLabel') }}
      </label>
      <b-form-select
        v-model="f.options.moduleID"
        :options="sortedModules"
        text-field="name"
        value-field="moduleID"
        class="form-control"
      >
        <template
          slot="first">
          <option
            disabled
            :value="undefined"
          >
            {{ $t('field.kind.record.modulePlaceholder') }}
          </option>
        </template>
      </b-form-select>
    </b-form-group>

    <b-form-group>
      <label
        class="d-block"
      >
        {{ $t('field.kind.record.recordFieldLabel') }}
      </label>
      <b-form-select
        v-model="f.options.labelField"
        class="form-control"
        :options="fields"
        :disabled="!module"
      >
        <template
          slot="first"
        >
          <option
            disabled
            :value="undefined"
          >
            {{ $t('field.kind.record.recordFieldPlaceholder') }}
          </option>
        </template>
      </b-form-select>
    </b-form-group>
    <b-form-group>
      <label
        class="d-block"
      >
        {{ $t('field.kind.record.queryFieldsLabel') }}
      </label>
      <b-form-select
        v-model="f.options.queryFields"
        class="form-control"
        :options="fields"
        multiple
        v-if="!module"
      />
    </b-form-group>
    <b-form-group v-if="field.isMulti">
      <label
        class="d-block"
      >
        {{ $t('field.kind.select.optionType.label') }}
      </label>
      <b-form-radio-group
        v-model="f.options.selectType"
        :options="selectOptions"
        stacked
      />
    </b-form-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import base from './base'

export default {
  extends: base,

  data () {
    return {
      selected: null,
      selectOptions: [
        { text: this.$t('field.kind.select.optionType.default'), value: 'default' },
        { text: this.$t('field.kind.select.optionType.multiple'), value: 'multiple' },
        { text: this.$t('field.kind.select.optionType.each'), value: 'each' },
      ],
    }
  },

  computed: {
    ...mapGetters({
      modules: 'module/set',
    }),

    module () {
      if (this.field.options.moduleID !== '0') {
        return this.$store.getters['module/getByID'](this.field.options.moduleID)
      } else {
        return undefined
      }
    },

    sortedModules () {
      const modules = this.modules
      return modules.sort((a, b) => a.name.localeCompare(b.name))
    },

    fields () {
      return this.module ? this.module.fields.map(f => { return { value: f.name, text: f.label || f.name } }) : []
    },
  },

  watch: {
    'field.options.moduleID' () {
      this.field.options.labelField = undefined
      this.field.options.queryFields = []
      this.field.options.selectType = 'default'
    },
  },
}
</script>
