import * as Msal from 'msal';


// for more check out this repo 
// https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/react-sample-app

export const loginRequest = {
  scopes: ["openid"],
  prompt: 'select_account',
}

export const GRAPH_SCOPES = {
  OPENID: "openid",
  PROFILE: "profile",
  USER_READ: "User.Read",
  MAIL_READ: "Mail.Read"
};
export const GRAPH_REQUESTS = {
  LOGIN: {
      scopes: [
          GRAPH_SCOPES.OPENID,
          GRAPH_SCOPES.PROFILE,
          GRAPH_SCOPES.USER_READ
      ]
  },
  EMAIL: {
      scopes: [GRAPH_SCOPES.MAIL_READ]
  }
};

export const isIE = () => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ") > -1;
  const msie11 = ua.indexOf("Trident/") > -1;

  // If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
  const isEdge = ua.indexOf("Edge/") > -1;

  return msie || msie11 || isEdge;
};

export class msalApp {
  constructor() {
    this.applicationConfig = {
      auth:{
      clientId: '45bc9099-20bc-410d-bd5e-03294475fd0e',
        authority: 'https://login.microsoftonline.com/common',
        validateAuthority: true,
        navigateToLoginRequestUrl: false,
        postLogoutRedirectUri : 'https://localhost:3000'
      },
      cache:{
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
      },
      framework:{
        isAngular: false
      },
      system: {
        navigateFrameWait: 0,
        // logger: {
        //     error: console.error,
        //     errorPii: console.error,
        //     info: console.log,
        //     infoPii: console.log,
        //     verbose: console.log,
        //     verbosePii: console.log,
        //     warning: console.warn,
        //     warningPii: console.warn
        // }
    }
    };
    this.app = typeof window === 'undefined' ? null : new Msal.UserAgentApplication(
      this.applicationConfig
    )
    if(typeof window !== 'undefined')
    {
      //https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-sign-in
    this.app.handleRedirectCallback((error, response) => {
      if (error) {
          const errorMessage = error.errorMessage ? error.errorMessage : "Unable to acquire access token.";
          console.log(errorMessage)
      }
      else
      {
      }
  });
}
  }

}