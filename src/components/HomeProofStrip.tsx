import Link from 'next/link'
import clsx from 'clsx'
import { ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react/ssr'

import { Container } from '@/components/Container'
import { homeProofData } from '@/data/homepage-data'

export function HomeProofStrip() {
  return (
    <Container className="mt-14 sm:mt-16">
      <section aria-labelledby="engineering-proof-heading">
        <h2 id="engineering-proof-heading" className="sr-only">
          Engineering proof
        </h2>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-zinc-200 shadow-sm ring-1 ring-zinc-200 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 dark:bg-zinc-700/70 dark:ring-zinc-700/70">
          {homeProofData.map((proof, proofIndex) => {
            let Icon = proof.external ? ArrowUpRightIcon : ArrowRightIcon

            return (
              <Link
                key={proof.value}
                href={proof.href}
                target={proof.external ? '_blank' : undefined}
                rel={proof.external ? 'noopener noreferrer' : undefined}
                className={clsx(
                  'group flex min-h-28 items-start justify-between gap-4 bg-white px-5 py-5 transition outline-none hover:bg-violet-50/70 focus-visible:bg-violet-50 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-inset dark:bg-zinc-900/80 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800',
                  proofIndex === homeProofData.length - 1 &&
                    'sm:col-span-2 xl:col-span-1',
                )}
              >
                <span>
                  <span className="block text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {proof.value}
                  </span>
                  <span className="mt-1.5 block text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                    {proof.detail}
                  </span>
                </span>
                {proof.external && (
                  <span className="sr-only">(opens in a new tab)</span>
                )}
                <Icon
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 flex-none text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-violet-500 dark:text-zinc-500 dark:group-hover:text-violet-400"
                  weight="bold"
                />
              </Link>
            )
          })}
        </div>
      </section>
    </Container>
  )
}
