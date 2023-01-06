import { Tabs } from "antd";
import { useState } from "react";
import ErrorBoundry from "../../ErrorBoundry";
import { NodeType } from "../../types";
import ActionBar from "../ActionBar";
import Accesses from "./accesses";
import BasicInformation from "./basic-information";

interface Props {
  item: NodeType;
  updateNode: (key: string | string[], data: any) => void;
}

function Form({ item, updateNode }: Props) {
  const [node, setNode] = useState<NodeType>({
    title: "",
    users: [],
    key: "",
    children: [],
    parentKey: "",
    data: [],
    hierarchy: [],
    accesses: [],
  });

  const handleFormChange = (key: string, value: string | string[]) => {
    setNode((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleFormSubmit = () => {
    if ("title" in node && "key" in node && node.key.length > 0) {
      updateNode(item.hierarchy || item.key, node);
    } else {
      alert("title & key cannot be empty.\nkey must be at least one character long.");
    }
  };

  return (
    <div className="detail">
      <div>
        <Tabs>
          <Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
            <div className="form-content">
              <BasicInformation handleFormChange={handleFormChange} />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="دسترسی ها" key="item-2">
            <div className="form-content">
              <Accesses handleFormChange={handleFormChange} />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <ActionBar actions={{ title: "save", handler: handleFormSubmit }} />
    </div>
  );
}
export default Form;
