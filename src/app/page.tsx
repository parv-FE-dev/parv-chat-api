export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
      <main className="text-center p-8">
        <h1 className="text-2xl font-semibold text-black dark:text-white mb-4">
          Parv Chat API
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          This is the backend API for the Ask Parv chatbot on{" "}
          <a
            href="https://parvsaxena.com"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            parvsaxena.com
          </a>
        </p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          POST /api/chat
        </p>
      </main>
    </div>
  );
}
