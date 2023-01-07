import { AutoComplete, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { getUsers } from "../../transportLayer";
import { NodeType, UserType } from "../../types";
import UserTable from "./user-table";

interface Props {
  handleFormChange: (key: string, value: string | any[]) => void;
  initialValue: NodeType;
}

const UserAutoComplete: React.FC<Props> = ({
  handleFormChange,
  initialValue,
}) => {
  const orginalOptions = useRef([]);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [selectedUser, setSelectedUser] = useState<string>();
  const [userList, setUserList] = useState<UserType[]>([]);

  useEffect(() => {
    getUsers().then((users) => {
      orginalOptions.current = users;
      setOptions(users);
    });
    if (initialValue?.users) setUserList(initialValue.users);
  }, []);

  useEffect(() => {
    handleFormChange("users", userList);
  }, [userList]);

  const onSearch = (searchText: string) => {
    setOptions(
      orginalOptions.current.filter((o) => o.label.indexOf(searchText) > -1)
    );
  };

  const onSelect = (data: string) => {
    setSelectedUser(data);
  };

  const btnClickHandler = () => {
    if (userList.find((item: UserType) => item.title === selectedUser)) return;
    const newUser = { title: selectedUser, isDefault: false };
    setUserList((prevSelectedUsers) => [newUser, ...prevSelectedUsers]);
  };

  const handleUserDelete = (title: string) => {
    const index = userList.findIndex((item: UserType) => {
      return item.title === title;
    });
    setUserList((prevUserList) =>
      prevUserList.filter((item) => item.title !== title)
    );
  };

  return (
    <>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="جستجوی کاربر"
      />
      <Button onClick={btnClickHandler}>افزودن</Button>
      {userList.length != 0 && (
        <UserTable
          users={userList}
          handleFormChange={handleFormChange}
          onDeleteUser={handleUserDelete}
        />
      )}
    </>
  );
};

export default UserAutoComplete;
