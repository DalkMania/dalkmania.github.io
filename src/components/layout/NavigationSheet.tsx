import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { links } from "./Navigation.astro";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <ul className="main-navigation gap-16 items-center flex-col ml-8 mt-12" role="list">
          {links.map(({ href, label }) => (
            <li className="hover:text-blue-400 mb-8">
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
