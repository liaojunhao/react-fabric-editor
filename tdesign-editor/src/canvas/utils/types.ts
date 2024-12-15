// 选择事件（用于广播）
export enum SelectEvent {
  ONE = 'selectOne',
  MULTI = 'selectMultiple',
  CANCEL = 'selectCancel',
  CHANGE = 'objectsChange',
  UPDATA = 'randomUpdata',
}

// 生命周期事件类型
export enum IEditorHooksType {
  hookImportBefore = 'hookImportBefore',
  hookImportAfter = 'hookImportAfter',
  hookSaveBefore = 'hookSaveBefore',
  hookSaveAfter = 'hookSaveAfter',
  hookTransform = 'hookTransform',
}
