import { Features } from "./_sections/features";
import Head from "next/head";
import { Hero } from "./_sections/hero";

export default function Page() {
  return (
    <div>
      <Head>
        <title>Next js scroll Animations with Framer Motion</title>
        <meta
          name="description"
          content="Scroll animations with Framer Motion"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Hero />
        <div className="relative z-10 w-full overflow-x-clip">
          <Features />
        </div>
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-[radial-gradient(circle_farthest-side_at_calc(300px)_calc(300px),_var(--color-secondary)_0%,_transparent_100%)] md:hidden">
          {/* This is a very ugly way of adding such a message, don't build it like this :) */}
          <p className="px-10 text-center text-xl text-white">
            Sorry, I only made this page work on desktop. Perhaps in a future we
            can make this responsive as well 😁
            <br />
            <a
              href="https://github.com/danielwuachin/nextjs-animations"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block underline"
            >
              Check the source code on GitHub
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
