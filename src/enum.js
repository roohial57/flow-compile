
const toArray = function () {
  return Object.values(this);
};
export const NodeType = Object.freeze({
  Start: { value: 'Start', title: "شروع" },
  End: { value: 'End', title: "پایان" },
  Operation: { value: 'Operation', title: "عملیات", canAdd:true },
  Condition: { value: 'Condition', title: "شرط", canAdd:true },
  getValues:toArray
});
