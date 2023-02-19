import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Tree from "react-ui-tree";

import Icon from "react-icons-kit";
import { folder } from "react-icons-kit/feather/folder";
import { file } from "react-icons-kit/feather/file";
import { folderPlus } from "react-icons-kit/feather/folderPlus";
import { filePlus } from "react-icons-kit/feather/filePlus";
import { chevronsRight } from "react-icons-kit/feather/chevronsRight";
import { chevronsDown } from "react-icons-kit/feather/chevronsDown";
import styled from "styled-components";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import _ from "lodash";
import { StrollableContainer } from "react-stroller";
import deepdash from "deepdash";
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

import "react-ui-tree/dist/react-ui-tree.css";
import "./FileExplorer.css";

// add deepdash to lodash
deepdash(_);

function collect(props) {
  return props;
}

function deleteFromTree(o, id) {
  function getNode(a, i) {
    if (a.id === id) {
      index = i;
      return true;
    }
    if (Array.isArray(a.children) && a.children.some(getNode)) {
      if (~index) {
        a.children.splice(index, 1);
        index = -1;
      }
      return true;
    }
  }

  var index = -1;
  [o].some(getNode);
}

class FileExplorer extends Component {
  state = {
    tree: {
      ...this.props.tree
    },
    collapsed: false // start with unmodified tree
  };

  renderNode = (node) => {
    const renderFileFolderToolbar = (isFolder, caption) => (
      <Toolbar style={{color: this.props.setting.theme === 'vs-dark'?"#d8e0f0":"#404040"}}>
        <FloatLeft>
          <Icon icon={isFolder ? folder : file} />
          {caption}
        </FloatLeft>
        <ToolbarFileFolder>
          {isFolder && (
            <Fragment>
              <Icon
                title="New Folder"
                icon={folderPlus}
                onClick={() => this.addItem("folder", node)}
              />
              <Icon
                title="New File"
                icon={filePlus}
                onClick={() => this.addItem("file", node)}
              />
            </Fragment>
          )}
        </ToolbarFileFolder>
      </Toolbar>
    );

    /*const attributes = {
      "data-count": 0,
      className: "example-multiple-targets well"
    };*/

    const isFolder = node.hasOwnProperty("children");
    return (
      <div onClick={()=>{this.handleLeftClick(node)}}>
      <ContextMenuTrigger
        id="FILE_CONTEXT_MENU"
        key={node.id}
        name={node.id}
        collect={collect}
        holdToDisplay={-1}
        onItemClick={this.handleContextClick}
      >
        {renderFileFolderToolbar(isFolder, node.module)}
      </ContextMenuTrigger>
      </div>
    );
  };

  handleLeftClick = (node) => {
    if (node.leaf === true) {
      //console.log(node.id)
      this.props.setFileId(node.id)
    }
  }

  addItem = (itemType, active) => {
    const { tree } = this.state;
    let response = "";
    if(itemType === "folder") {
      response = prompt("Please input folder name");
      response = response === "" ? "New folder" : response;
    }
    else {
      response = prompt("Please input file name")
      response = response === "" ? "New file" : response;
    }
    const newItem = 
      itemType === "folder"
        ? {
            id: `root-${Date.now()}`,
            module: `${response}`,
            children: [],
            collapsed: false,
          }
        : { id: `${Date.now()}`, leaf: true, module: `${response}`,context: ""};

    const newTree = _.mapDeep(tree, (item, key, parentValue) => {
      const cloneItem = Object.assign({}, item);
      if (cloneItem) {
        if (cloneItem.id === active.id && cloneItem.children) {
          // folder
          cloneItem.children.push(newItem);
        }
      }
      return cloneItem;
    });
    this.setState({ ...newTree });
    this.props.setTree(this.state.tree);
  };

  handleContextClick = (e, { action, name: id }) => {
    const { tree } = this.state;

    switch (action) {
      case "rename":
        const renameObj = _.findDeep(tree, (item) => item.id === id, {
          childrenPath: "children"
        });
        const response = prompt("Please rename", renameObj.value.module);

        if (response === "") {
          // ignore empty string
          return;
        }
        renameObj.value.module = response;
        this.setState(
          _.mapDeep(
            tree,
            (item) =>
              item.id === id
                ? {
                    ...item,
                    ...renameObj.value
                  }
                : item,
            { childrenPath: "children" }
          )
        );
        this.props.setTree(this.state.tree);
        break;
      case "delete":
        deleteFromTree(tree, id);
        this.setState({
          tree
        });
        this.props.setTree(this.state.tree);
        break;
      case "download":
        const downloadObj = _.findDeep(tree, (item) => item.id === id, {
          childrenPath: "children"
        });
        var text = downloadObj.value.context;
        var blob = new Blob([text], {type: "text/plain"});
        var link = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = link;
        a.download = downloadObj.value.module;
        a.click();
        break;
      default:
    }
  };

  toggleCollapse = () => {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }));
    this.props.setTree(this.state.tree);
  };

  render() {
    const { collapsed } = this.state;

    return (
      <div>
        <div className="file-explorer-tree">
        <div style={{display:"flex",justifyContent:"space-evenly"}}>
        <button id="importButton" style={{borderRadius:'8px',height:'3vh'}}><div style={{padding:"0 2vh 0 2vh"}}>Import</div></button>
        <button id="exportButton" style={{borderRadius:'8px',height:'3vh'}} onClick={() => {handleExport(this.props.tree)}}><div style={{padding:"0 2vh 0 2vh"}}>Export</div></button>
        </div>
          <Toolbar style={{color: this.props.setting.theme === 'vs-dark'?"#d8e0f0":"#404040"}}>
            <FloatLeft>
              <Icon
                title={collapsed ? "expand" : "collapse"}
                icon={collapsed ? chevronsRight : chevronsDown}
                onClick={this.toggleCollapse}
              />
              <span>EXPLORER</span>
            </FloatLeft>
          </Toolbar>
          {!collapsed && (
            <StrollableContainer draggable bar={LightScrollbar}>
              <Tree
                paddingLeft={20}
                tree={this.state.tree}
                onChange={this.handleChange}
                renderNode={this.renderNode}
              />
            </StrollableContainer>
          )}
        </div>

        <ContextMenu id="FILE_CONTEXT_MENU">
          <MenuItem
            data={{ action: "rename" }}
            onClick={this.handleContextClick}
          >
            Rename
          </MenuItem>
          <MenuItem
            data={{ action: "delete" }}
            onClick={this.handleContextClick}
          >
            Delete
          </MenuItem>
          <MenuItem
            data={{ action: "download" }}
            onClick={this.handleContextClick}
          >
            Download
          </MenuItem>
        </ContextMenu>
      </div>
    );
  }

  handleChange = (tree) => {
    this.setState({
      tree: tree
    });
    this.props.setTree(this.state.tree);
  };
}

async function objectToZip(obj) {
  const zip = new JSZip();
  await buildZip(zip, obj, "");

  const zipBlob = await zip.generateAsync({ type: "blob" });
  saveAs(zipBlob, "tree.zip");
}

async function buildZip(zip, obj, path) {
  if (obj.module) {
    // Create a file with the specified context
    const filePath = `${path}/${obj.module}`;
    console.log(`Creating file: ${filePath}`);
    zip.file(filePath, obj.context || "");
  } else {
    // Create a directory and recurse
    const dirPath = `${path}/${obj.id}`;
    console.log(`Creating directory: ${dirPath}`);
    const dir = zip.folder(dirPath);

    // Recurse on the children
    for (const child of obj.children) {
      await buildZip(dir, child, dirPath);
    }
  }
}

const handleExport = (obj) => {
  objectToZip(obj)
}

const LightScrollbar = styled.div`
  width: 10px;
  background-color: #fff;
  opacity: 0.7;
  border-radius: 4px;
  margin: 4px;
`;
const Toolbar = styled.div`
  position: relative;
  display: flex;
  ${'' /*color: #d8e0f0;*/}
  z-index: +1;
  /*border: 1px solid white;*/
  padding-bottom: 4px;
  i {
    margin-right: 5px;
    cursor: pointer;
  }
  i :hover {
    color: #d8e0f0;
  }
`;

const FloatLeft = styled.span`
  padding-left: 4px;
  width: 100%;
`;

const ToolbarFileFolder = styled.div`
  position: absolute;
  text-align: right;
  width: 92%;
  color: transparent;
  &:hover {
    color: #d8e0f0;
  }
`;

export default FileExplorer;