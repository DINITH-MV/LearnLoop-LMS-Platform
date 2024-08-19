import { Features } from "./_sections/features";
import Head from "next/head";

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
      <div className="relative z-10 w-full overflow-x-clip">         
          <Features />
          
        </div>
      </main>
    </div>
  );
}
