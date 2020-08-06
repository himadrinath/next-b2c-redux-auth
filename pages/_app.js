import App from 'next/app'
import React from 'react'
import GlobalState from '../context/GlobalState'

class MyApp extends App {




  render () {
    const {Component, pageProps} = this.props
    return (
      
      <GlobalState>
          <Component {...pageProps} />
      </GlobalState>
    )
  }
}

// MyApp.propTypes = {
//   Component: PropTypes.elementType.isRequired,
//   pageProps: PropTypes.object.isRequired,
// };

export default MyApp