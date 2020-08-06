import React, {useEffect, useContext} from 'react'
import {msalApp} from '../lib/authentication';
import Head from '../components/head'
import Nav from '../components/nav'
import jwtDecode from 'jwt-decode'
import nextCookie from 'next-cookies'
import authContext from '../context/authContext';





  const Home=(props)=>{
    const context = useContext(authContext)
    
  const auth= new msalApp()

  useEffect(()=>{
    // if(props.authinit)
    // {
    //   context.acquire()
    // }

    if (document.cookie.split(';').some((item) => item.trim().startsWith('msal.idtoken=')))
    {
      context.acquire()
    }
  },[])

  
    return(
  <div>
    <Head title="Home" />
    <Nav />
      { context.auth.isAuth 
      ?
    <div className="hero">
      <h1 className="title">{context.auth.name}</h1>
      <p className="description">
      <button className="btn btn-primary" onClick={()=> context.signout()}>logout</button>
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
    :
    <div>
      <div className="centered">
    <img src="./images/scenario-idproofing.png"/>
    </div>
    <div className="centered">
    <h2>please sign in</h2><button onClick={()=> context.signin()}>sign in</button>
    </div>
    </div>
  }
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
      .centered {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        
        width: 100%;
      }
    `}</style>
  </div>
    
    )
    }



export async function getServerSideProps(ctx) {
  const {pathname, query, req, res}= ctx
const auth_token= nextCookie(ctx)["msal.idtoken"]
let session=null
try{
  session= jwtDecode(auth_token)
}
catch{
  session= null
}
const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent

let authinit= false

if(session){
  authinit= true
}
  return {props:{userAgent: userAgent, authinit: authinit}}
}

export default Home;
