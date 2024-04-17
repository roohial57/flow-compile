
const toArray = function () {
  return Object.values(this);
};
export const NodeType = Object.freeze({
  Start: { value: 'Start', title: "شروع" },
  End: { value: 'End', title: "پایان" },
  Declaration: { value: 'Declaration', title: "تعریف متغییر ها", canAdd: true, canEdit: true, },
  Operation: { value: 'Operation', title: "عملیات", canAdd: true, canEdit: true, },
  Input: { value: 'Input', title: "ورودی", canAdd: true, canEdit: true, },
  Output: { value: 'Output', title: "خروجی", canAdd: true, canEdit: true, },
  Condition: { value: 'Condition', title: "شرط", canAdd: true, canEdit: true },
  getValues: toArray
});


export const VariableType = Object.freeze({
  Number: { value: 'Number', title: "عدد" },
  NumberList: { value: 'NumberList', title: "لیست عدد" },
  String: { value: 'String', title: "رشته حروف" },
  StringList: { value: 'StringList', title: "لیست رشته" },
  Boolean: { value: 'Boolean', title: "منطقی Boolean" },
  BooleanList: { value: 'BooleanList', title: "لیست Boolean" },
});
