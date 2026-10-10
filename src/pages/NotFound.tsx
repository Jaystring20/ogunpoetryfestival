import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70vh] flex-col justify-center pt-24">
      <Seo title="Page not found" description="This page doesn't exist." />
      <p className="label text-pink">404</p>
      <h1 className="display mt-4 text-5xl sm:text-7xl">This verse is missing.</h1>
      <Link to="/" className="btn-sun mt-10 self-start">
        Back to the festival
      </Link>
    </section>
  );
}
