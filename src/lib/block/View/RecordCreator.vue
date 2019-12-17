<template>
  <b-form v-if="options && newRecord" class="record" @submit.prevent="onSubmit">
    <div v-for="(field, index) in fields"
         class="field"
         :key="index">
      <div v-if="field.canUpdateRecordValue">
        <field-editor :namespace="namespace"
                      :field="field"
                      :record="newRecord"
                      edit-mode
        />
      </div>
      <i v-else>{{ $t('field.noPermission') }}</i>
    </div>

    <div class="position-sticky fixed-bottom bg-white text-right pt-1">
      <b-button
        type="submit"
      >
        {{ $t('general.label.save') }}
      </b-button>
    </div>
  </b-form>
</template>
<script>
import base from './base'
import FieldEditor from 'corteza-webapp-compose/src/lib/field/Editor'
import uiScriptRunner from 'corteza-webapp-compose/src/mixins/ui-script-runner'
import users from 'corteza-webapp-compose/src/mixins/users'
import Record from 'corteza-webapp-common/src/lib/types/compose/record'

export default {
  components: {
    FieldEditor,
  },

  extends: base,

  mixins: [
    users,
    uiScriptRunner,
  ],

  data () {
    return {
      newRecord: undefined,
    }
  },

  computed: {
    fields () {
      if (this.recordCreatorModule) {
        return this.recordCreatorModule.filterFields(this.options.fields)
      }
    },

    recordCreatorModule () {
      if (this.options.moduleID !== '0') {
        return this.$store.getters['module/getByID'](this.options.moduleID)
      } else {
        return undefined
      }
    },
  },

  created () {
    this.makeFreshRecord()
  },

  methods: {
    makeFreshRecord () {
      this.newRecord = new Record(this.recordCreatorModule)
    },

    onSubmit (e) {
      this
        .createRecord(this.namespace, this.recordCreatorModule, this.newRecord)
        .then((record) => {
          this.raiseSuccessAlert(this.$t('notification.record.created'))
          this.makeFreshRecord()
          // this.$router.push({ name: 'page.record', params: { ...this.$route.params, recordID: record.recordID } })
        })
        .catch(this.defaultErrorHandler(this.$t('notification.record.createFailed')))
    },
  },
}
</script>
<style scoped lang="scss">

.record {
  .field {
    margin-bottom: 10px;

    label {
      font-weight: 900;
      display: block;
      font-size: 12px;
      font-family: $bold;
    }

    div {
      min-width: 200px;
      display: inline-block;
    }

    i {
      color: $secondary;
    }
  }
}
</style>
