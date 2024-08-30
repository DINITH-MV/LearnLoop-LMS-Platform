import { Features } from "./_sections/features";
import Head from "next/head";
import { Hero } from "./_sections/hero";
import { MoreFeatures } from "./_sections/more-features";

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
      <main className="h-[6000px]">
        <Hero />
          <div className="relative z-10 w-full overflow-x-clip">
            <Features />
            <MoreFeatures />
        </div>
      </main>
    </div>
  );
}
