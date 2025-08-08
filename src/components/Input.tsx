import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { publicIpv4 } from "public-ip";
import type { IPInfo, CountryInfo } from "../types/ApiResponse";
import axios from "axios";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

type InputBoxProps = {
  setContent: Dispatch<SetStateAction<IPInfo>>;
  setCountry: Dispatch<SetStateAction<CountryInfo>>;
};

type ErrorState = {
  message: string;
  type: "network" | "validation" | "api" | "general";
} | null;

const InputBox = ({ setContent, setCountry }: InputBoxProps) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorState>(null);

  // IP address validation regex
  const isValidIP = (ip: string): boolean => {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  };

  const clearError = () => {
    setError(null);
  };

  const getContent = async (ip: string): Promise<IPInfo> => {
    try {
      const res = await axios.get(`https://ipapi.co/${ip}/json/`, {
        timeout: 10000, // 10 second timeout
      });

      if (!res.data || res.data.error) {
        throw new Error(res.data?.reason || "Invalid IP address or API error");
      }

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          throw new Error(
            "Request timeout. Please check your internet connection."
          );
        }
        if (error.response?.status === 429) {
          throw new Error("Too many requests. Please try again later.");
        }
        if (error.response?.status === 404) {
          throw new Error("IP address not found or invalid.");
        }
        throw new Error(`Network error: ${error.message}`);
      }
      throw new Error(
        `Failed to fetch IP information: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const getCountry = async (countryName: string): Promise<void> => {
    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`,
        {
          timeout: 10000,
        }
      );

      if (!res.data || res.data.length === 0) {
        throw new Error(`Country information not found for: ${countryName}`);
      }

      setCountry(res.data[0]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          throw new Error("Request timeout while fetching country data.");
        }
        if (error.response?.status === 404) {
          throw new Error(`Country information not found for: ${countryName}`);
        }
        throw new Error(`Failed to fetch country data: ${error.message}`);
      }
      throw new Error(
        `Failed to fetch country information: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const fetchIp = async () => {
    setIsLoading(true);
    clearError();

    try {
      const ip = await publicIpv4();
      if (!ip) {
        throw new Error(
          "Unable to detect your IP address. Please enter it manually."
        );
      }

      const data = await getContent(ip);
      await getCountry(data.country_name);

      setContent(data);
      setInput(ip);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch IP information";
      setError({
        message: errorMessage,
        type: "network",
      });
      console.error("Error fetching IP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIp();
  }, []);

  const handleTrackIp = async () => {
    if (!input.trim()) {
      setError({
        message: "Please enter a valid IP address",
        type: "validation",
      });
      return;
    }

    if (!isValidIP(input.trim())) {
      setError({
        message: "Please enter a valid IP address format (e.g., 192.168.1.1)",
        type: "validation",
      });
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      const data = await getContent(input.trim());
      await getCountry(data.country_name);
      setContent(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to track IP address";
      setError({
        message: errorMessage,
        type: "api",
      });
      console.error("Error tracking IP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Clear validation errors when user starts typing
    if (error?.type === "validation") {
      clearError();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() && !isLoading) {
      e.preventDefault();
      handleTrackIp();
    }
  };

  return (
    <div className="mt-14 max-w-xl mx-auto space-y-4">
      <div className="flex items-center gap-6 md:gap-10">
        <Input
          type="text"
          className="p-6 md:text-xl"
          placeholder="Enter IP address (e.g., 192.168.1.1)"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
        />
        <Button
          className="p-6 min-w-[100px]"
          type="submit"
          variant="default"
          disabled={!input.trim() || isLoading}
          onClick={handleTrackIp}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Tracking...
            </>
          ) : (
            "Track"
          )}
        </Button>
      </div>

      {error && (
        <Alert
          className={`border-l-4 ${
            error.type === "validation"
              ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
              : error.type === "network"
              ? "border-red-500 bg-red-50 dark:bg-red-900/20"
              : "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
          }`}
        >
          <AlertDescription className="text-sm">
            {error.message}
            {error.type === "network" && (
              <Button
                variant="link"
                className="p-0 h-auto text-sm underline ml-2"
                onClick={fetchIp}
              >
                Try again
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default InputBox;
