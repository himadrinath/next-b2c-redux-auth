import React, {Component} from 'react'
//import Link from 'next/link'
import {msalApp} from '../lib/authentication';
import Head from '../components/head'
import Nav from '../components/nav'
import securePage from '../hoc/index'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import {authStart, authFail} from '../store/actions/authActions'




export class Home extends Component {
  static async getInitialProps( {ctx} ) {

    const {reduxStore, pathname, query, req, res}= ctx
  const auth_token= nextCookie(ctx)["msal.idtoken"]
  let session=null
  try{
    session= jwtDecode(auth_token)
  }
  catch{
    session= null
  }
  const isServer= ctx.req ? true: false
  const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent

  if(isServer && pathname!=="/auth/success"){
    console.log(session)
  if(session){
    reduxStore.dispatch(authStart())
  }
  else
  {
    reduxStore.dispatch(authFail('user not logged in from _app.js'))
  }
}
    return {userAgent: userAgent}
  }
  constructor(props)
  {
    super(props)
    this.state={
    }
    this.auth= new msalApp();
  }

  handleLogOutClick=()=>{
    this.auth.app.logout();
  }

  render()
  {

    return(
  <div>
    <Head title="Home" />
    <Nav />

    <div className="hero">
      <h1 className="title">{this.props.name}</h1>
      <p className="description">
      <button className="btn btn-primary" onClick={()=> this.handleLogOutClick()}>logout</button>
      </p>
      <div className="row">
      
      </div>

      <div className="row">
        <div className="card">

        <iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/GmBKlXED9Ug" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

        </div>
        <div className="card">

        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/PPs1z5EYPuU" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

        </div>
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

export default connect(mapStateToProps)(securePage(Home));
