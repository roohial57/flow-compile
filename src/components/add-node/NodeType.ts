// Define the enum for variable types
export const NodeType = Object.freeze({
  Start: { value: 'Start', title: "شروع" },
  End: { value: 'End', title: "پایان" },
  Declaration: { value: 'Declaration', title: "تعریف متغییر ها", canAdd: true, canEdit: true, },
  Operation: { value: 'Operation', title: "عملیات", canAdd: true, canEdit: true, },
  Input: { value: 'Input', title: "ورودی", canAdd: true, canEdit: true, },
  Output: { value: 'Output', title: "خروجی", canAdd: true, canEdit: true, },
  Condition: { value: 'Condition', title: "شرط", canAdd: true, canEdit: true },
  getValues: function () {
    return Object.values(this);
  }
});