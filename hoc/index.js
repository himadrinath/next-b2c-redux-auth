import React, {Fragment} from 'react';
import propTypes from 'prop-types';
import {msalApp, GRAPH_REQUESTS, isIE} from '../lib/authentication';
import {authFail, authStart, authSuccess} from '../store/actions/authActions'

const securePageHoc= Page => class SecurePage extends React.Component
{
    static propTypes={
        isAuth: propTypes.bool.isRequired
    }

    constructor(props)
    {
        super(props)
        this.state={
            mount: false
        }
        this.auth= new msalApp()
    }

    async componentDidMount(){
        this.setState({mount: true})

        const {dispatch} = this.props
       await this.auth.app.acquireTokenSilent( Object.assign({},GRAPH_REQUESTS.LOGIN, {forceRefresh : false}) ).then(token=>{
            if(token.error)
            {
                
                dispatch(authFail(token.error))
            }
            const{name, sub}= token.idTokenClaims
            dispatch(authSuccess(sub, name))
              }).catch(error=>{
                dispatch(authFail(error))
              })
  }

  initLogin=()=>{
    if(!this.props.isAuth)
    {
      if(isIE())
    {
      return this.auth.app.loginRedirect(GRAPH_REQUESTS.LOGIN);
    }
    const {dispatch} = this.props
    dispatch(authStart());
    this.auth.app.loginPopup(GRAPH_REQUESTS.LOGIN).then(token=>{
      if(token.error==null)
      {
      const{name, sub}= token.idTokenClaims
      dispatch(authSuccess(sub, name))
      }
      else
      {
        dispatch(authFail(token.error))
      }
    }).catch(error=>{
      dispatch(authFail(error))
    })
  }
  else{
    this.setState({isAuth: false});
    this.auth.logout();
  }

  }

    render(){
        const {isAuth, loading}= this.props

        return (
        <Fragment>
         { isAuth ? isAuth && !loading ?
                <Page {...this.props} />
                :
                <Fragment>
                <div className="centered"> <h1>loading..............</h1></div>
                </Fragment> 
                : 
                loading ? <div className="centered"> <h1>awaiting for auth..............</h1></div>
                :

                <div>
                  <img src="./images/scenario-idproofing.png"/>
                  <div className="centered">
                  <h2>please sign in</h2><button onClick={this.initLogin}>sign in</button>
                  </div>
                  </div>
         }

                <style jsx>
                {`
                    .centered {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        
                        width: 100%;
                      }
                `}
                </style>

                 </Fragment>
        )
                
    }

}

export default Page =>  securePageHoc(Page)

//https://github.com/luisrudge/next.js-auth0/blob/master/hocs/securePage.js

//https://auth0.com/blog/nextjs-6-features-introduction/