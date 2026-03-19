import fs from "node:fs/promises";
import UsePromiseDemo from "@/components/usePromiseDemo";
import { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export default async function Home() {
  const fetchUserPromise = new Promise((resolve) =>
    setTimeout(async () => {
      const data = await fs.readFile("dummy-db.json", "utf-8");
      const users = JSON.parse(data);
      resolve(users);
    }, 2000),
  );

  return (
    <main>
      <ErrorBoundary>
        <Suspense fallback={<p>Loading users....</p>}>
          <UsePromiseDemo usersPromise={fetchUserPromise} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
