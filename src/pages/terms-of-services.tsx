import type { User } from '@supabase/supabase-js'
import { createClient } from 'clients/supabase/server-props'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { PageHeaderWrapper } from '@/components/PageHeaderWrapper'

interface PageProps {
  user: User | null
}

const Page = ({
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactNode => {
  return (
    <div className="px-4">
      <Header user={user} />
      <div className="bgGradient absolute inset-0 -top-[90px] -z-10 opacity-20 blur-3xl" />
      <PageHeaderWrapper>
        <h1 className="text-6xl font-bold text-white lg:text-8xl">
          Privacy Policy
        </h1>
        <p className="text-lg italic text-white">Last updated: 12/20/2024</p>
      </PageHeaderWrapper>
      <div className="mx-auto max-w-7xl space-y-6 px-4 pb-5 leading-relaxed text-white md:px-6">
        <div className="space-y-4">
          <h2 className="text-2xl md:leading-[1.1] lg:leading-[1.125em]">
            Introduction
          </h2>
          <p className="max-w-4xl">
            Welcome to LeagueTierList! These Terms of Use govern your access and
            use of our website,{' '}
            <Link className="underline" href="/">
              https://www.league-tier-list.com
            </Link>
            , operated by Arnaud Manaranche. By using our site, you agree to
            comply with these terms.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl md:leading-[1.1] lg:leading-[1.125em]">
            User Obligations
          </h2>
          <p className="max-w-4xl">
            LeagueTierList is intended for personal use only. Users are
            prohibited from engaging in activities such as spamming, hacking,
            impersonating others, or violating applicable laws.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl md:leading-[1.1] lg:leading-[1.125em]">
            Account Management
          </h2>
          <p className="max-w-4xl">
            To access certain features, users must create an account through X
            (formerly Twitter). Account registration requires basic information
            provided through X. We reserve the right to suspend or terminate
            accounts under conditions to be determined.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl md:leading-[1.1] lg:leading-[1.125em]">
            Content and Intellectual Property
          </h2>
          <p className="max-w-4xl">
            All tier lists created on LeagueTierList are owned by Arnaud
            Manaranche and may be reused for any purpose. While users can create
            tier lists, ownership of this content is retained by LeagueTierList.
            Users do not grant additional licenses or permissions for other
            content.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl md:leading-[1.1] lg:leading-[1.125em]">
            Disclaimers and Limitations of Liability
          </h2>
          <p className="max-w-4xl">
            LeagueTierList may occasionally go offline for maintenance or
            updates. We disclaim liability for any damages, including data loss
            or service interruptions, that may arise during the use of our
            website.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl md:leading-[1.1] lg:leading-[1.125em]">
            Third-Party Services
          </h2>
          <p className="max-w-4xl">
            We use third-party services such as Vercel, Supabase, and X for
            authentication. By using LeagueTierList, you agree to comply with
            the terms of these third-party providers.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl md:leading-[1.1] lg:leading-[1.125em]">
            Governing Law and Dispute Resolution
          </h2>
          <p className="max-w-4xl">
            These Terms of Use are governed by the laws of France. All disputes
            arising from the use of our website will be settled under the
            jurisdiction of French courts.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl md:leading-[1.1] lg:leading-[1.125em]">
            Changes to the Terms
          </h2>
          <p className="max-w-4xl">
            We reserve the right to update these Terms of Use at any time. Users
            will be notified of significant changes via email from{' '}
            <Link href="mailto:contact@league-tier-list.com">
              contact@league-tier-list.com
            </Link>
            .
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl md:leading-[1.1] lg:leading-[1.125em]">
            Contact Information
          </h2>
          <p className="max-w-4xl">
            For questions or concerns regarding these Terms of Use, please
            contact us at{' '}
            <Link href="mailto:contact@league-tier-list.com">
              contact@league-tier-list.com
            </Link>
            .
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getServerSideProps = (async (context) => {
  const supabaseClient = createClient(context)
  const {
    data: { user }
  } = await supabaseClient.auth.getUser()

  return {
    props: {
      user
    }
  }
}) satisfies GetServerSideProps<PageProps>

export default Page
