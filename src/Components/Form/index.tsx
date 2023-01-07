import { Input, Tabs } from "antd";
import React, { useState } from "react";
import { NodeType } from "../../types";
import ActionBar from "../ActionBar";
import Accesses from "./accesses";
import BasicInformation from "./basic-information";
import UsersList from "./user-autocomplete";

interface Props {
  item: NodeType;
  type: string;
  updateNode: (key: string | string[], type: string, data: any) => void;
}

function Form({ item, type, updateNode }: Props) {
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
    setNode((prevState: NodeType) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSave = (title: string) => {
    if ("title" in node && "key" in node && node.key.length > 0) {
      updateNode(
        item.hierarchy?.length ? item.hierarchy : item.key,
        type,
        node
      );
    } else {
      alert(
        "title & key cannot be empty.\nkey must be at least one character long."
      );
    }
  };

  return (
    <div className="detail">
      <div>
        <Tabs>
          <Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
            <div className="form-content">
              <BasicInformation
                initialValue={type === "edit" ? item : null}
                handleFormChange={handleFormChange}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="دسترسی ها" key="item-2">
            <div className="form-content">
              <Accesses
                initialValue={item}
                handleFormChange={handleFormChange}
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <ActionBar actions={{ title: type, handler: handleSave }} />
    </div>
  );
}
export default Form;
