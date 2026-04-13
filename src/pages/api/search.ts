import type { APIRoute } from "astro";
import { getApiUrl, slugify } from "@/services/api";

export const GET: APIRoute = async ({ url }) => {
    const search = url.searchParams.get("q") || "";
    const limit = url.searchParams.get("limit") || "8";

    try {
        const apiBase = getApiUrl();
        const backendUrl = new URL(`${apiBase}/destinations`);
        if (search) backendUrl.searchParams.set("search", search);
        backendUrl.searchParams.set("limit", limit);

        const res = await fetch(backendUrl.toString());
        if (!res.ok) {
            return new Response(JSON.stringify({ success: false, data: [] }), {
                status: res.status,
                headers: { "Content-Type": "application/json" },
            });
        }

        const json = await res.json();

        // Enrich data with slugs for correct URL building
        if (json.success && json.data) {
            json.data = json.data.map((dest: any) => ({
                ...dest,
                // poi slug mirrors what the route uses: slugify(name)
                poiSlug: slugify(dest.name),
                // provinceSlug is the provinceId (already a slug key in our baseProvinces)
                provinceSlug: dest.provinceId || dest.province?.id || "",
                // Resolve first image URL for the thumbnail
                thumbImage: dest.images && dest.images[0]
                    ? dest.images[0].url
                    : (dest.image || ""),
            }));
        }

        return new Response(JSON.stringify(json), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return new Response(JSON.stringify({ success: false, data: [] }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
