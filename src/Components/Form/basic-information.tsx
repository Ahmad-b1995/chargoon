import { Form, Input } from "antd";
import { NamePath } from "antd/lib/form/interface";
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
      fields={[
        {
          name: "title",
          value: initialValue?.title,
        },
        {
          name: "key",
          value: initialValue?.key,
        },
      ]}
      initialValues={initialValue}
      onFieldsChange={(field) =>
        handleFormChange(field[0].name.toString(), field[0].value.toString())
      }
    >
      <Form.Item name="title" label="عنوان" labelCol={{ span: 2 }}>
        <Input  />
      </Form.Item>
      <Form.Item name="key" label="کد" labelCol={{ span: 2 }}>
        <Input />
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
