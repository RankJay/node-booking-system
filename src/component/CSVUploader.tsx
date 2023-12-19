"use client";

import { useState } from 'react';

export const CSVUploader = () => {
  const [output, setOutput] = useState<string[]>([]);
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/process', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setOutput(data.results);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <div>
        {output.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};
