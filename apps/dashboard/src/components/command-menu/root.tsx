"use client";

import { Experimental } from "@/components/experimental";
import { MenuOption, useCommandStore } from "@/store/command";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@midday/ui/command";
import { Icons } from "@midday/ui/icons";
import { isDesktopApp } from "@todesktop/client-core/platform/todesktop";
import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

const navigation = [
  {
    name: "Overview",
    path: "/",
  },
  {
    name: "Inbox",
    path: "/inbox",
  },
  {
    name: "Transactions",
    path: "/transactions",
  },
  {
    name: "Invoices",
    path: "/invoices",
  },
  {
    name: "Vault",
    path: "/vault",
  },
  {
    name: "Exports",
    path: "/vault/exports",
  },
  {
    name: "Apps",
    path: "/apps",
  },
  {
    name: "Settings",
    path: "/settings",
  },
];

export function CommandRoot() {
  const { setMenu, setOpen } = useCommandStore();
  const router = useRouter();

  return (
    <div>
      <CommandInput
        placeholder="Type a command or search..."
        autoFocus
        className="px-3 border-b-[1px] rounded-none"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Suggestion">
          <CommandItem onSelect={() => setMenu(MenuOption.AI)}>
            <Icons.AI className="mr-2 h-[20px] w-[20px] text-[#0091ff]" />
            <div className="flex items-center justify-between w-full">
              <span>Ask Midday...</span>
              <Experimental />
            </div>
          </CommandItem>

          {isDesktopApp() && (
            <CommandItem onSelect={() => window.location.replace("midday://")}>
              <MoveUpRight className="mr-2 h-4 w-4" />
              <span>Open Midday</span>
            </CommandItem>
          )}
          <CommandItem onSelect={() => setMenu(MenuOption.Notifications)}>
            <Icons.Notifications size={18} className="mr-2" />
            <span>Latest Notifications</span>
          </CommandItem>
          <CommandItem onSelect={() => setMenu(MenuOption.Feedback)}>
            <Icons.QuestionAnswer size={18} className="mr-2" />
            <span>Send Feedback</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Navigation" className="pb-16">
          {isDesktopApp() &&
            navigation.map((item) => (
              <CommandItem
                key={item.path}
                onSelect={() =>
                  window.location.replace(`midday://${item.path}`)
                }
              >
                <MoveUpRight className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </CommandItem>
            ))}
          {!isDesktopApp() &&
            navigation.map((item) => (
              <CommandItem
                key={item.path}
                onSelect={() => {
                  router.push(item.path);
                  setOpen();
                }}
              >
                <Icons.ArrowForward className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </div>
  );
}
