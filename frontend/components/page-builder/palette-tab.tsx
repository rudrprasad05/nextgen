"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Bot, Box, Cog, ListTree } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { ElementsPalette } from "./elements-palette";

enum States {
  Tree = "Tree",
  Elements = "Elements",
  Settings = "Settings",
  Bot = "Bot",
}

export default function PaletteTab() {
  const [state, setState] = useState<States>(States.Elements);
  const tabs = [
    {
      value: States.Elements,
      label: "Elements",
      icon: <Box className="w-5 h-5" />,
    },
    {
      value: States.Tree,
      label: "Tree",
      icon: <ListTree className="w-5 h-5" />,
    },
    {
      value: States.Settings,
      label: "Settings",
      icon: <Cog className="w-5 h-5" />,
    },
    {
      value: States.Bot,
      label: "NextBot",
      icon: <Bot className="w-5 h-5" />,
    },
  ];

  return (
    <Tabs
      defaultValue="Select"
      className="flex flex-row w-72 border-r border-border sticky top-0 text-xs"
    >
      <TabsPrimitive.List className="w-12 border-r border-border grid grid-cols-1 gap-2 grid-rows-8 pt-2 sticky top-0 h-full">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.value}
            onClick={() => setState(tab.value)}
            value={tab.value}
            className={cn(
              "text-sm px-2 py-4 cursor-pointer border-solid border-blue-500 hover:border-r transition flex items-center gap-1 justify-center",
              state === tab.value ? "border-r" : "border-none",
            )}
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            {tab.icon}
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
        <div className="row-start-8">c</div>
      </TabsPrimitive.List>

      <ScrollArea className="overflow-scroll">
        <TabsContent value="Elements">
          <ElementsPalette />
        </TabsContent>
        <TabsContent value="Tree">
          <ElementsPalette />
        </TabsContent>
        <TabsContent value="Settings">
          <ElementsPalette />
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
}
