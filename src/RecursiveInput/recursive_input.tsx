import React, { useState, useEffect } from "react";
import "./recursive_input.css";
import _ from "lodash";

type ChildrenType = {
  id: number;
  charCount: number;
};

type RecursiveInputProps = {
  level: number;
  parentId: number | null;
  onDelete?: (id: number) => void;
};

export default function RecursiveInput(props: RecursiveInputProps) {
  const { level, parentId, onDelete } = props;
  const [text, setText] = useState<string[]>([]);
  const [children, setChildren] = useState<ChildrenType[]>([]);
  const [totalCharCount, setTotalCharCount] = useState<number>(0);

  let idCounter = 0;
  let id = idCounter++;

  const handleAdd = () => {
    const id = level + 1;
    setChildren([...children, { id, charCount: 0 }]);
    setTotalCharCount(text.join(",").length);
  };

  const handleDelete = () => {
    onDelete?.(parentId!);
  };

  const handleDeleteChild = (id: number) => {
    const newChildren = children.filter((child) => child.id !== id);
    setChildren(newChildren);
  };

  const handleInputChange = (index: number, value: string) => {
    setText([value]);
  };

  return (
    <div
      className={`recursive-input level-${level} ${
        level % 2 === 0 ? "grey" : "white"
      }`}
      id={`parent-${parentId}`}
    >
      <h3 className="title">Characters in children: {totalCharCount}</h3>
      {!parentId ? (
        <input
          type="text"
          onChange={(e) => handleInputChange(idCounter, e.target.value)}
          value={text}
          placeholder="Type something here..."
        />
      ) : (
        <input
          type="text"
          onChange={(e) => handleInputChange(id, e.target.value)}
          value={text}
          placeholder="Type something here..."
        />
      )}
      <div className="buttons">
        <button className="add" id="input--button" onClick={handleAdd}>
          Add Child
        </button>
        {parentId ? (
          <button
            className="delete"
            id="input--button"
            onClick={handleDelete}
            disabled={!parentId}
          >
            Delete Child
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="children">
        {children.map((child) => (
          <RecursiveInput
            key={child.id}
            level={level + 1}
            parentId={child.id}
            onDelete={handleDeleteChild}
          />
        ))}
      </div>
    </div>
  );
}
