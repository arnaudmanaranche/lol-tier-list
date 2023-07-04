import Head from 'next/head'
import type { ReactElement } from 'react'

import { PageHeaderWrapper, Title } from '@prodigy/ui'

import { DEFAULT_TITLE } from 'Utils/constants'

const PrivacyPage = (): ReactElement => {
  return (
    <>
      <Head>
        <title>{`Privacy - ${DEFAULT_TITLE}`}</title>
      </Head>
      <PageHeaderWrapper>
        <Title>Privacy</Title>
        <div className="mt-8 max-w-lg space-y-6 text-lg leading-[1.4] text-white md:max-w-xl lg:text-xl">
          <p className="mb-10">How LoL Power Ranking collects and uses data.</p>
        </div>
      </PageHeaderWrapper>
      <div className="mx-auto mb-10 max-w-7xl space-y-6 px-2 md:px-6">
        <section className="prose">
          <p>Your privacy is critically important to us. We have a few fundamental principles:</p>
          <ul>
            <li>We don&apos;t ask you for personal information unless we truly need it.</li>
            <li>
              We don&apos;t share your personal information with anyone except to comply with the
              law, develop our products, or protect our rights.
            </li>{' '}
            <li>
              We don&apos;t store personal information on our servers unless required for the
              on-going operation of the service.
            </li>
          </ul>
          <p>
            If you have questions about deleting or correcting your personal data please contact
            support. It is LoL Power Ranking&apos;s policy to respect your privacy regarding any
            information we may collect while operating our websites.
          </p>
        </section>
        <section className="prose">
          <h2>Website Visitors</h2>
          <p>
            Like most website operators, LoL Power Rankings collects non-personally-identifying
            information of the sort that web browsers and servers typically make available, such as
            the browser type, language preference, referring site, and the date and time of each
            visitor request. LoL Power Ranking&apos;s purpose in collecting non-personally
            identifying information is to better understand how LoL Power Ranking&apos;s visitors
            use its website. From time to time, LoL Power Ranking may release
            non-personally-identifying information in the aggregate, e.g., by publishing a report on
            trends in the usage of its website. LoL Power Ranking also collects potentially
            personally-identifying information like Internet Protocol (IP) addresses for logged in
            users.
          </p>
        </section>
        <section className="prose">
          <h2>Gathering of Personally-Identifying Information</h2>
          <p>
            Certain visitors to LoL Power Ranking&apos;s websites choose to interact with LoL Power
            Ranking in ways that require LoL Power Ranking to gather personally-identifying
            information. The amount and type of information that LoL Power Ranking gathers depends
            on the nature of the interaction. For example, we ask visitors who sign up to provide an
            email address via Google, LoL Power Ranking&apos;s authentication provider. Those who
            engage in transactions with LoL Power Ranking are asked to provide additional
            information, including as necessary the personal and financial information required to
            process those transactions. In each case, LoL Power Ranking collects such information
            only insofar as is necessary or appropriate to fulfill the purpose of the visitor&apos;s
            interaction with LoL Power Ranking. LoL Power Ranking does not disclose
            personally-identifying information other than as described below. And visitors can
            always refuse to supply personally-identifying information, with the caveat that it may
            prevent them from engaging in certain website-related activities.
          </p>
        </section>
        <section className="prose">
          <h2>Aggregated Statistics</h2>
          <p>
            LoL Power Ranking may collect statistics about the behavior of visitors to its websites.
            For instance, LoL Power Ranking may monitor the most popular pages viewed, or what
            actions visitors take most frequently. LoL Power Ranking may display this information
            publicly or provide it to others. However, LoL Power Ranking does not disclose
            personally-identifying information other than as described below.
          </p>
        </section>
        <section className="prose">
          <h2>Protection of Certain Personally-Identifying Information</h2>
          <p>
            LoL Power Ranking discloses potentially personally-identifying and
            personally-identifying information only to those of its employees, contractors and
            affiliated organizations that (i) need to know that information in order to process it
            on LoL Power Ranking&apos;s behalf or to provide services available at LoL Power
            Ranking&apos;s websites, and (ii) that have agreed not to disclose it to others. Some of
            those employees, contractors and affiliated organizations may be located outside of your
            home country; by using LoL Power Ranking&apos;s websites, you consent to the transfer of
            such information to them. LoL Power Ranking will not rent or sell potentially
            personally-identifying and personally-identifying information to anyone. Other than to
            its employees, contractors and affiliated organizations, as described above, LoL Power
            Ranking discloses potentially personally-identifying and personally-identifying
            information only in response to a subpoena, court order or other governmental request,
            or when LoL Power Ranking believes in good faith that disclosure is reasonably necessary
            to protect the property or rights of LoL Power Ranking, third parties or the public at
            large.
          </p>
          <p>
            If you are a registered user of the LoL Power Ranking website and have supplied your
            email address, LoL Power Ranking may occasionally send you an email to tell you about
            new features, solicit your feedback, or just keep you up to date with what&apos;s going
            on with LoL Power Ranking and our products. We primarily use our various product blogs
            to communicate this type of information, so we expect to keep this type of email to a
            minimum. If you send us a request (for example via a support email or via one of our
            feedback mechanisms), we reserve the right to publish it in order to help us clarify or
            respond to your request or to help us support other users. LoL Power Ranking takes all
            measures reasonably necessary to protect against the unauthorized access, use,
            alteration or destruction of potentially personally-identifying and
            personally-identifying information.
          </p>
        </section>
        <section className="prose">
          <h2>Deletion of Personally-Identifying Information</h2>
          <p>
            At any time a customer may request the deletion of their account and associated
            personally-identifying information. LoL Power Ranking will return or delete a
            customer&apos;s personal data, unless further storage of such personal data is required
            or authorized by applicable law. If return or destruction is impracticable or prohibited
            by law, rule or regulation, LoL Power Ranking shall take measures to block such personal
            data from any further processing (except to the extent necessary for its continued
            hosting or processing required by law, rule or regulation) and shall continue to
            appropriately protect the personal data remaining in its possession, custody, or
            control.
          </p>
          <p>
            To delete of your data, go on your settings account or contact the LoL Power Ranking
            support.
          </p>
        </section>
        <section className="prose">
          <h2>Cookies</h2>
          <p>
            A cookie is a string of information that a website stores on a visitor&apos;s computer,
            and that the visitor&apos;s browser provides to the website each time the visitor
            returns. LoL Power Ranking uses cookies to help LoL Power Ranking identify and track
            users, their usage of LoL Power Ranking website, and their website access preferences.
            LoL Power Ranking visitors who do not wish to have cookies placed on their computers
            should set their browsers to refuse cookies before using LoL Power Ranking&apos;s
            websites, with the drawback that certain features of LoL Power Ranking&apos;s websites
            may not function properly without the aid of cookies.
          </p>
        </section>
        <section className="prose">
          <h2>Business Transfers</h2>
          <p>
            If LoL Power Ranking, or substantially all of its assets, were acquired, or in the event
            that LoL Power Ranking goes out of business or enters bankruptcy, user information would
            be one of the assets that is transferred or acquired by a third party. You acknowledge
            that such transfers may occur, and that any acquirer of LoL Power Ranking may continue
            to use your personal information as set forth in this policy.
          </p>
        </section>
        <section className="prose">
          <h2>Privacy Policy Changes</h2>
          <p>
            Although most changes are likely to be minor, LoL Power Ranking may change its Privacy
            Policy from time to time, and in LoL Power Ranking&apos;s sole discretion. LoL Power
            Ranking encourages visitors to frequently check this page for any changes to its Privacy
            Policy. Your continued use of this site after any change in this Privacy Policy will
            constitute your acceptance of such change.
          </p>
        </section>
      </div>
    </>
  )
}

export default PrivacyPage
