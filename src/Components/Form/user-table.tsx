import { useReducer } from "react";
import { UserType } from "../../types";

interface Props {
  users: UserType[];
  handleFormChange: (key: string, value: string | any[]) => void;
}

const UserTable: React.FC<Props> = ({ users, handleFormChange }) => {
  const checkboxChangeHandler = (title: string, checked: boolean) => {
    users.map((item: UserType) => (item.isDefault = false));
    const index = users.findIndex((item: UserType) => item.title === title);
    users[index].isDefault = checked;
    handleFormChange('users',users);
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
              >
                حذف
              </td>
              <td
                style={{ border: "solid black 1px", padding: ".2rem .5rem " }}
              >
                <input
                  type="checkbox"
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
