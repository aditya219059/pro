import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast';

const Layout = ({children, title, description, keyword, author}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
      </Helmet>
      <Header/>
      <main style={{minHeight: "70vh"}}>
        <Toaster />
        {children}
      </main>
      <Footer/>
    </>
  )
}

Layout.defaultProps = {
  title: "Ecommerce App",
  description: "mern-stack-app",
  keyword: "MERN",
  author: "MINE"
}

export default Layout;