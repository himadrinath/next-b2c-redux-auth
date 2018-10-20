import App, {Container} from 'next/app'
import React from 'react'
import withReduxStore from '../lib/redux-store'
import { Provider } from 'react-redux'

class MyApp extends App {
  // static getInitialProps({req, res}) {
  //   // if(req)
  //   // {
  //   //   console.log('its hit')
  //   //   console.log(req)
  //   //   // console.log(document['referrer'])
  //   // }
  //   if(!req)
  //   {
  //     //const {req, res}= context
  //     console.log(req)
  //   }

  //   // console.log( context ? context : null)
  //   //return {hi: 'abc'}
  //   return {}
  // }

  render () {
    const {Component, pageProps, reduxStore} = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

// MyApp.getInitialProps = async (context) => {
//   if(context)
//   {
//     console.log('its hit')
//     console.log(context.req)
//   }
// }

export default withReduxStore(MyApp)