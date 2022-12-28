import { Button } from "antd";
import React from "react";
interface ActionType {
  title: string;
  handler: () => void;
}

interface Props {
  actions: ActionType[];
}

function ActionBar({ actions }: Props) {
  return (
    <div className="actionbar">
      <Button htmlType="submit">ذخیره</Button>
    </div>
  );
}
export default ActionBar;
