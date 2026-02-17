import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "../ui/sheet";
import { links } from "@/lib/utils";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full" aria-label={`Menu Button`}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="sr-only">Site Navigation</SheetTitle>
        <SheetDescription className="sr-only">A list off navigation links</SheetDescription>
        <ul className="main-navigation gap-16 items-center flex-col ml-8 mt-12" role="list">
          {links.map(({ href, label }, index) => (
            <li className="hover:text-blue-400 mb-8" key={index}>
              <a
                className={
                  window.location.pathname.includes(href)
                    ? "text-blue-400 hover:cursor-pointer"
                    : "hover:cursor-pointer"
                }
                href={href}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
