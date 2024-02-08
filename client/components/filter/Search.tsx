"use client";

import React, { useEffect, useState } from "react";

const NameSearch = () => {
  // Array of names
  const allNames = ["John", "Jane", "Bob", "Alice", "Charlie", "David", "Eva", "Frank"];

  // State to manage the search term
  const [searchTerm, setSearchTerm] = useState("");
  // State to manage the filtered names
  const [filteredNames, setFilteredNames] = useState(allNames);

  // Function to update the displayed names based on the search term

  // Effect to log the updated searchTerm
  useEffect(() => {
    // console.log(searchTerm);
    // You can also put your filtering logic here and update filteredNames if needed
    const filteredItems = allNames.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNames(filteredItems);
  }, [searchTerm]); // Depend on searchTerm 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="text-white">
      <h1>Name Search</h1>

      <input
        type="text"
        placeholder="Search by name"
        className="text-gray-700"
        value={searchTerm}
        onChange={handleInputChange}
      />

      <ul>
        {filteredNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NameSearch;
