import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class RootDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="Droppii for administration and agency" />
          <meta name="twitter:card" content="summary" />
          <meta
            name="viewport"
            content="user-scalable=no, width=device-width, initial-scale=1.0"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#4d6bf1" />
          <meta
            name="keywords"
            content="Droppii, ERP Droppii, Droppii for business, ERP, droppii, thương mại điện tử, e commerce, kinh doanh không vốn, kinh doanh"
          />
          <meta
            name="description"
            content="Kinh doanh cùng Droppii không cần vốn. Chia sẻ những câu chuyện truyền cảm hứng."
          />
          <meta name="description" content="One order one smile" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/logo/droppii.svg" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <title>Learn and Do</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
