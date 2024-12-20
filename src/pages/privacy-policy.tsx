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
          <h2 className="text-3xl md:leading-[1.1] lg:leading-[1.125em]">
            Introduction
          </h2>
          <p className="max-w-4xl">
            Welcome to League TierList! This Privacy Policy explains how we
            collect, use, and protect your data when you use our website,{' '}
            <Link className="underline" href="/">
              https://www.league-tier-list.com
            </Link>
            . By accessing our website, you agree to the terms outlined in this
            policy.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:leading-[1.1] lg:leading-[1.125em]">
            Data We Collect
          </h2>
          <p className="max-w-4xl">
            We collect your email when you connect with X (formerly Twitter).
            This data is necessary for maintaining your access and refresh
            tokens.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:leading-[1.1] lg:leading-[1.125em]">
            How We Collect Your Data
          </h2>
          <p className="max-w-4xl">
            Your data is collected through cookies, which are used to store your
            access and refresh tokens for seamless website functionality.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:leading-[1.1] lg:leading-[1.125em]">
            Purpose of Data Collection
          </h2>
          <p className="max-w-4xl">
            We use your email and tokens solely to manage your connection and
            ensure smooth access to the website.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:leading-[1.1] lg:leading-[1.125em]">
            Data Sharing
          </h2>
          <p className="max-w-4xl">
            We do not share your data with third parties except for Vercel, our
            hosting provider, which ensures the technical operation of our
            website.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:leading-[1.1] lg:leading-[1.125em]">
            International Data Transfers
          </h2>
          <p className="max-w-4xl">
            Your data is not transferred internationally and is stored securely
            within the operational regions of our hosting provider.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:leading-[1.1] lg:leading-[1.125em]">
            Your Rights
          </h2>
          <p className="max-w-4xl">
            You have the right to delete, update, or access your data. If you
            wish to exercise these rights, please contact us at{' '}
            <Link href="mailto:contact@league-tier-list.com">
              contact@league-tier-list.com
            </Link>
            .
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:leading-[1.1] lg:leading-[1.125em]">
            Security Measures
          </h2>
          <p className="max-w-4xl">
            We implement standard security practices to protect your data,
            including secure cookie storage and restricted access to sensitive
            information.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:leading-[1.1] lg:leading-[1.125em]">
            Compliance with Laws
          </h2>
          <p className="max-w-4xl">
            This website operates in compliance with applicable laws, including
            French and international privacy regulations.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:leading-[1.1] lg:leading-[1.125em]">
            Cookies Policy
          </h2>
          <p className="max-w-4xl">
            We use cookies to maintain your connection by securely storing your
            access and refresh tokens. These cookies are essential for the
            operation of the website and cannot be opted out.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:leading-[1.1] lg:leading-[1.125em]">
            Children&apos;s Privacy
          </h2>
          <p className="max-w-4xl">
            Our website is not specifically targeted at children, but we
            recognize the importance of protecting minors&apos; privacy. If you
            believe we have collected data from a minor without proper consent,
            please contact us immediately at{' '}
            <Link href="mailto:contact@league-tier-list.com">
              contact@league-tier-list.com
            </Link>
            .
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl md:leading-[1.1] lg:leading-[1.125em]">
            Contact Information
          </h2>
          <p className="max-w-4xl">
            If you have any questions or concerns about this Privacy Policy or
            your data, please contact us at{' '}
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
