import { Button } from "antd";
import React from "react";
interface ActionType {
  title: string;
  handler: () => void;
}

interface Props {
  actions: ActionType;
}

function ActionBar({ actions }: Props) {
  return (
    <div className="actionbar">
      <Button onClick={actions.handler}>ذخیره</Button>
    </div>
  );
}
export default ActionBar;
