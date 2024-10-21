import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 bg-background mt-4">
        <div className="container">
          <div className="flex space-x-2 items-center">
            <h1 className="text-3xl font-nephilmitalic text-secondary">
              <a href="/">Handflow</a>
            </h1>
            <div className="container flex items-center px-20 space-x-20 font-tommymedium">
              <DropdownMenu
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
              >
                <DropdownMenuTrigger asChild>
                  <a
                    className="flex items-center space-x-1 hover:cursor-pointer hover:underline uppercase hover:text-secondary"
                    onClick={toggleDropdown}
                  >
                    <span>About</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </a>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white font-tommymedium capitalize">
                  <DropdownMenuItem className="hover:bg-gray-200 cursor-pointer">
                    <a href="/team">Our team</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200 cursor-pointer">
                    <a href="/mission">Our mission</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <a
                href="/practice"
                className="space-x-1 hover:cursor-pointer hover:underline uppercase hover:text-secondary"
              >
                Practice
              </a>
              <a
                href="/learn"
                className="space-x-1 hover:cursor-pointer hover:underline uppercase hover:text-secondary"
              >
                Learn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
