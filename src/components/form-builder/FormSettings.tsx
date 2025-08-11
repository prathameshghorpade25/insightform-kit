import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormSettingsProps {
  settings: {
    theme: string;
    showProgressBar: boolean;
    allowBack: boolean;
  };
  onUpdateSettings: (settings: any) => void;
}

export const FormSettings = ({ settings, onUpdateSettings }: FormSettingsProps) => {
  const updateSetting = (key: string, value: any) => {
    onUpdateSettings({
      ...settings,
      [key]: value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold mb-4">Form Settings</h3>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Display Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="progress-bar" className="text-sm">
              Show Progress Bar
            </Label>
            <Switch
              id="progress-bar"
              checked={settings.showProgressBar}
              onCheckedChange={(checked) => updateSetting('showProgressBar', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="allow-back" className="text-sm">
              Allow Back Navigation
            </Label>
            <Switch
              id="allow-back"
              checked={settings.allowBack}
              onCheckedChange={(checked) => updateSetting('allowBack', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={settings.theme}
            onValueChange={(value) => updateSetting('theme', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="colorful">Colorful</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Response Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Configure how responses are collected and stored.
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Response Collection: Enabled
            </Label>
            <Label className="text-xs text-muted-foreground">
              Data Storage: Secure Cloud Storage
            </Label>
            <Label className="text-xs text-muted-foreground">
              Export Formats: CSV, JSON, PDF
            </Label>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};