import { NodeType } from "../../types";
import Modal from "../Modal";
import { Popover } from "antd";
import { useContext } from "react";
import AppContext from "../../appContext";
import OrgchartIcon from "../SvgIcons/orgchart";

interface Props {
  items: (NodeType & { hierarchy: string[] })[];
}

function SearchResult({ items }: Props) {
  const { treeData } = useContext(AppContext);
  let path: { [key: string]: string[] } = {};
  const calculatePath = (hierarchy: string[], title: string) => {
    hierarchy.forEach((item: string) => {
      findTitleByKey(treeData, item, title);
    });
    return (
      <div>
        <p>{path[title] && path[title].join(" >> ")}</p>
      </div>
    );
  };

  const findTitleByKey = (
    treeData: NodeType[],
    key: string,
    nodeTitle: string
  ) => {
    treeData.find((item: NodeType) => {
      if (item.key === key) {
        if (path[nodeTitle]) {
          path[nodeTitle].push(item.title);
        } else {
          path[nodeTitle] = [];
          path[nodeTitle].push(item.title);
        }
      }
      if (item.children && item.children.length)
        findTitleByKey(item.children!, key, nodeTitle);
    });
  };

  return (
    <div className="search-result" style={{ height: 200, overflow: "auto" }}>
      {items.map((item) => (
        <div
          key={item.key}
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div>{item.title}</div>
          <Popover
            content={calculatePath(item.hierarchy, item.title)}
            trigger="click"
            placement="left"
          >
            {item.hierarchy.length > 0 && (
              <div style={{ width: "20px" }}>
                <OrgchartIcon />
              </div>
            )}
          </Popover>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;
