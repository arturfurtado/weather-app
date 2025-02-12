'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import * as React from "react"
import { Button } from "../ui/button"
import { Thermometer } from "lucide-react"
import { useTheme } from "next-themes"

export function TempToggle() {
    const {setTemperature} = React.useState("celsius")

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Thermometer/>
                    <span className="sr-only">Toggle Temperature</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTemperature("fahrenheit")}>
                    F
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTemperature("celsius")}>
                    C
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}