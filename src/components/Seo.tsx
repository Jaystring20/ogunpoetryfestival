import { Helmet } from "react-helmet-async";

const SITE = "https://www.ogunpoetryfestival.com"; // Update once the domain is confirmed.

export function Seo({ title, description, path = "" }: { title?: string; description: string; path?: string }) {
  const full = title ? `${title} · Ogun Poetry Festival` : "Ogun Poetry Festival 2026 · Artistic Expression for Advocacy";
  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${SITE}${path}`} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SITE}/og-image.jpg`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
