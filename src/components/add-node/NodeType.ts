interface NodeTypeValue {
  value: string;
  title: string;
  canAdd?: boolean;
  canEdit?: boolean;
}

enum NodeType {
  Start = 'Start',
  End = 'End',
  Declaration = 'Declaration',
  Operation = 'Operation',
  Input = 'Input',
  Output = 'Output',
  Condition = 'Condition',
}

const NodeTypeDetails: { [key in NodeType]: NodeTypeValue } = {
  [NodeType.Start]: { value: 'Start', title: "شروع" },
  [NodeType.End]: { value: 'End', title: "پایان" },
  [NodeType.Declaration]: { value: 'Declaration', title: "تعریف متغییر ها", canAdd: true, canEdit: true },
  [NodeType.Operation]: { value: 'Operation', title: "عملیات", canAdd: true, canEdit: true },
  [NodeType.Input]: { value: 'Input', title: "ورودی", canAdd: true, canEdit: true },
  [NodeType.Output]: { value: 'Output', title: "خروجی", canAdd: true, canEdit: true },
  [NodeType.Condition]: { value: 'Condition', title: "شرط", canAdd: true, canEdit: true }
}

export { NodeType, NodeTypeValue, NodeTypeDetails };