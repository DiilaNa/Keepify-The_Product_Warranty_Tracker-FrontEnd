"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { loadCategoryInComboThunk } from "@/slices/category/categoryThunk";

interface ComboboxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function Combobox({
  placeholder = "Select...",
  value,
  onChange,
}: ComboboxProps) {
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((state) => state.category);
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(value || "");

  // fetch categories on mount
  React.useEffect(() => {
    dispatch(loadCategoryInComboThunk());
  }, [dispatch]);

  // keep internal value in sync with prop
  React.useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  const options = categories.map((cat: any) => ({
    value: cat._id,
    label: cat.name,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
          disabled={loading}
        >
          {internalValue
            ? options.find((o) => o.value === internalValue)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder}...`}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No {placeholder} found.</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue: string) => {
                    const newValue =
                      currentValue === internalValue ? "" : currentValue;
                    setInternalValue(newValue);
                    onChange?.(newValue); // send value to AdminPopup
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      internalValue === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

