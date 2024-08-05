// app/[...page]/page.tsx

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BuilderComponent, builder, BuilderContent } from "@builder.io/react";
import styles from "./page.module.css";
import { RenderBuilderContent } from "../components/builder"; // Adjust the import path if necessary

// Replace with your Public API Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
  announce: BuilderContent | null;
}

export const getStaticProps = async ({
  params,
}: {
  params: { page: string[] };
}) => {
  const announce = await builder
    .get("announcement-bar", {
      /* Add options you need here */
    })
    .toPromise();

  return {
    props: {
      announce: announce || null,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

const Page = ({ params, announce }: PageProps) => {
  const [content, setContent] = useState<BuilderContent | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPageContent = async () => {
      const fetchedContent = await builder
        .get("page", {
          userAttributes: {
            urlPath: "/" + (params?.page?.join("/") || ""),
          },
          prerender: false,
        })
        .toPromise();

      setContent(fetchedContent);
    };

    fetchPageContent();
  }, [params]);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Replace <YourHeader /> and <YourFooter /> with your actual components or remove them */}
      <header>YourHeader</header>
      <BuilderComponent model="announcement-bar" content={announce} />
      <RenderBuilderContent content={content} model="page" />
      <footer>YourFooter</footer>
    </>
  );
};

export default Page;

export function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/[...page]/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>Hello World</p>
        </a>
      </div>
    </main>
  );
}
