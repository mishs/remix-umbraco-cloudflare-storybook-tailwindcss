import { json } from '@remix-run/cloudflare';
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const env = context.env as { TODO_LIST: { get: (key: string) => Promise<string | null> } };
  const task = await env.TODO_LIST.get("Task:123");
  return json({ task });
}export default function Index() {
  const { task } = useLoaderData<typeof loader>();
  
  return (
    <div>
      <h1>Task Details</h1>
      <p>{task}</p>
    </div>
  );
}


