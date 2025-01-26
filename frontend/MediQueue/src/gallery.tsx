import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Heart, List } from "lucide-react";

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
  const [favorites, setFavorites] = useState<Artwork[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  // Previous fetch effects remain the same...
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

  useEffect(() => {
    // Retrieve favorites from sessionStorage
    const storedFavorites = JSON.parse(sessionStorage.getItem('favorites') || '[]');
    
    // Initialize state with stored favorites
    setFavorites(storedFavorites);
  }, []);

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

  const handleNext = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % objectIDs.length);
  }, [objectIDs.length]);

  const handlePrevious = useCallback(() => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? objectIDs.length - 1 : prevIndex - 1
    );
  }, [objectIDs.length]);

  const handleAddToFavorites = useCallback(() => {
    if (!artwork) return;
  
    // Retrieve existing favorites from sessionStorage
    const storedFavorites = JSON.parse(sessionStorage.getItem('favorites') || '[]');
  
    // Check if the artwork is already in favorites
    if (!storedFavorites.some((fav: any) => fav.objectID === artwork.objectID)) {
      const updatedFavorites = [...storedFavorites, artwork];
      
      // Save updated favorites back to sessionStorage
      sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
      // Update React state
      setFavorites(updatedFavorites);
    }
  }, [artwork]);

  const handleRemoveFromFavorites = useCallback((objectID: number) => {
    // Retrieve existing favorites from sessionStorage
    const storedFavorites = JSON.parse(sessionStorage.getItem('favorites') || '[]');
  
    // Filter out the artwork by `objectID`
    const updatedFavorites = storedFavorites.filter((fav: any) => fav.objectID !== objectID);
    
    // Save updated favorites back to sessionStorage
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    // Update React state
    setFavorites(updatedFavorites);
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

  const isCurrentArtworkFavorite = artwork 
  ? favorites.some(fav => fav.objectID === artwork.objectID) 
  : false;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-black text-white flex flex-col items-center p-4 relative">
      <h1 className="text-4xl font-bold mb-4">Metropolitan Museum of Art</h1>
      <p className="mt-4 text-2xl p-4">Explore breathtaking artwork!</p>

      {/* Favorites View */}
      {showFavorites ? (
        <div className="w-full px-[140px]">
          <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
          {favorites.length === 0 ? (
            <p className="text-gray-400">No favorites yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {favorites.map((fav) => (
                <div
                  key={fav.objectID}
                  className="bg-gray-800 p-4 rounded-lg flex flex-col"
                >
                  <img
                    src={fav.primaryImageSmall || fav.primaryImage}
                    alt={fav.title}
                    className="w-full h-48 object-contain mb-2"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-sm break-words min-h-[2rem]">{fav.title}</h3>
                  </div>
                  <button
                    onClick={() => handleRemoveFromFavorites(fav.objectID)}
                    className="text-gray-500 mt-2 font-bold text-sm self-center"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowFavorites(false)}
              className="bg-blue-500 px-4 py-2 text-white rounded-full"
            >
              Back to Gallery
            </button>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-4xl">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 p-2 text-white rounded-full hover:bg-blue-600"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 p-2 text-white rounded-full hover:bg-blue-600"
          >
            <ChevronRight size={36} />
          </button>

          <div className="max-w-4xl text-center pb-20">
            <div
              className="w-[700px] h-[700px] mx-auto overflow-hidden rounded-lg flex items-center justify-center"
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

          {/* Buttons at bottom center */}
          <div className="fixed bottom-0 left-0 right-0 flex justify-center space-x-4 pb-4 bg-gradient-to-t from-black/70 to-transparent">
            <button
              onClick={handleAddToFavorites}
              className="flex items-center justify-center"
            >
              <Heart 
                size={32} 
                fill={isCurrentArtworkFavorite ? "white" : "none"}
                color={isCurrentArtworkFavorite ? "white" : "white"}
                className="transition-colors duration-300 hover:scale-110"
              />
            </button>
            <button
              onClick={() => setShowFavorites(true)}
              className="bg-gray-700 px-4 py-2 text-white rounded-full hover:bg-gray-800 flex items-center"
            >
              <List size={20} className="mr-2" /> View Favorites
            </button>
          </div>
        </div>
      )}
    </div>
  );
}