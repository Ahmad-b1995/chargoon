export interface UserType {
  title: string;
  isDefault: boolean;
}
export interface NodeType {
  [key: string]: string | UserType[] | NodeType[] | string[];
  title: string;
  users: UserType[];
  key: string;
  children?: NodeType[];
  parentKey?: string;
  data?: any[];
  hierarchy: string[];
  accesses: string[];
}
