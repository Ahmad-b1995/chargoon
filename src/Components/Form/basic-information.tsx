import { Form, Input } from "antd";
import { useState } from "react";
import UserAutoComplete from "./user-autocomplete";

interface Props {
  handleFormChange: (key: string, value: string | any[]) => void;
}

const BasicInformation: React.FC<Props> = ({ handleFormChange }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item name="title" label="عنوان" labelCol={{ span: 2 }}>
        <Input onChange={(e) => handleFormChange("title", e.target.value)} />
      </Form.Item>
      <Form.Item name="code" label="کد" labelCol={{ span: 2 }}>
        <Input onChange={(e) => handleFormChange("code", e.target.value)} />
      </Form.Item>
      <Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
        <UserAutoComplete handleFormChange={handleFormChange} />
      </Form.Item>
    </Form>
  );
};
export default BasicInformation;
