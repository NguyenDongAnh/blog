import Head from 'next/head'

export default function SEO({ description, title, siteTitle, url, image }) {
  return (
    <Head>
      <title>{`${title} - ${siteTitle}`}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      {/* <meta name="Author" content="Truyện tranh NetTruyen"/> */}
      <meta name="language" content="vi" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1201" />
      <meta property="og:image:height" content="628" />
      <meta name="twitter:card" content="photo" />
      <meta name="twitter:creator" content="@Rabbit" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image:src" content={image} />
      <meta name="mobile-web-app-capable" content="yes"/>
    </Head>
  )
}
{/*
<meta property="og:url" content="https://hocweb.vn/10-react-components-moi-tuyet-voi-nhat-04-2020/">
<meta property="article:publisher" content="https://www.facebook.com/topdevvietnam/"></meta>
<meta property="article:published_time" content="2020-09-28T02:32:12+00:00"></meta>
<meta property="article:modified_time" content="2021-09-20T08:25:30+00:00"></meta>
<meta property="og:updated_time" content="2021-03-31T04:43:43+07:00">
<meta property="article:tag" content="components">
<meta property="article:tag" content="reactjs">
<meta property="article:section" content="React">
<meta property="og:image" content="https://topdev.vn/blog/wp-content/uploads/2020/09/cach-su-dung-markdown-3.jpg"></meta>
<meta property="og:image:width" content="1201"></meta>
<meta property="og:image:height" content="628"></meta> */
/* <link rel="prev" href="http://www.nettruyenmoi.com/"> */
/* <link rel="next" href="http://www.nettruyenmoi.com/?page=3">
<meta name="Author" content="Truyện tranh NetTruyen"/>
<link rel="apple-touch-icon" href="/app/icons/icon-72x72.png">
<link rel="apple-touch-icon" sizes="96x96" href="/app/icons/icon-96x96.png">
<link rel="apple-touch-icon" sizes="144x144" href="/app/icons/icon-144x144.png">
<link rel="apple-touch-icon" sizes="192x192" href="/app/icons/icon-192x192.png">
<link rel="dns-prefetch" href="//www.googletagmanager.com">
<link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//s.w.org">
<link href="https://fonts.gstatic.com" crossorigin="" rel="preconnect">
<link rel="alternate" type="application/rss+xml" title="Dòng thông tin Hocweb.vn »" href="https://hocweb.vn/feed/">
<link rel="alternate" type="application/rss+xml" title="Dòng phản hồi Hocweb.vn »" href="https://hocweb.vn/comments/feed/">
*/}