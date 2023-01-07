import React from "react";
import { NodeType } from "../../types";
import {
  ContextMenuTriggerEx,
  ContextMenuItemEx,
  ContextMenuEx,
} from "../ContextMenu";

interface Props {
  node: NodeType;
  handleContextMenuClick: (key: string, node: NodeType, event: Event) => void;
}

function Node({ node, handleContextMenuClick }: Props) {
  return (
    <div>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}
      <ContextMenuTriggerEx id={node.key} title={node.title} />

      <ContextMenuEx id={node.key}>
        <ContextMenuItemEx
          handleClick={(e: Event) => handleContextMenuClick("ACTION1", node, e)}
          title={"افزودن زیرشاخه"}
        />
        <ContextMenuItemEx
          handleClick={(e: Event) => handleContextMenuClick("ACTION2", node, e)}
          title={"برش"}
        />
        <ContextMenuItemEx
          handleClick={(e: Event) => handleContextMenuClick("ACTION3", node, e)}
          title={"چسباندن"}
        />
        <ContextMenuItemEx
          handleClick={(e: Event) => handleContextMenuClick("ACTION4", node, e)}
          title={"حذف"}
        />
      </ContextMenuEx>
    </div>
  );
}
export default Node;
