import { Button } from "antd";
import React from "react";
interface ActionType {
  title: string;
  handler: (title: string) => void;
}

interface Props {
  actions: ActionType;
}

function ActionBar({ actions }: Props) {
  return (
    <div className="actionbar">
      <Button onClick={() => actions.handler(actions.title)}>ذخیره</Button>
    </div>
  );
}
export default ActionBar;
