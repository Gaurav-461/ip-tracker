import type { IPInfo, CountryInfo } from "../types/ApiResponse";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./CreatePDF";

type ContentBoxProps = {
  content: IPInfo;
  country: CountryInfo;
};

const ContentBox = ({ content, country }: ContentBoxProps) => {
  if (!content.ip && !content.country_name)
    return (
      <div className="flex items-center justify-center h-96">
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
          dragging={true}
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
        <Tabs defaultValue="general" className="">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="download-print-info">
              Download Info
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent
            value="general"
            className="grid grid-cols-2 gap-4 w-full"
          >
            <Card className="bg-white/10">
              <CardHeader>
                <CardTitle className="text-2xl">Continent</CardTitle>
                <CardDescription className="text-lg">
                  {country.region} ({content.continent_code})
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10">
              <CardHeader>
                <CardTitle className="text-2xl">Country</CardTitle>
                <CardDescription className="text-lg">
                  {content!.country_name}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10">
              <CardHeader>
                <CardTitle className="text-2xl">Region</CardTitle>
                <CardDescription className="text-lg">
                  {content!.region}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10">
              <CardHeader>
                <CardTitle className="text-2xl">City</CardTitle>
                <CardDescription className="text-lg">
                  {content!.city}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10">
              <CardHeader>
                <CardTitle className="text-2xl">Subregion</CardTitle>
                <CardDescription className="text-lg">
                  {country.subregion}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10">
              <CardHeader>
                <CardTitle className="text-2xl">Flag</CardTitle>
                <CardDescription className="text-lg">
                  <img
                    src={country.flags.svg}
                    alt="National Flag"
                    className="w-26"
                  />
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details">
            <div className="p-2 grid grid-cols-2 gap-4 w-full h-[500px] overflow-y-auto">
              <Card className="bg-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl">IP Address</CardTitle>
                  <CardDescription className="text-lg">
                    {content.ip}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl">ISP</CardTitle>
                  <CardDescription className="text-lg">
                    {content.org}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl">Coordinate</CardTitle>
                  <CardDescription className="text-lg">
                    {content.longitude}, {content.latitude}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl">Timezone</CardTitle>
                  <CardDescription className="text-lg">
                    {content.timezone}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl">Postal Code</CardTitle>
                  <CardDescription className="text-lg">
                    {content.postal}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl">Country Code</CardTitle>
                  <CardDescription className="text-lg">
                    {content.country_code}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl">Region Code</CardTitle>
                  <CardDescription className="text-lg">
                    {content.region_code}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl">Currency</CardTitle>
                  <CardDescription className="text-lg">
                    {country.currencies
                      ? Object.keys(country.currencies).join(", ")
                      : "N/A"}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl">Population</CardTitle>
                  <CardDescription className="text-lg">
                    {country.population?.toLocaleString() || "N/A"}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl">Capital</CardTitle>
                  <CardDescription className="text-lg">
                    {country.capital?.[0] || "N/A"}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          {/* Download & Print Tab */}
          <TabsContent value="download-print-info">
            <div className="flex gap-4 mt-10">
              <PDFDownloadLink
                className="cursor-pointer bg-black text-white dark:bg-white/95 font-semibold text-sm flex items-center justify-center dark:text-black py-1 px-4 rounded-md"
                document={<MyDocument content={content} country={country} />}
                fileName={`IP-Data-${content.ip}.pdf`}
              >
                Download Info (pdf)
              </PDFDownloadLink>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ContentBox;
