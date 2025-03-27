
import * as React from "react"
import { CheckIcon, ColorWheelIcon } from "@radix-ui/react-icons"
import { SidebarTheme, useSidebar } from "./sidebar-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const themes: { value: SidebarTheme; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "violet", label: "Violet" },
  { value: "blue", label: "Blue" },
  { value: "gray", label: "Gray" },
  { value: "dark", label: "Dark" },
]

export function SidebarThemeSwitcher() {
  const { theme, setTheme } = useSidebar()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ColorWheelIcon className="h-4 w-4" />
          <span className="sr-only">Change sidebar theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className="flex items-center justify-between"
          >
            {t.label}
            {theme === t.value && <CheckIcon className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
