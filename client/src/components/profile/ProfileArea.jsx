import { Button } from "../ui/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/ui/card";
import { Input } from "../ui/ui/input";
import { Label } from "../ui/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/ui/tabs";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export const ProfileArea = () => {
  return (
    <div className="px-4 pt-6 space-y-2 flex flex-col items-center">
      <div className="w-32 h-32">
        <img
          className="rounded-full w-full h-full object-cover"
          src="https://wallpapers-clan.com/wp-content/uploads/2022/06/naruto-sasuke-uchiha-pfp-1.jpg"
        />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <span className="font-logo text-[1.3rem]">Jonathan Kuug</span>
        <div className="flex flex-col items-center">
          <span className="text-[15px]">Instructor</span>
        </div>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="account">
              Account
            </TabsTrigger>
            <TabsTrigger className="w-full" value="password">
              Settings 
            </TabsTrigger>
            {/* <TabsTrigger className="w-full" value="settings">
              Settings
            </TabsTrigger> */}
          </TabsList>
          <TabsContent value="account"></TabsContent>
          <TabsContent value="password"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
