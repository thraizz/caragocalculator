import React, { useState } from 'react';

export const CargoCalculator = ({characterId}) => {
  const [inputText, setInputText] = useState('');
  const [cargoSpace, setCargoSpace] = useState(null);

  // Function to parse clipboard text
  const parseClipboard = (text) => {
    const lines = text.split('\n');
    const items = [];

    lines.forEach((line) => {
      if(line.includes("Total:")) return;
      const parts = line.split('\t');
      if (parts.length >= 4) {
        const itemName = parts[0].trim();
        const quantity = parseInt(
          parts[1].trim().replace('.', '').replace(',', ''),
          10
        );
        items.push({ itemName, quantity });
      }
    });

    return items;
  };

  const fetchItemVolume = async (itemName) => {
    try {
      const response = await fetch(
        `https://esi.evetech.net/latest/characters/${characterId}/search/?categories=inventory_type&datasource=tranquility&language=en&search=${encodeURIComponent(itemName)}&strict=true`
      );
      const searchData = await response.json();

      if (searchData.inventory_type && searchData.inventory_type.length > 0) {
        const typeId = searchData.inventory_type[0];
        const typeResponse = await fetch(`https://esi.evetech.net/latest/universe/types/${typeId}/`);
        const typeData = await typeResponse.json();
        return typeData.volume;
      } else {
        return 0;
      }
    } catch (error) {
      console.error(`Error fetching volume for ${itemName}:`, error);
      return 0;
    }
  };


  // Function to calculate the total cargo space
  const calculateCargoSpace = async () => {
    const items = parseClipboard(inputText);
    let totalCargoSpace = 0;

    for (const item of items) {
      const volume = await fetchItemVolume(item.itemName);
      totalCargoSpace += volume * item.quantity;
    }
    if(!!totalCargoSpace) setCargoSpace(totalCargoSpace);
  };

  return (
    <div>
      <h2>EVE Online Cargo Calculator</h2>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={10}
        cols={50}
        placeholder="Paste your market order here"
      />
      <br />
      <button onClick={calculateCargoSpace}>Calculate Cargo Space</button>
      {!!cargoSpace && (
        <p>Total Required Cargo Space: {cargoSpace.toFixed(2)} m³</p>
      )}
    </div>
  );
};
