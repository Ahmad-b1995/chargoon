import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { getAccessList } from "../../transportLayer";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

interface Props {
  handleFormChange: (key: string, value: string | any[]) => void;
}

function Accesses({ handleFormChange }: Props) {
  const [options, setOptions] = useState([]);

  const fetchAccessList = async () => {
    const result = await getAccessList();
    setOptions(result);
  };

  useEffect(() => {
    fetchAccessList();
  }, []);

  function handleOnChange(checkedValues: CheckboxValueType[]) {
    handleFormChange('accesses', checkedValues)
  }

  return <Checkbox.Group options={options as any} onChange={handleOnChange} />;
}
export default Accesses;
