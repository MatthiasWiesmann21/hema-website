import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSiteSettings } from "@/lib/settings";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <SettingsForm
      initialSettings={{
        name: settings.name,
        shortName: settings.shortName,
        tagline: settings.tagline,
        description: settings.description,
        email: settings.email,
        url: settings.url,
        social: settings.social,
      }}
    />
  );
}
