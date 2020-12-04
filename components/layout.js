import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'KarmaTek'
export const siteTitle = 'KarmaTek'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="KarmaTek Website and Blog"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <>
            <Link href="/">
              <a>
                <img
                  src="/images/logo.png"
                  className={`${styles.logo}`}
                  alt={name}
                />
              </a>
            </Link>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
            <small>
                <span className={`${styles.logoText}`}>Code</span> |{' '}
                <span className={`${styles.logoText}`}>Collaborate</span> |{' '}
                <span className={`${styles.logoText}`}>Create</span>
            </small>
            <hr/>
            {''}
            <small className={utilStyles.lightText}>info@karmatek.io | +12028055054</small>
          </>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}