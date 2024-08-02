"use client";
import React, { useContext, createContext, useState } from "react";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { ModeToggle } from "../common/mode-toggle";

const SidebarContext = createContext<{ expanded: boolean }>({ expanded: false });

export function SidebarBody({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <aside className={`
      h-screen
      ${expanded ? 'w-64' : 'w-16'}
      transition-all duration-300 ease-in-out
      fixed left-0 top-0 z-50
    `}>
      <nav className="h-full flex flex-col bg-secondary border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 overflow-y-auto overflow-x-hidden">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t border-primary/10 flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md flex-shrink-0"
          />
          <div className={`
            flex justify-between items-center
            overflow-hidden transition-all
            ${expanded ? "w-52 ml-3" : "w-0"}
          `}>
            <div className="leading-4 overflow-hidden">
              <h4 className="font-semibold truncate">John Doe</h4>
              <span className="text-xs text-muted-foreground truncate">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} className="text-muted-foreground flex-shrink-0" />
          </div>
        </div>
        <div className={`p-3 ${expanded ? '' : 'flex justify-center'}`}>
          <ModeToggle />
        </div>
      </nav>
    </aside>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
}

export function SidebarItem({ icon, text, active }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
          ? "bg-primary text-primary-foreground"
          : "hover:bg-primary/10 text-foreground"
        }
      `}
    >
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
        {text}
      </span>
      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-primary text-primary-foreground text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}