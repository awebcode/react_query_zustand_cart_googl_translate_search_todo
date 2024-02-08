"use client";
import { colourOptions } from "@/constants/Data";
import React, { useState } from "react";
import Select from "react-select";

const MultiSelectDropdown = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  console.log("selected", selectedOption);
  return (
    <div className="wrapper">
      <div className="container mx-auto min-h-[200px]">
        <h1>Select Fruits</h1>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={colourOptions}
          isMulti
          isClearable
          isSearchable
          placeholder="Select Fruits...."
          closeMenuOnSelect
          
          styles={{
            multiValueLabel: (base) => ({
              ...base,
              backgroundColor: colourOptions[6].color,
              color: "white",
            }),
          }}
        />
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
