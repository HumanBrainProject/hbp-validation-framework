<a name"0.0.0"></a>
## 0.0.0 (2016-04-20)


#### Bug Fixes

* **logout:** logout issue in firefox (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=a4e5b1fb997738f228bf85cd84b070c131f3e618)


<a name"0.0.0"></a>
## 0.0.0 (2016-04-12)


#### Bug Fixes

* **session:** call /session endpoint once (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=2baecd581219e73906998052b111b57881583cdf)


<a name"0.0.0"></a>
## 0.0.0 (2016-04-12)


#### Bug Fixes

* **ensure:** let clients not to require a token (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=c8bda2d7282c49013cd5f2a6cf43059c8a1e1e4b)


<a name"0.0.0"></a>
## 0.0.0 (2015-09-24)


#### Bug Fixes

* **logout:** logout msg is sent if no token (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=6b7e6d00b2e45dead0c5f2fe5321dd631d061265)


<a name"0.0.0"></a>
## 0.0.0 (2015-08-31)


#### Features

* **client:** code refactoring to support js clients (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=6f3ef7b8454eb36b40f7698fc4d65c924dfada54)


<a name"0.0.0"></a>
## 0.0.0 (2015-06-16)


#### Features

* **token:** load token present in window.bbpConfig.auth.token (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=0fbee76c2543545d027dcf29f5f9d944cbff7b15)


<a name"0.0.0"></a>
## 0.0.0 (2015-06-12)


#### Bug Fixes

* **token:** store 1 token per client+env (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=20a59674afd46f565af1a76c7153c0e7e5cbe1e5)


<a name"0.0.0"></a>
## 0.0.0 (2015-06-10)


#### Bug Fixes

* **login:** fix double login issue for cross-domain apps (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=e56f0697f1c67dca33de24c3621a4b131a953799)


<a name"0.0.0"></a>
## 0.0.0 (2015-06-01)


#### Bug Fixes

* **token:** dont inject a token if one is found (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=ae92b75f81452dda14b511f712ab19b5d10b7405)


#### Features

* **scopes:**
  * no default scope,rely on client conf (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=97f738ec26772255e87ee9707bc4dab614da7219)
  * expose scopes configuration (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=4c860eee0398e61d414315b6abdce105fb5ab4f1)


<a name"0.0.0"></a>
## 0.0.0 (2015-05-11)


#### Bug Fixes

* **logout:** prevent logout if no token in request (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=2c316fed0fd8c56bd0043e54d4b4e592462494fe)


<a name"0.0.0"></a>
## 0.0.0 (2015-05-08)


#### Bug Fixes

* **deps:** deps support strict mode and uglify (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=54f9af8617765de99ff503681410bd3a450c8e8a)


<a name"0.0.0"></a>
## 0.0.0 (2015-05-08)


<a name"0.0.0"></a>
## 0.0.0 (2015-05-05)


#### Features

* **logout:**
  * use custom session check endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=9f75e58581900df02c80fc9cba34fef58992cacb)
  * check oidc session + send logout evt (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=3350f5fce03f5209473093ee662c36bf72d6e55e)
  * use custom single logout api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=1f989baf358d6ef2916b14d71f6dda33232bd353)


<a name"0.0.0"></a>
## 0.0.0 (2015-04-28)


#### Bug Fixes

* **build:** fix build after refactor of crypto-js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=b030edc0ab91528ae002b1135749e0e19b8e32fb)


<a name"0.0.0"></a>
## 0.0.0 (2015-04-27)


#### Bug Fixes

* **token:**
  * ensure token presence w/o page reload (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=264449281a5733ef3c1b84eea60519f6192c524b)
  * rm expired tokens from local storage (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=b6c5e578cc2ec2a883d5214949ede897a8235667)


<a name="0.6.0"></a>
## 0.6.0 (2015-01-20)


#### Features

* **build:** enabled jjb support (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=06e32972c01eadb67d95b747ba2a7327be40d7ef)
* **deps:** upgrate to bbpConfig 0.2.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=a61cc54636ca11f6aab9fcafaf8aade19e772880)
* **force-auth:** logout force token refresh when ensureToken is true (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibOidcClient.git/commit/?id=da6caaa82353e5a35b256d0683e8a965c6c0b6fa)


