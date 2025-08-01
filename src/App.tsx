import { useState } from "react";
import Input from "./components/Input";
import IpContent from "./components/ContentBox";
import Navbar from "./components/Navbar";
import type { CountryInfo, IPInfo } from "./types/ApiResponse";

const App = () => {
  const [content, setContent] = useState<IPInfo>({} as IPInfo);
  const [country, setCountry] = useState<CountryInfo>({} as CountryInfo);

  return (
    <main className="max-w-[90rem] mx-auto p-4">
      <Navbar />
      <h1 className="text-4xl text-center mt-6">
        Track any <span className="font-bold text-green-400">IP</span> and
         <span className="font-bold text-yellow-400"> discover </span> <br /> useful information.
      </h1>
      <Input setContent={setContent} setCountry={setCountry} />
      <IpContent content={content} country={country!} />
    </main>
  );
};

export default App;
