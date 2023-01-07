import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { NodeType } from "../../types";
import UserAutoComplete from "./user-autocomplete";

interface Props {
  handleFormChange: (key: string, value: string | any[]) => void;
  initialValue: NodeType;
}

const BasicInformation: React.FC<Props> = ({
  handleFormChange,
  initialValue,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValue) {
      handleFormChange("title", initialValue.title);
      handleFormChange("key", initialValue.key);
    }
  }, []);

  return (
    <Form
      form={form}
      // initialValues={initialValue}
      initialValues={{
        ["title"]: initialValue.title,
        ["key"]: initialValue.key,
      }}

      
    >
      <Form.Item name="title" label="عنوان" labelCol={{ span: 2 }}>
        <Input onChange={(e) => handleFormChange("title", e.target.value)} />
      </Form.Item>
      <Form.Item name="key" label="کد" labelCol={{ span: 2 }}>
        <Input onChange={(e) => handleFormChange("key", e.target.value)} />
      </Form.Item>
      <Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
        <UserAutoComplete
          handleFormChange={handleFormChange}
          initialValue={initialValue}
        />
      </Form.Item>
    </Form>
  );
};
export default BasicInformation;
