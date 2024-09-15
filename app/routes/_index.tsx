export default function Index() {
  return (
    <div
      className="mx-auto max-w-[600px] md:px-2 px-4 antialiased font-mono"
    >
      <main>
        <h1 className="mt-20 block font-bold text-4xl dark:text-white">Luthfulahi Oseni</h1>
        <h2 className="mb-10 dark:text-white">Sotware engineer</h2>
        <p className="dark:text-gray-300">
          Hi 👋🏽, I&apos;m Luthfulahi Oseni, a software engineer at Turing Inc. I&apos;m passionate about building next-gen AI-powered, human-led talent services. When I&apos;m not crafting amazing tools for Turing&apos;s talent cloud, you&apos;ll find me exploring fascinating web3 projects.
        </p>
        <p className="mt-4 dark:text-gray-300">
          I recently started documenting my career insights and experiences. Curious🤔??? Check out my blog{" "}
          <a
            className="underline visited:text-purple-900 dark:visited:text-[#E5D2F9]"
            target="_blank"
            href="https://luthfulahi.hashnode.dev/"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>

        <p className="mt-4 dark:text-gray-300">
          Here are some of the interesting web3 products I am currently working on.

          <ul className="mt-4 list-disc list-inside">
            <li className="underline">
              <a href="https://www.blockradar.co/" target="_blank" rel="noreferrer">Blockradar</a>
            </li>
            <li className="underline">
              <a href="https://www.blocasset.com/" target="_blank" rel="noreferrer">Blocasset</a>
            </li>
          </ul>
        </p>

        <p className="mt-4 dark:text-gray-300">
          You can find me on LinkedIn <a
            className="underline visited:text-purple-900 dark:visited:text-[#E5D2F9]"
            target="_blank"
            href="https://www.linkedin.com/in/luthfulahi/"
            rel="noreferrer"
          >
            here
          </a>.
        </p>
      </main>
    </div>

  );
}
