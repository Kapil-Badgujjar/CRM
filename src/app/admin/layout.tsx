import { NavigationBar } from "@/components/navigation-bar/NavigationBar";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sales panel",
  description: "Rancholabs CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col">
        <NavigationBar />
        {children}
    </div>
  );
}
