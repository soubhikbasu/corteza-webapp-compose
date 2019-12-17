<template>
    <div class="d-flex flex-wrap">
        <b-button
            variant="outline-primary"
            class="p-5 m-1 flex-fill"
            @click="$emit('select', type.block)"
            v-for="(type) in types"
            :disabled="recordPage === type.disabledIfRecordPage"
            :key="type.label">{{type.label}}</b-button>
      <div class="w-100">
        <hr />
        <i>{{ $t('page.build.selectBlockFootnote') }}.</i>
      </div>
    </div>
</template>
<script>
import Block from 'corteza-webapp-compose/src/lib/block'

export default {
  props: {
    recordPage: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      types: [
        {
          label: this.$t('block.content.label'),
          block: new Block({ kind: 'Content' }),
        },
        {
          label: this.$t('block.chart.label'),
          block: new Block({ kind: 'Chart' }),
        },
        {
          label: this.$t('block.socialFeed.label'),
          block: new Block({ kind: 'SocialFeed' }),
        },
        {
          label: this.$t('block.record.label'),
          block: new Block({ kind: 'Record' }),
          disabledIfRecordPage: false,
        },
        {
          label: this.$t('block.recordCreator.label'),
          block: new Block({ kind: 'RecordCreator' }),
          disabledIfRecordPage: true,
        },
        {
          label: this.$t('block.recordList.label'),
          block: new Block({ kind: 'RecordList' }),
        },
        {
          label: this.$t('block.automation.label'),
          block: new Block({ kind: 'Automation' }),
        },
        {
          label: this.$t('block.calendar.label'),
          block: new Block({ kind: 'Calendar' }),
        },
        {
          label: this.$t('block.file.label'),
          block: new Block({ kind: 'File' }),
        },
        {
          label: this.$t('block.recordOrganizer.label'),
          block: new Block({ kind: 'RecordOrganizer' }),
        },
      ],
    }
  },
}
</script>
