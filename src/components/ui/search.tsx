import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchAppBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

export default function SearchAppBar({
  placeholder = "Search…",
  onSearch,
}: SearchAppBarProps) {
  const [value, setValue] = useState("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      onSearch(value.trim());
    }, 600);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="w-full max-w-sm">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="
            w-full h-10
            rounded-lg
            border border-border
            bg-background
            pl-9 pr-3
            text-sm
            outline-none
            transition
            focus:ring-2 focus:ring-ring
            focus:border-ring
            placeholder:text-muted-foreground
          "
        />
      </div>
    </div>
  );
}
