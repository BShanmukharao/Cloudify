import React, { useState } from "react";
import "./TableWithDropdown.css";

const TableWithDropdowns = () => {
  const [rows, setRows] = useState([{ label1: "", label2: [] }]);
  const [usedOptions, setUsedOptions] = useState([]);
  const [getInputValue, setInputValue] = useState("");
  const [multiSelectOptions, setMultiSelectOptions] = useState([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
  ]);

  const singleSelectOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleAddRow = () => {
    setRows([...rows, { label1: "", label2: [] }]);
  };

  const handleLabel1Change = (value, index) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, label1: value } : row
    );
    setRows(updatedRows);
    setUsedOptions([...usedOptions, value]);
  };

  const handleLabel2Change = (value, index) => {
    const updatedRows = rows.map((row, i) =>
      i === index
        ? {
          ...row,
          label2: row.label2.includes(value)
            ? row.label2.filter((option) => option !== value)
            : [...row.label2, value],
        }
        : row
    );
    setRows(updatedRows);
  };

  const handleAddMultiSelectOption = (newOption) => {
    if (newOption && !multiSelectOptions.includes(newOption)) {
      setMultiSelectOptions([...multiSelectOptions, newOption]);
    }
  };

  const inputValue = (e) => {
    setInputValue(e.target.value)
  }

  const getAddInputValue = () => {
    const newOption = getInputValue;
    if (newOption && !multiSelectOptions.includes(newOption)) {
      setMultiSelectOptions([...multiSelectOptions, newOption]);
    }
  }   

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Label 1</th>
            <th>Label 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <select
                  value={row.label1}
                  onChange={(e) => handleLabel1Change(e.target.value, rowIndex)}
                  disabled={!!row.label1}
                >
                  <option value="">Selected Option</option>
                  {singleSelectOptions
                    .filter(
                      (option) =>
                        !usedOptions.includes(option) || row.label1 === option
                    )
                    .map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </td>
              <td>
                <div className="multi-select">
                  {multiSelectOptions.map((option) => (
                    <label key={option}>
                      <input
                        type="checkbox"
                        value={option}
                        checked={row.label2.includes(option)}
                        onChange={() => handleLabel2Change(option, rowIndex)}
                      />
                      {option}
                    </label>
                  ))}
                  <div className="add-new-option">
                    <input
                      type="text"
                      placeholder="Add new item"
                      onChange={inputValue}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddMultiSelectOption(e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </div>
                <button className="add-btn" onClick={getAddInputValue}>+ Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-row-btn-container">
        <button className="add-row-btn" onClick={handleAddRow}>
          + Add New Row
        </button>
      </div>
    </div>
  );
};

export default TableWithDropdowns;