import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { publicIpv4 } from "public-ip";
import type { IPInfo, CountryInfo } from "../types/ApiResponse";
import axios from "axios";

type InputBoxProps = {
  setContent: Dispatch<SetStateAction<IPInfo>>;
  setCountry: Dispatch<SetStateAction<CountryInfo>>;
};

const InputBox = ({ setContent, setCountry }: InputBoxProps) => {
  const [input, setInput] = useState("");

  const getContent = async (ip: string) => {
    try {
      const res = await axios.get(`https://ipapi.co/${ip}/json/`);
      const data = res.data;
      return data;
    } catch (error) {
      throw new Error(
        `Error occurred while getting IP address info:- ${error}`
      );
    }
  };

  const getCountry = async (countryName: string) => {
    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );
      const data = res.data[0];
      setCountry(data);
      console.log("Country info:-", data);
    } catch (error) {
      throw new Error(`Error occurred while getting country info:- ${error}`);
    }
  };

  const fetchIp = async () => {
    try {
      const ip = await publicIpv4();
      const data = await getContent(ip);

      await getCountry(data.country_name);

      setContent(data);
      setInput(ip);
      console.log("IP info:-", data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchIp().catch((err) =>
      console.log("Error occurred while getting IP address info:-", err)
    );
  }, []);

  const handleTrackIp = async () => {
    try {
      const data = await getContent(input);
      await getCountry(data.country_name);
      setContent(data);
    } catch (error) {
      console.log("Error occurred while getting IP address info:-", error);
    }
  }

  return (
    <div className="mt-14 max-w-xl mx-auto flex items-center gap-10">
      <Input
        type="text"
        className="p-6 text-2xl"
        placeholder="IP ADDRESS"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button className="p-6" type="submit" variant="default" disabled={!input} onClick={handleTrackIp}>
        Track
      </Button>
    </div>
  );
};

export default InputBox;
