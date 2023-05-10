
const toArray = function () {
  return Object.values(this);
};
export const NodeType = Object.freeze({
  Operation: { value: 'Operation', title: "عملیات" },
  Condition: { value: 'Condition', title: "شرط" },
  getValues:toArray
});
