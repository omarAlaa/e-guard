'use client';

import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const { replace } = useRouter()
    const [term, setTerm] = useState(searchParams.get("query") ?? "")

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term)
        }
        else {
            params.delete('query')
        }

        replace(`${pathName}?${params.toString()}`)
    }, 600);

    return (
        <Input
            value={term}
            placeholder="Search cameras"
            onChange={(e) => {
                setTerm(e.target.value)
                handleSearch(e.target.value)
            }}
        />
    )
}