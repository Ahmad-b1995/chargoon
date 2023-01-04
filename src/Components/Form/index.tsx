import { Tabs } from "antd";
import { useState } from "react";
import ErrorBoundry from "../../ErrorBoundry";
import { NodeType } from "../../types";
import ActionBar from "../ActionBar";
import Accesses from "./accesses";
import BasicInformation from "./basic-information";

interface Props {
  item: NodeType;
  updateNode: (key: string, data: any) => void;
}

function Form({ item, updateNode }: Props) {
  const [node, setNode] = useState({});

  const handleFormChange = (key: string, value: string | string[]) => {
    setNode((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    
  };

  const handleFormSubmit = () => {
    updateNode(item.key, node);
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
              <ErrorBoundry>
                <Accesses handleFormChange={handleFormChange} />
              </ErrorBoundry>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <ActionBar actions={{ title: "save", handler: handleFormSubmit }} />
    </div>
  );
}
export default Form;
