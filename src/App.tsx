import { useEffect, useContext, useState, useMemo } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from "./Components/Tree";
import { getNodes } from "./transportLayer";
import { NodeType } from "./types";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [treeData, setTreeData] = useState([]);
  let nodeToPaste: NodeType | null = null;

  const fetchTreeData = async () => {
    const result = await getNodes();
    setTreeData(result);
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  const handleContextMenuClick = (actionKey: any, node: NodeType) => {
    switch (actionKey) {
      case "ACTION1":
        setSelectedItem(node);
        setShowEdit(true);
        break;
      case "ACTION2":
        if (node.children?.length)
          return alert("moving's prohibited on nodes with children!");
        nodeToPaste = node;
        break;
      case "ACTION3":
        pasteNode(node);
        break;
      case "ACTION4":
        filterTreeData(node);
        break;
    }
  };

  let newTreeData: NodeType[] = [];
  const pasteNode = (node: NodeType) => {
    if (!nodeToPaste) return alert("no node to paste!");
    nodeToPaste.parentKey = node.key;
    nodeToPaste.hierarchy = [node.key, nodeToPaste.key];
    newTreeData = removeByKey(treeData, nodeToPaste.key);
    const nodeIndex = treeData.findIndex(
      (item: NodeType) => item.key === node.key
    );
    addByKey(newTreeData, nodeToPaste, node.key);
  };

  const addByKey = (treeData: NodeType[], node: NodeType, key: string) => {
    treeData.forEach((item: NodeType) => {
      if (item.key === key) {
        item.children.unshift(node);
        return setTreeData(newTreeData);
      } else {
        addByKey(item.children, node, key);
      }
    });
  };

  const filterTreeData = (node: NodeType) => {
    if (node.children?.length)
      return alert("deletion prohibited for nodes with children!");
    if (!window.confirm("Are you sure to delete item?")) return;
    const newTreeData = removeByKey(treeData, node.key);
    setTreeData(newTreeData);
  };

  const removeByKey = (
    treeData: NodeType[],
    removingKey: string
  ): NodeType[] => {
    return treeData
      .filter((a: NodeType) => a.key !== removingKey)
      .map((e: NodeType) => {
        return { ...e, children: removeByKey(e.children || [], removingKey) };
      });
  };

  const handleUpdateTree = (nodes: NodeType[]) => {
    setTreeData(nodes);
  };

  const handleUpdateNode = (keyOrHierarchy: string | string[], data: any) => {
    setShowEdit(false);
    findAndAddToTree(treeData, keyOrHierarchy, data);
  };

  const findAndAddToTree = (
    nodeData: NodeType[],
    keyOrHierarchy: string | string[],
    child: NodeType
  ) => {
    let key =
      typeof keyOrHierarchy === "string"
        ? keyOrHierarchy
        : keyOrHierarchy[keyOrHierarchy.length - 1];

    nodeData.forEach((node: NodeType) => {
      if (node.key === key) {
        node.children.unshift({
          ...child,
          hierarchy: [
            ...(typeof keyOrHierarchy === "string" ? [key] : keyOrHierarchy),
            child.key,
          ],
          children: [],
          parentKey: key,
          data: [],
        });
        return setTreeData((prevTree: NodeType[]) => [...prevTree]);
      } else {
        findAndAddToTree(node.children, keyOrHierarchy, child);
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        treeData,
        updateTreeData: handleUpdateTree,
      }}
    >
      <div className="App">
        <Sidebar>
          <ExtendedTree handleContextMenuClick={handleContextMenuClick} />
        </Sidebar>
        {showEdit && <Form item={selectedItem} updateNode={handleUpdateNode} />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
