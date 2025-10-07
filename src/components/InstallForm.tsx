import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Rocket } from "lucide-react";

interface InstallFormProps {
  onInstall: (device: string, version: string) => void;
  isLoading: boolean;
}

const devices = [
  { value: "android-mobile", label: "Android Mobile" },
  { value: "android-tv", label: "Android TV" },
  { value: "firetv", label: "Fire TV" },
  { value: "tvos", label: "tvOS" },
  { value: "roku", label: "Roku" },
  { value: "webos", label: "webOS" },
];

export const InstallForm = ({ onInstall, isLoading }: InstallFormProps) => {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [version, setVersion] = useState("");

  const handleInstall = () => {
    if (selectedDevice && version) {
      onInstall(selectedDevice, version);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end">
      <div className="flex-1 w-full">
        <label className="text-sm font-medium mb-2 block text-muted-foreground">
          Device Platform
        </label>
        <Select value={selectedDevice} onValueChange={setSelectedDevice}>
          <SelectTrigger className="w-full bg-secondary border-border">
            <SelectValue placeholder="Select device..." />
          </SelectTrigger>
          <SelectContent className="bg-secondary border-border z-50">
            {devices.map((device) => (
              <SelectItem key={device.value} value={device.value}>
                {device.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 w-full">
        <label className="text-sm font-medium mb-2 block text-muted-foreground">
          Version Number
        </label>
        <Input
          type="text"
          placeholder="e.g., 1.0.0"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          className="bg-secondary border-border"
        />
      </div>

      <Button
        onClick={handleInstall}
        disabled={!selectedDevice || !version || isLoading}
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Installing...
          </>
        ) : (
          <>
            <Rocket className="mr-2 h-4 w-4" />
            Install
          </>
        )}
      </Button>
    </div>
  );
};
