import { AutoComplete, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { getUsers } from "../../transportLayer";
import { UserType } from "../../types";
import UserTable from "./user-table";

interface Props {
  handleFormChange: (key: string, value: string | any[]) => void;
}

const UserAutoComplete: React.FC<Props> = ({ handleFormChange }) => {
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
        <UserTable users={userList} handleFormChange={handleFormChange} />
      )}
    </>
  );
};

export default UserAutoComplete;
