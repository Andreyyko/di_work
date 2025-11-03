"use client"

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Hello World!</h1>
        <Button>Hello bro</Button>
      </div>
    </section>
  );
}
