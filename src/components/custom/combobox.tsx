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
  type: "category" | "brand"; // NEW
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  data?: any[];
}

export function Combobox({
  type,
  placeholder = "Select...",
  value,
  onChange,
  data,
}: ComboboxProps) {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((state) => state.category);
  const { brands } = useAppSelector((state) => state.brands);

  const loading = useAppSelector((state) =>
    type === "category" ? state.category.loadingCategory : state.brands.loadingBrands
  );

  const comboData = data ?? (type === "category" ? categories : brands);

  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(value || "");

  React.useEffect(() => {
    if (type === "category") {
      dispatch(loadCategoryInComboThunk());
    }
  }, [dispatch, type, data]);

  const options = comboData.map((item) => ({
    value: item._id,
    label: item.name || item.brand_name,
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
                  onSelect={() => {
                    setInternalValue(item.value);
                    onChange?.(item.value);
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

