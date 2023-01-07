import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { getAccessList } from "../../transportLayer";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { NodeType } from "../../types";

interface Props {
  handleFormChange: (key: string, value: string | any[]) => void;
  initialValue: NodeType;
}

function Accesses({ handleFormChange, initialValue }: Props) {
  const [options, setOptions] = useState([]);

  const fetchAccessList = async () => {
    const result = await getAccessList();
    setOptions(result);
  };

  useEffect(() => {
    fetchAccessList();
  }, []);

  function handleOnChange(checkedValues: CheckboxValueType[]) {
    handleFormChange("accesses", checkedValues);
  }

  return (
    <Checkbox.Group
      defaultValue={initialValue.accesses}
      options={options as any}
      onChange={handleOnChange}
    />
  );
}
export default Accesses;
