import type { IPInfo, CountryInfo } from "../types/ApiResponse";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import TabContainer from "./TabContainer";
import { useMediaQuery } from "react-responsive";

type ContentBoxProps = {
  content: IPInfo;
  country: CountryInfo;
};

const ContentBox = ({ content, country }: ContentBoxProps) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (!content.ip && !content.country_name)
    return (
      <div className="flex items-center justify-center h-96 max-sm:text-sm">
        <p>
          Please enable trackers in your browser for this application to work.
        </p>
      </div>
    );
  return (
    <section className="mt-8 flex gap-6 max-lg:flex-col">
      {/* Map */}
      <div className="w-2/3 max-lg:w-full">
        <MapContainer
          style={{
            width: "100%",
            position: "relative",
            zIndex: "9",
            height: "500px",
            overflow: "hidden",
            background: "#fff",
            borderRadius: "10px",
          }}
          center={[content.latitude, content.longitude]}
          zoom={1.5}
          scrollWheelZoom={false}
          dragging={isMobile ? false : true}
          touchZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[content.latitude, content.longitude]} />
        </MapContainer>
      </div>
      {/* IP Details */}
      <div className="w-1/3 bg-white/7 rounded-xl p-4 max-lg:w-full">
        <TabContainer content={content} country={country} />
      </div>
    </section>
  );
};

export default ContentBox;
