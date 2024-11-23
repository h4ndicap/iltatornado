'use client';

import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.url) setImageUrl(data.url);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Iltatornado</h1>
      <input type="file" onChange={handleUpload} />
      {imageUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded leaf" className="mt-4" />
        </div>
      )}
    </div>
  );
}
