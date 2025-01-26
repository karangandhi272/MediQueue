import React, { useEffect, useState, useCallback } from "react";

type Artwork = {
  objectID: number;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  medium: string;
  primaryImage: string;
  primaryImageSmall: string;
  creditLine: string;
};

type SearchResults = {
  total: number;
  objectIDs: number[];
};

export default function ArtCycler() {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [objectIDs, setObjectIDs] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<Artwork[]>([]); // State for favorites
  const [showFavorites, setShowFavorites] = useState<boolean>(false); // Toggle for showing favorites

  // Fetch object IDs
  useEffect(() => {
    const fetchObjectIDs = async () => {
      try {
        const response = await fetch(
          "https://collectionapi.metmuseum.org/public/collection/v1/search?q=painting&hasImages=true"
        );
        const data: SearchResults = await response.json();
        if (data.objectIDs && data.objectIDs.length > 0) {
          const filteredIDs = data.objectIDs.slice(0, 200);
          setObjectIDs(filteredIDs);
        } else {
          setError("No paintings found.");
        }
      } catch (err) {
        setError("Failed to fetch paintings.");
      }
    };

    fetchObjectIDs();
  }, []);

  // Fetch artwork details
  useEffect(() => {
    if (objectIDs.length === 0) return;

    const fetchArtwork = async () => {
      setLoading(true);
      try {
        const ids = [...objectIDs];

        for (let i = 0; i < ids.length; i++) {
          const currentIndex = (index + i) % ids.length;
          const response = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${ids[currentIndex]}`
          );

          if (!response.ok) continue;

          const data: Artwork = await response.json();
          if (data.primaryImage || data.primaryImageSmall) {
            setArtwork(data);
            setIndex(currentIndex);
            break;
          }
        }
      } catch (err) {
        setError("Failed to fetch artwork details.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [index, objectIDs]);

  // Handlers for navigation
  const handleNext = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % objectIDs.length);
  }, [objectIDs.length]);

  const handlePrevious = useCallback(() => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? objectIDs.length - 1 : prevIndex - 1
    );
  }, [objectIDs.length]);

  // Add to favorites
  const handleAddToFavorites = useCallback(() => {
    if (!artwork || favorites.some((fav) => fav.objectID === artwork.objectID)) return;
    setFavorites((prev) => [...prev, artwork]);
  }, [artwork, favorites]);

  // Remove from favorites
  const handleRemoveFromFavorites = useCallback((objectID: number) => {
    setFavorites((prev) => prev.filter((fav) => fav.objectID !== objectID));
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <div className="animate-pulse">
          <div className="w-64 h-64 bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-6 w-48 bg-gray-600 rounded mb-2"></div>
          <div className="h-4 w-32 bg-gray-600 rounded mb-2"></div>
          <div className="h-4 w-40 bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Metropolitan Museum of Art</h1>
      <p className="mt-4 p-4">Explore breathtaking artwork!</p>

      {/* Favorites View */}
      {showFavorites ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
          {favorites.length === 0 ? (
            <p className="text-gray-400">No favorites yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((fav) => (
                <div
                  key={fav.objectID}
                  className="bg-gray-800 p-4 rounded-lg text-center"
                >
                  <img
                    src={fav.primaryImageSmall || fav.primaryImage}
                    alt={fav.title}
                    className="w-full h-48 object-contain mb-2"
                  />
                  <h3 className="font-semibold">{fav.title}</h3>
                  <button
                    onClick={() => handleRemoveFromFavorites(fav.objectID)}
                    className="text-red-500 mt-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => setShowFavorites(false)}
            className="bg-blue-500 px-4 py-2 text-white rounded-full mt-4"
          >
            Back to Gallery
          </button>
        </div>
      ) : (
        <div>
          <div className="max-w-4xl text-center">
            <div
              className="w-[700px] h-[700px] mx-auto overflow-hidden rounded-lg bg-black flex items-center justify-center"
            >
              <img
                src={artwork?.primaryImage || artwork?.primaryImageSmall}
                alt={artwork?.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <h2 className="text-2xl font-semibold mt-4">{artwork?.title}</h2>
            <p className="text-lg mt-2">
              <strong>Artist:</strong> {artwork?.artistDisplayName || "Unknown"}
            </p>
            <p className="text-lg mt-2">
              <strong>Date:</strong> {artwork?.objectDate || "Unknown"}
            </p>
            <p className="text-lg mt-2">
              <strong>Medium:</strong> {artwork?.medium || "Unknown"}
            </p>
            <p className="text-md mt-4 text-gray-400 italic">
              {artwork?.creditLine}
            </p>
          </div>
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handlePrevious}
              className="bg-blue-500 px-4 py-2 text-white rounded-full hover:bg-blue-600"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-500 px-4 py-2 text-white rounded-full hover:bg-blue-600"
            >
              Next
            </button>
            <button
              onClick={handleAddToFavorites}
              className="bg-green-500 px-4 py-2 text-white rounded-full hover:bg-green-600"
            >
              Add to Favorites
            </button>
            <button
              onClick={() => setShowFavorites(true)}
              className="bg-gray-700 px-4 py-2 text-white rounded-full hover:bg-gray-800"
            >
              View Favorites
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
