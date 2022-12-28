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
        setShowEdit(true)
        break;
      case "ACTION2":
        if (node.children.length)
          return alert("moving prohibited on nodes with children!");
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

  const pasteNode = (node: NodeType) => {
    if (!nodeToPaste) return alert("no node to paste!");
    nodeToPaste.parentKey = node.key;
    nodeToPaste.hierarchy = [node.key, nodeToPaste.key];
    const newTreeData = removeByKey(treeData, nodeToPaste.key);
    const nodeIndex = treeData.findIndex(
      (item: NodeType) => item.key === node.key
    );
    newTreeData[nodeIndex].children = [
      nodeToPaste,
      ...newTreeData[nodeIndex].children,
    ];
    setTreeData(newTreeData);
  };

  const filterTreeData = (node: NodeType) => {
    if (node.children.length)
      return alert("deletion prohibited because of children!");
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
    console.log("kjkj");
    console.log(nodes);

  };

  const handleUpdateNode = (key: string, data: any) => {
    console.log("kjkj");
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
