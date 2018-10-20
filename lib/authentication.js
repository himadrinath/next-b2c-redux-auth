import * as Msal from 'msal';




export default class Authentication {
  // static propTypes = {
  //   cookies: instanceOf(Cookies).isRequired
  // };
  constructor() {
    let PROD_REDIRECT_URI = 'https://sunilbandla.github.io/react-msal-sample/';
    const redirectUri = 'http://localhost:3000/auth/success';
    // let redirectUri = window.location.origin;
    // console.log(window.location);
    // if (window.location.hostname !== 'localhost') {
    //   redirectUri = PROD_REDIRECT_URI;
    // }

  //   function authCallback(errorDesc, token, error, tokenType) {
  //     if (token) {
  //     }
  //     else {
  //         log(error + ":" + errorDesc);
  //     }
  // }

    this.applicationConfig = {
      clientID: 'fd7a1a66-a865-40c9-ae57-ed0189b796a5',
      graphScopes: ['openid', 'https://linklookrauthdev.onmicrosoft.com/node/write']
    };
    this.app = typeof window === 'undefined' ? null : new Msal.UserAgentApplication(
      this.applicationConfig.clientID,
      'https://login.microsoftonline.com/tfp/auth.linklookr.com/B2C_1_sign_in_up',
      () => {
        // callback for login redirect
      },
      // (errorDesc,token,error,tokenType)=>{
        //if(token){
          // localStorage.setItem('msal.user.token',token);
          //  window.location.href='/';
          // console.log('from auth.js :'+ token+ ' & token type: '+ tokenType)
        //}
      // },
      {
        redirectUri: redirectUri,
        cacheLocation: 'localStorage',
        navigateToLoginRequestUrl: false
        //storeAuthStateInCookie: true
      }
    );
  }

  


  login = async () => {
    try {
          const idToken = await this.app.loginPopup(this.applicationConfig.graphScopes);
          //const user = this.app.getUser();
          console.log("access_token:" + idToken);
          // const { cookies } = Cookies;
          // cookies.set('id_token', idToken, { path: '/' });
          if (idToken) {
              return idToken;
          }
          else {
              return null;
          }
      }
      catch (e) {
          return null;
      }
  };
  logout = () => {
    this.app.logout();
  };
  getToken = async () => {
    try {
      const accessToken = await this.app.acquireTokenSilent(this.applicationConfig.graphScopes);
      //console.log(accessToken);
      return accessToken;
    }
    catch (error) {
      try {
        const accessToken_1 = await this.app
          .acquireTokenPopup(this.applicationConfig.graphScopes);
        return accessToken_1;
      }
      catch (err) {
        console.error(err);
      }
    }
  };

  acquireUserTokenSilent=(user)=>{
   const auth_token= this.app.acquireTokenSilent(this.applicationConfig.graphScopes, 'https://login.microsoftonline.com/tfp/auth.linklookr.com/B2C_1_sign_in_up', user).then((token)=>{
      return {idToken: token, arror: null};
    }).catch((error)=>{
      return {idToken: null, arror: error}
    });

    return auth_token;
  }

  getAccessToken = () =>{
   return this.app.user.accessToken;
  }

  getUser =() =>{
    return this.app.getUser();
  }

  verifyToken =() =>{
    return null;
  }

  // newUser=(user)=>{
  //   this.app.cr
  // }

}