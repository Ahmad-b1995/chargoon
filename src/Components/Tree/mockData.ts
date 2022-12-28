import { NodeType } from "../../types";

export function createTreeMockData(): NodeType[] {
  return [
    {
      key: "1",
      title: "شرکت چارگون",
      users: [],
      children: [
        {
          key: "2",
          title: "یاور کاردوست(مدیرعامل)",
          parentKey: "1",
          hierarchy: ["1", "2"],
          users: [
            {
              title: "superadmin",
              isDefault: true,
            },
          ],
          accesses: [],
          children: [
            {
              key: "3",
              title: "محسن پاکدل(مدیرفنی)",
              parentKey: "2",
              hierarchy: ["1", "2", "3"],
              users: [
                {
                  title: "admin",
                  isDefault: true,
                },
              ],
              children: [
                {
                  key: "4",
                  title: "علیرضا گلزاده(کارشناس رابط کاربری)",
                  parentKey: "3",
                  hierarchy: ["1", "2", "3", "4"],
                  users: [
                    {
                      title: "alireza",
                      isDefault: true,
                    },
                    {
                      title: "alirezatest",
                      isDefault: false,
                    },
                  ],
                  children: [],
                  accesses: [],
                },
              ],
              accesses: [],
            },
          ],
        },
      ],
      accesses: [],
      parentKey: null,
      hierarchy: [],
    },
    {
      key: "5",
      title: "2شرکت چارگون",
      users: [],
      children: [
        {
          key: "6",
          title: "یاور کاردوست2(مدیرعامل)",
          parentKey: "5",
          hierarchy: ["5", "6"],
          users: [
            {
              title: "superadmin",
              isDefault: true,
            },
          ],
          accesses: [],
          children: [
            {
              key: "7",
              title: "محسن پاکدل2(مدیرفنی)",
              parentKey: "6",
              hierarchy: ["5", "6", "7"],
              users: [
                {
                  title: "admin",
                  isDefault: true,
                },
              ],
              children: [
                {
                  key: "8",
                  title: "علیرضا گلزاده2(کارشناس رابط کاربری)",
                  parentKey: "7",
                  hierarchy: ["5", "6", "7", "8"],
                  users: [
                    {
                      title: "alireza",
                      isDefault: true,
                    },
                    {
                      title: "alirezatest",
                      isDefault: false,
                    },
                  ],
                  children: [],
                  accesses: [],
                },
              ],
              accesses: [],
            },
          ],
        },
      ],
      accesses: [],
      parentKey: null,
      hierarchy: [],
    },
    {
      key: "9",
      title: "3شرکت چارگون",
      users: [],
      children: [
        {
          key: "10",
          title: "یاور کاردوست3(مدیرعامل)",
          parentKey: "9",
          hierarchy: ["9", "10"],
          users: [
            {
              title: "superadmin",
              isDefault: true,
            },
          ],
          accesses: [],
          children: [
            {
              key: "11",
              title: "محسن پاکدل3(مدیرفنی)",
              parentKey: "10",
              hierarchy: ["11", "12", "13"],
              users: [
                {
                  title: "admin",
                  isDefault: true,
                },
              ],
              children: [
                {
                  key: "12",
                  title: "علیرضا گلزاده3(کارشناس رابط کاربری)",
                  parentKey: "11",
                  hierarchy: ["12", "13", "14", "15"],
                  users: [
                    {
                      title: "alireza",
                      isDefault: true,
                    },
                    {
                      title: "alirezatest",
                      isDefault: false,
                    },
                  ],
                  children: [],
                  accesses: [],
                },
              ],
              accesses: [],
            },
          ],
        },
      ],
      accesses: [],
      parentKey: null,
      hierarchy: [],
    },
  ];
}
