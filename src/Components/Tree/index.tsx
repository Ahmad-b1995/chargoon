import { Input, Tree } from "antd";
import type { DataNode } from "antd/es/tree";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import AppContext from "../../appContext";
import { NodeType } from "../../types";
import ArrowDownIcon from "../SvgIcons/arrow-down";
import ArrowUpIcon from "../SvgIcons/arrow-up";
import Node from "./node";
import SearchResult from "./searchResult";

const { Search } = Input;

interface Props {
  handleContextMenuClick: (key: string, node: NodeType) => void;
}

const ExtendedTree: React.FC<Props> = ({ handleContextMenuClick }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchResultVisible, setSearchResultVisible] = useState(false);
  const { treeData } = useContext(AppContext);
  const [filteredData, setFilteredData] = useState([]);
  const tempFilteredData: NodeType[] = [];

  const onExpand = (newExpandedKeys: any[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search(treeData, e.target.value);
  };

  const search = (input: NodeType[], filter: string) => {
    input.forEach((item) => {
      if (item.title.includes(filter)) {
        tempFilteredData.push(item);
        setFilteredData(tempFilteredData);
      }
      if (item.children && item.children.length) search(item.children!, filter);
    });
  };

  const handlePressEnter = () => {
    setSearchResultVisible(true);
  };

  const titleRenderer = (node: NodeType) => {
    return <Node node={node} handleContextMenuClick={handleContextMenuClick} />;
  };

  return (
    <div className="tree-wrap">
      <Search
        style={{ marginBottom: 8 }}
        placeholder="جستجو"
        onChange={handleSearchInputChange}
        onPressEnter={handlePressEnter}
        onPaste={handlePressEnter}
        onSearch={handlePressEnter}
      />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        titleRender={titleRenderer}
      />
      <div style={{ marginTop: "auto" }}>
        <div
          className="arrow-container"
          onClick={() => setSearchResultVisible((visibility) => !visibility)}
        >
          {searchResultVisible ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </div>
        {searchResultVisible && <SearchResult items={filteredData} />}
      </div>
    </div>
  );
};

export default ExtendedTree;
