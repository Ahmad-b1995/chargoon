import { ChangeEvent, useEffect, useReducer, useState } from "react";
import { NodeType, UserType } from "../../types";

interface Props {
  users: UserType[];
  handleFormChange: (key: string, value: string | any[]) => void;
  onDeleteUser: (title: string) => void;
}

const UserTable: React.FC<Props> = ({ users, handleFormChange ,onDeleteUser}) => {
  const checkboxChangeHandler = (title: string, checked: boolean) => {
    users.map((item: UserType) => (item.isDefault = false));
    const index = users.findIndex((item: UserType) => item.title === title);
    users[index].isDefault = checked;
    handleFormChange("users", users);
  };

  const disableCheckbox = (title: string) => {
    const index = users.findIndex((item: UserType) => item.isDefault === true);
    if (index !== -1) {
      if (title === users[index].title) {
        return false;
      } else return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <table style={{ marginTop: "10px" }}>
        <thead style={{ backgroundColor: "#b8b8b8" }}>
          <tr>
            <th style={{ padding: ".2rem .5rem " }}>عملیات</th>
            <th style={{ padding: ".2rem .5rem " }}>پیش فرض</th>
            <th style={{ padding: ".2rem .5rem " }}>نام</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item: UserType) => (
            <tr key={item.title}>
              <td
                style={{ border: "solid black 1px", padding: ".2rem .5rem " }}
                onClick={() => onDeleteUser(item.title)}
              >
                حذف
              </td>
              <td
                style={{ border: "solid black 1px", padding: ".2rem .5rem " }}
              >
                <input
                  type="checkbox"
                  disabled={disableCheckbox(item.title)}
                  onChange={(e) =>
                    checkboxChangeHandler(item.title, e.target.checked)
                  }
                />
              </td>
              <td
                style={{ border: "solid black 1px", padding: ".2rem .5rem " }}
              >
                {item.title}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
