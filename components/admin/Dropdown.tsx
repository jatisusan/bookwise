"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { borrowStatuses, userRoles } from "@/constants";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { changeUserRole } from "@/lib/admin/actions/user";

interface BaseProps<T extends "userRole" | "borrowStatus"> {
  type: T;
  currentValue: T extends "userRole" ? ROLE_ENUM : BORROW_STATUS_ENUM;
  id: string;
}

type ROLE_ENUM = "USER" | "ADMIN";
type BORROW_STATUS_ENUM = "BORROWED" | "RETURNED";

const Dropdown = <T extends "userRole" | "borrowStatus">({
  type,
  currentValue,
  id,
}: BaseProps<T>) => {
  const [value, setValue] = useState(currentValue);
  const [loading, setLoading] = useState(false);

  const items = type === "userRole" ? userRoles : borrowStatuses;

  const current = items.find((i) => i.value === value);

  const handleChange = async (newValue: string) => {
    const val = newValue as T extends "userRole"
      ? ROLE_ENUM
      : BORROW_STATUS_ENUM;
    setValue(val);
    setLoading(true);
    try {
      if (type === "userRole") {
        const result = await changeUserRole(id, val as ROLE_ENUM);
        if (result.success) toast.success("User updated successfully.");
        else toast.error(result.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          className={cn(
            "rounded-full px-3 py-1 font-medium text-sm cursor-pointer",
            current?.bgColor,
            current?.textColor,
            loading ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          {current?.label}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuRadioGroup value={value} onValueChange={handleChange}>
          {items.map((i) => (
            <DropdownMenuRadioItem key={i.value} value={i.value}>
              <Badge
                className={cn(
                  "rounded-full px-3 py-1 font-medium text-sm cursor-pointer",
                  i.bgColor,
                  i.textColor
                )}
              >
                {i.label}
              </Badge>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
