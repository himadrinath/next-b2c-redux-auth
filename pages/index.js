import React, {Component} from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import { connect } from 'react-redux'
import jsCookie from 'js-cookie'
import Cookies from 'next-cookies'
import jwtDecode from 'jwt-decode'
import * as Msal  from 'msal'
import {IdToken} from '../node_modules/msal/lib-commonjs/IdToken'
import Authentication from '../lib/authentication';
import {authStart, authFail, authSuccess} from '../store/actions/authActions'




export class Home extends Component {
  static getInitialProps(context ) {
    const userAgent = context.req ? context.req.headers['user-agent'] : navigator.userAgent
    const {reduxStore}= context

    const isServer= !!context.req
    
    const {access_token}= Cookies(context)
    const login_user = access_token ? jwtDecode(access_token): null

    if(login_user && isServer)
    {
        reduxStore.dispatch(authSuccess(access_token))
    }
    return {userAgent: userAgent}
  }

  constructor(props)
  {
    super(props)
    this.state={
      isAuth: this.props.user? true : this.props.isAuth
    }
    this.auth= new Authentication()
  }

  componentWillMount(){
  }

  componentDidMount(){

    if(!this.auth.getUser() && this.state.isAuth)
    {
      console.log('user not found')

      const idToken = new IdToken(this.props.token);
      const utid= '{your active directory domain id}'
      const uid= this.props.user.oid+ '-'+ this.props.user.tfp
      const clientInfo = {uid: uid ,utid: utid }
      const newUser = Msal.User.createUser(idToken, clientInfo, 'https://login.microsoftonline.com/tfp/{domain name}/{policy}');

      this.auth.acquireUserTokenSilent(newUser).then(data=>{
        const {newIdToken} ={...data}
        
        if(newIdToken)
        {
          jsCookie.remove('access_token')
          const inSixtyMinutes = new Date(new Date().getTime() + 60 * 60 * 1000)
        jsCookie.set("access_token", newIdToken, {expires: inSixtyMinutes})
        }
      }).catch(error=>{
        console.log(error)
      })
    }

    
    
    // console.log(this.auth.getUser());
    // const isLogedin= this.auth.getUser() ?  true :  false;
  }

  initLogin=()=>{

    if(!this.state.isAuth)
    {
    const {dispatch} = this.props
    dispatch(authStart());
    this.auth.login().then(token=>{
      if(token!==null)
      {
      this.setState({isAuth: true})
      var inSixtyMinutes = new Date(new Date().getTime() + 60 * 60 * 1000)
      jsCookie.set("access_token", token, {expires: inSixtyMinutes})
      dispatch(authSuccess(token))
      }
    })
  }
  else{
    jsCookie.remove('access_token');
    this.setState({isAuth: false});
    this.auth.logout();
  }

  }

  handleLogClick=()=>{
    this.initLogin();
  }

  render()
  {

    return(
  <div>
    <Head title="Home" />
    <Nav />

    <div className="hero">
      <h1 className="title">Welcome to Next!</h1>
      <p className="description">
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>
      <div className="row">
      <button className="btn btn-primary" onClick={()=> this.handleLogClick()}>{ this.state.isAuth ? "logout" : "login"}</button>
      </div>

      <div className="row">
        <Link href="https://github.com/zeit/next.js#getting-started">
          <a className="card">
            <h3>Getting Started &rarr;</h3>
            <p>Learn more about Next on Github and in their examples</p>
          </a>
        </Link>
        <Link href="https://open.segment.com/create-next-app">
          <a className="card">
            <h3>Examples &rarr;</h3>
            <p>
              Find other example boilerplates on the{' '}
              <code>create-next-app</code> site
            </p>
          </a>
        </Link>
        <Link href="https://github.com/segmentio/create-next-app">
          <a className="card">
            <h3>Create Next App &rarr;</h3>
            <p>Was this tool helpful? Let us know how we can improve it</p>
          </a>
        </Link>
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
    )
    }
    }

    const mapStateToProps = state => {
      const newState = {...state}
      return newState;
    }

export default connect(mapStateToProps)(Home);
