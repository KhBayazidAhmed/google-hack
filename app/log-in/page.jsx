import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function TabsDemo() {
  return (
    <div className="flex items-center flex-col justify-center w-screen h-screen">
      <h2 className="text-3xl font-bold py-5">Welcome to Hack world</h2>
      <Tabs defaultValue="sign-in" className="w-[400px]">
        <TabsContent value="sign-in">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Sign-in</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">User Name</Label>
                <Input id="name" placeholder="User name " />
              </div>
              <div className="space-y-1">
                <Label htmlFor="Password">Password</Label>
                <Input type="password" id="Password" placeholder="Password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Log in </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
