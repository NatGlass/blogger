"use client";

import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

function SearchField() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const query = (form.query as HTMLInputElement).value.trim();

    if (!query) return;

    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} action="/search">
      <Input name="query" placeholder="Search..." />
    </form>
  );
}

export default SearchField;
