import UrlGenerator from "@/components/UrlGenerator";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-6">URL Shortener</h1>
      <UrlGenerator />
    </main>
  );
}
