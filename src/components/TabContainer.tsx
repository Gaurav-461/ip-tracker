import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./CreatePDF";
import type { IPInfo, CountryInfo } from "../types/ApiResponse";

type TabContainerProps = {
  content: IPInfo;
  country: CountryInfo;
};

const TabContainer = ({ content, country }: TabContainerProps) => {
  return (
    <Tabs defaultValue="general" className="">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="download-print-info">Download Info</TabsTrigger>
      </TabsList>

      {/* General Tab */}
      <TabsContent value="general" className="grid grid-cols-2 gap-4 w-full">
        <Card className="bg-white/10">
          <CardHeader>
            <CardTitle className="md:text-2xl">Continent</CardTitle>
            <CardDescription className="md:text-lg">
              {country.region} ({content.continent_code})
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-white/10">
          <CardHeader>
            <CardTitle className="md:text-2xl">Country</CardTitle>
            <CardDescription className="md:text-lg">
              {content.country_name}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-white/10">
          <CardHeader>
            <CardTitle className="md:text-2xl">Region</CardTitle>
            <CardDescription className="md:text-lg">
              {content.region}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-white/10">
          <CardHeader>
            <CardTitle className="md:text-2xl">City</CardTitle>
            <CardDescription className="md:text-lg">
              {content.city}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-white/10">
          <CardHeader>
            <CardTitle className="md:text-2xl">Subregion</CardTitle>
            <CardDescription className="md:text-lg">
              {country.subregion}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-white/10">
          <CardHeader>
            <CardTitle className="md:text-2xl">Flag</CardTitle>
            <CardDescription className="tmd:ext-lg">
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
              <CardTitle className="md:md:text-2xl">IP Address</CardTitle>
              <CardDescription className="md:text-lg">
                {content.ip}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="md:md:text-2xl">ISP</CardTitle>
              <CardDescription className="md:text-lg">
                {content.org}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="md:md:text-2xl">Coordinate</CardTitle>
              <CardDescription className="md:text-lg">
                {content.longitude}, {content.latitude}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="md:text-2xl">Timezone</CardTitle>
              <CardDescription className="md:text-lg">
                {content.timezone}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="md:text-2xl">Postal Code</CardTitle>
              <CardDescription className="md:text-lg">
                {content.postal}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="md:text-2xl">Country Code</CardTitle>
              <CardDescription className="md:text-lg">
                {content.country_code}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="md:text-2xl">Region Code</CardTitle>
              <CardDescription className="md:text-lg">
                {content.region_code}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="md:text-2xl">Currency</CardTitle>
              <CardDescription className="md:text-lg">
                {country.currencies
                  ? Object.keys(country.currencies).join(", ")
                  : "N/A"}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="md:text-2xl">Population</CardTitle>
              <CardDescription className="md:text-lg">
                {country.population?.toLocaleString() || "N/A"}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/10">
            <CardHeader>
              <CardTitle className="md:text-2xl">Capital</CardTitle>
              <CardDescription className="md:text-lg">
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
  );
};

export default TabContainer;
