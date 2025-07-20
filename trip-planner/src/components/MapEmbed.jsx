import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export default function MapEmbed({ city }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!city) return;
    const { L } = window; // Leaflet global
    if (!mapRef.current) return;

    // Remove previous map
    mapRef.current._leaflet_id && window.map?.remove();

    // Create new map
    const map = L.map(mapRef.current).setView([0, 0], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Geocode city → lat/lng (free Nominatim)
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        city
      )}&limit=1`
    )
      .then(r => r.json())
      .then(data => {
        if (data[0]) {
          const { lat, lon } = data[0];
          map.setView([lat, lon], 12);
          L.marker([lat, lon]).addTo(map).bindPopup(city).openPopup();
        }
      });
  }, [city]);

  return (
    <div
      ref={mapRef}
      className="w-full aspect-video rounded-lg shadow-lg"
      style={{ minHeight: 300 }}
    />
  );
}
