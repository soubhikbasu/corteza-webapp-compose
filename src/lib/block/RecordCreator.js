import { PropCast, ID } from 'corteza-webapp-common/src/lib/types/common'

export class RecordCreator {
  constructor (o = {}) {
    this.moduleID = PropCast(ID, o.moduleID)
    this.pageID = PropCast(ID, o.pageID)
    this.fields = o.fields || []
  }
}
