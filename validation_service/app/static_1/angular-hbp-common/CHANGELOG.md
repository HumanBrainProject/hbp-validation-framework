<a name"2.3.0"></a>
## 2.3.0 (2016-06-29)


#### Bug Fixes

* **ResultSet:** toArray can be called immediately (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3241e4651086cc3ecfbade4fe08b92e1e5a80319)
* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **collabStore:** factory was never called before (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=18e2907a49ff61bf9499be8d7557a7fd2f52ec38)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:**
  * allow options to be passed to the API calls (eg. sorting) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5701ead47aa81b704ef48eaab5573ccb11b39b9)
  * fix issue in getAdmins with pageSize (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=eb0b65add901c77cb16fee9276ac3c7b12cdf727)
  * use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:**
  * no count information result in a length of -1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8493b5a25681778be10b3315eafb591e6d2309bf)
  * promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **user-selector:** fix a bug where onUserSelect callback is never called (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e6008485cfaca4e20efbc8510c6b5af7dab58892)
* **userDirectory:** api.user.v0 is optional (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=38acbe003091db7b8b29dab7e6137195821e3681)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:**
  * support security question in confirm (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e7f012be835b0fa3fd4281ac66f87909fe4b61ae)
  * error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * default pagination is 50 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c9044e8c13c2c8166723ee29b46199b28d22fbf)
  * Add update method. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceaa619f1c43766d5a3f54e976d9ee29536d8fdf)
  * accept a factory options (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf3d7db55cc813ef7dff2328181e3863ad80eda3)
  * add getParentGroups and getManagedGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e01fade62d2c345d1e1c1c9c781df4d0ce64ff9c)
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:**
  * Accept a resultsFactory function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=15ea25fca512024651174afcb4e74a606717e11c)
  * Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **search:** add search method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=481e142a4f3707214d8b88d93df0b14d37fff7cb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userDirectory:**
  * adminGroups and memberGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f5c3938defe4dca045d0794687131edb42d17a2d)
  * list and adminGroups, accept factory option (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a8f9009da63ec06a5209e28d93f0b766595a68fb)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.2.11"></a>
### 2.2.11 (2016-06-01)


#### Bug Fixes

* **ResultSet:** toArray can be called immediately (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3241e4651086cc3ecfbade4fe08b92e1e5a80319)
* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **collabStore:** factory was never called before (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=18e2907a49ff61bf9499be8d7557a7fd2f52ec38)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:**
  * allow options to be passed to the API calls (eg. sorting) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5701ead47aa81b704ef48eaab5573ccb11b39b9)
  * fix issue in getAdmins with pageSize (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=eb0b65add901c77cb16fee9276ac3c7b12cdf727)
  * use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:**
  * no count information result in a length of -1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8493b5a25681778be10b3315eafb591e6d2309bf)
  * promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **user-selector:** fix a bug where onUserSelect callback is never called (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e6008485cfaca4e20efbc8510c6b5af7dab58892)
* **userDirectory:** api.user.v0 is optional (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=38acbe003091db7b8b29dab7e6137195821e3681)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:**
  * support security question in confirm (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e7f012be835b0fa3fd4281ac66f87909fe4b61ae)
  * error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * default pagination is 50 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c9044e8c13c2c8166723ee29b46199b28d22fbf)
  * Add update method. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceaa619f1c43766d5a3f54e976d9ee29536d8fdf)
  * accept a factory options (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf3d7db55cc813ef7dff2328181e3863ad80eda3)
  * add getParentGroups and getManagedGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e01fade62d2c345d1e1c1c9c781df4d0ce64ff9c)
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:**
  * Accept a resultsFactory function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=15ea25fca512024651174afcb4e74a606717e11c)
  * Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **search:** add search method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=481e142a4f3707214d8b88d93df0b14d37fff7cb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userDirectory:**
  * adminGroups and memberGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f5c3938defe4dca045d0794687131edb42d17a2d)
  * list and adminGroups, accept factory option (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a8f9009da63ec06a5209e28d93f0b766595a68fb)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.2.10"></a>
### 2.2.10 (2016-05-18)


#### Bug Fixes

* **ResultSet:** toArray can be called immediately (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3241e4651086cc3ecfbade4fe08b92e1e5a80319)
* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **collabStore:** factory was never called before (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=18e2907a49ff61bf9499be8d7557a7fd2f52ec38)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:**
  * allow options to be passed to the API calls (eg. sorting) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5701ead47aa81b704ef48eaab5573ccb11b39b9)
  * fix issue in getAdmins with pageSize (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=eb0b65add901c77cb16fee9276ac3c7b12cdf727)
  * use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:**
  * no count information result in a length of -1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8493b5a25681778be10b3315eafb591e6d2309bf)
  * promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **user-selector:** fix a bug where onUserSelect callback is never called (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e6008485cfaca4e20efbc8510c6b5af7dab58892)
* **userDirectory:** api.user.v0 is optional (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=38acbe003091db7b8b29dab7e6137195821e3681)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:**
  * support security question in confirm (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e7f012be835b0fa3fd4281ac66f87909fe4b61ae)
  * error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * default pagination is 50 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c9044e8c13c2c8166723ee29b46199b28d22fbf)
  * Add update method. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceaa619f1c43766d5a3f54e976d9ee29536d8fdf)
  * accept a factory options (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf3d7db55cc813ef7dff2328181e3863ad80eda3)
  * add getParentGroups and getManagedGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e01fade62d2c345d1e1c1c9c781df4d0ce64ff9c)
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:**
  * Accept a resultsFactory function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=15ea25fca512024651174afcb4e74a606717e11c)
  * Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **search:** add search method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=481e142a4f3707214d8b88d93df0b14d37fff7cb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userDirectory:**
  * adminGroups and memberGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f5c3938defe4dca045d0794687131edb42d17a2d)
  * list and adminGroups, accept factory option (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a8f9009da63ec06a5209e28d93f0b766595a68fb)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.2.9"></a>
### 2.2.9 (2016-05-17)


#### Bug Fixes

* **ResultSet:** toArray can be called immediately (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3241e4651086cc3ecfbade4fe08b92e1e5a80319)
* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **collabStore:** factory was never called before (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=18e2907a49ff61bf9499be8d7557a7fd2f52ec38)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:**
  * fix issue in getAdmins with pageSize (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=eb0b65add901c77cb16fee9276ac3c7b12cdf727)
  * use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:**
  * no count information result in a length of -1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8493b5a25681778be10b3315eafb591e6d2309bf)
  * promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **user-selector:** fix a bug where onUserSelect callback is never called (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e6008485cfaca4e20efbc8510c6b5af7dab58892)
* **userDirectory:** api.user.v0 is optional (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=38acbe003091db7b8b29dab7e6137195821e3681)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:**
  * support security question in confirm (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e7f012be835b0fa3fd4281ac66f87909fe4b61ae)
  * error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * default pagination is 50 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c9044e8c13c2c8166723ee29b46199b28d22fbf)
  * Add update method. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceaa619f1c43766d5a3f54e976d9ee29536d8fdf)
  * accept a factory options (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf3d7db55cc813ef7dff2328181e3863ad80eda3)
  * add getParentGroups and getManagedGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e01fade62d2c345d1e1c1c9c781df4d0ce64ff9c)
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:**
  * Accept a resultsFactory function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=15ea25fca512024651174afcb4e74a606717e11c)
  * Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **search:** add search method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=481e142a4f3707214d8b88d93df0b14d37fff7cb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userDirectory:**
  * adminGroups and memberGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f5c3938defe4dca045d0794687131edb42d17a2d)
  * list and adminGroups, accept factory option (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a8f9009da63ec06a5209e28d93f0b766595a68fb)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.2.8"></a>
### 2.2.8 (2016-05-17)


#### Bug Fixes

* **ResultSet:** toArray can be called immediately (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3241e4651086cc3ecfbade4fe08b92e1e5a80319)
* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **collabStore:** factory was never called before (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=18e2907a49ff61bf9499be8d7557a7fd2f52ec38)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:** use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:**
  * no count information result in a length of -1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8493b5a25681778be10b3315eafb591e6d2309bf)
  * promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **user-selector:** fix a bug where onUserSelect callback is never called (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e6008485cfaca4e20efbc8510c6b5af7dab58892)
* **userDirectory:** api.user.v0 is optional (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=38acbe003091db7b8b29dab7e6137195821e3681)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:**
  * support security question in confirm (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e7f012be835b0fa3fd4281ac66f87909fe4b61ae)
  * error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * default pagination is 50 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c9044e8c13c2c8166723ee29b46199b28d22fbf)
  * Add update method. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceaa619f1c43766d5a3f54e976d9ee29536d8fdf)
  * accept a factory options (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf3d7db55cc813ef7dff2328181e3863ad80eda3)
  * add getParentGroups and getManagedGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e01fade62d2c345d1e1c1c9c781df4d0ce64ff9c)
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:**
  * Accept a resultsFactory function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=15ea25fca512024651174afcb4e74a606717e11c)
  * Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **search:** add search method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=481e142a4f3707214d8b88d93df0b14d37fff7cb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userDirectory:**
  * adminGroups and memberGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f5c3938defe4dca045d0794687131edb42d17a2d)
  * list and adminGroups, accept factory option (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a8f9009da63ec06a5209e28d93f0b766595a68fb)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.2.7"></a>
### 2.2.7 (2016-05-09)


#### Bug Fixes

* **ResultSet:** toArray can be called immediately (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3241e4651086cc3ecfbade4fe08b92e1e5a80319)
* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **collabStore:** factory was never called before (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=18e2907a49ff61bf9499be8d7557a7fd2f52ec38)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:** use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:**
  * no count information result in a length of -1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8493b5a25681778be10b3315eafb591e6d2309bf)
  * promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **user-selector:** fix a bug where onUserSelect callback is never called (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e6008485cfaca4e20efbc8510c6b5af7dab58892)
* **userDirectory:** api.user.v0 is optional (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=38acbe003091db7b8b29dab7e6137195821e3681)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:**
  * support security question in confirm (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e7f012be835b0fa3fd4281ac66f87909fe4b61ae)
  * error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * accept a factory options (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf3d7db55cc813ef7dff2328181e3863ad80eda3)
  * add getParentGroups and getManagedGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e01fade62d2c345d1e1c1c9c781df4d0ce64ff9c)
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:**
  * Accept a resultsFactory function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=15ea25fca512024651174afcb4e74a606717e11c)
  * Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **search:** add search method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=481e142a4f3707214d8b88d93df0b14d37fff7cb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userDirectory:**
  * adminGroups and memberGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f5c3938defe4dca045d0794687131edb42d17a2d)
  * list and adminGroups, accept factory option (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a8f9009da63ec06a5209e28d93f0b766595a68fb)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.2.6"></a>
### 2.2.6 (2016-05-03)


#### Bug Fixes

* **ResultSet:** toArray can be called immediately (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3241e4651086cc3ecfbade4fe08b92e1e5a80319)
* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **collabStore:** factory was never called before (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=18e2907a49ff61bf9499be8d7557a7fd2f52ec38)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:** use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:**
  * no count information result in a length of -1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8493b5a25681778be10b3315eafb591e6d2309bf)
  * promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **user-selector:** fix a bug where onUserSelect callback is never called (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e6008485cfaca4e20efbc8510c6b5af7dab58892)
* **userDirectory:** api.user.v0 is optional (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=38acbe003091db7b8b29dab7e6137195821e3681)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * accept a factory options (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf3d7db55cc813ef7dff2328181e3863ad80eda3)
  * add getParentGroups and getManagedGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e01fade62d2c345d1e1c1c9c781df4d0ce64ff9c)
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:**
  * Accept a resultsFactory function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=15ea25fca512024651174afcb4e74a606717e11c)
  * Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **search:** add search method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=481e142a4f3707214d8b88d93df0b14d37fff7cb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userDirectory:**
  * adminGroups and memberGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f5c3938defe4dca045d0794687131edb42d17a2d)
  * list and adminGroups, accept factory option (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a8f9009da63ec06a5209e28d93f0b766595a68fb)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.2.5"></a>
### 2.2.5 (2016-04-27)


#### Bug Fixes

* **ResultSet:** toArray can be called immediately (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3241e4651086cc3ecfbade4fe08b92e1e5a80319)
* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **collabStore:** factory was never called before (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=18e2907a49ff61bf9499be8d7557a7fd2f52ec38)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:** use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:**
  * no count information result in a length of -1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8493b5a25681778be10b3315eafb591e6d2309bf)
  * promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **user-selector:** fix a bug where onUserSelect callback is never called (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e6008485cfaca4e20efbc8510c6b5af7dab58892)
* **userDirectory:** api.user.v0 is optional (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=38acbe003091db7b8b29dab7e6137195821e3681)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * accept a factory options (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf3d7db55cc813ef7dff2328181e3863ad80eda3)
  * add getParentGroups and getManagedGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e01fade62d2c345d1e1c1c9c781df4d0ce64ff9c)
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:**
  * Accept a resultsFactory function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=15ea25fca512024651174afcb4e74a606717e11c)
  * Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **search:** add search method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=481e142a4f3707214d8b88d93df0b14d37fff7cb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userDirectory:**
  * adminGroups and memberGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f5c3938defe4dca045d0794687131edb42d17a2d)
  * list and adminGroups, accept factory option (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a8f9009da63ec06a5209e28d93f0b766595a68fb)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.2.4"></a>
### 2.2.4 (2016-04-22)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **collabStore:** factory was never called before (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=18e2907a49ff61bf9499be8d7557a7fd2f52ec38)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:** use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:**
  * no count information result in a length of -1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8493b5a25681778be10b3315eafb591e6d2309bf)
  * promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **user-selector:** fix a bug where onUserSelect callback is never called (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e6008485cfaca4e20efbc8510c6b5af7dab58892)
* **userDirectory:** api.user.v0 is optional (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=38acbe003091db7b8b29dab7e6137195821e3681)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * accept a factory options (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf3d7db55cc813ef7dff2328181e3863ad80eda3)
  * add getParentGroups and getManagedGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e01fade62d2c345d1e1c1c9c781df4d0ce64ff9c)
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:**
  * Accept a resultsFactory function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=15ea25fca512024651174afcb4e74a606717e11c)
  * Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **search:** add search method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=481e142a4f3707214d8b88d93df0b14d37fff7cb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userDirectory:**
  * adminGroups and memberGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f5c3938defe4dca045d0794687131edb42d17a2d)
  * list and adminGroups, accept factory option (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a8f9009da63ec06a5209e28d93f0b766595a68fb)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.2.3"></a>
### 2.2.3 (2016-04-20)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **collabStore:** factory was never called before (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=18e2907a49ff61bf9499be8d7557a7fd2f52ec38)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:** use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:**
  * no count information result in a length of -1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8493b5a25681778be10b3315eafb591e6d2309bf)
  * promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectory:** api.user.v0 is optional (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=38acbe003091db7b8b29dab7e6137195821e3681)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * accept a factory options (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf3d7db55cc813ef7dff2328181e3863ad80eda3)
  * add getParentGroups and getManagedGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e01fade62d2c345d1e1c1c9c781df4d0ce64ff9c)
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:**
  * Accept a resultsFactory function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=15ea25fca512024651174afcb4e74a606717e11c)
  * Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **search:** add search method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=481e142a4f3707214d8b88d93df0b14d37fff7cb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userDirectory:**
  * adminGroups and memberGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f5c3938defe4dca045d0794687131edb42d17a2d)
  * list and adminGroups, accept factory option (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a8f9009da63ec06a5209e28d93f0b766595a68fb)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.2.2"></a>
### 2.2.2 (2016-04-18)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **collabStore:** factory was never called before (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=18e2907a49ff61bf9499be8d7557a7fd2f52ec38)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:** use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:**
  * no count information result in a length of -1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8493b5a25681778be10b3315eafb591e6d2309bf)
  * promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectory:** api.user.v0 is optional (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=38acbe003091db7b8b29dab7e6137195821e3681)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * accept a factory options (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf3d7db55cc813ef7dff2328181e3863ad80eda3)
  * add getParentGroups and getManagedGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e01fade62d2c345d1e1c1c9c781df4d0ce64ff9c)
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:**
  * Accept a resultsFactory function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=15ea25fca512024651174afcb4e74a606717e11c)
  * Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userDirectory:** list and adminGroups, accept factory option (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a8f9009da63ec06a5209e28d93f0b766595a68fb)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.2.1"></a>
### 2.2.1 (2016-04-13)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **collabStore:** factory was never called before (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=18e2907a49ff61bf9499be8d7557a7fd2f52ec38)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:** use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:**
  * no count information result in a length of -1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8493b5a25681778be10b3315eafb591e6d2309bf)
  * promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectory:** api.user.v0 is optional (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=38acbe003091db7b8b29dab7e6137195821e3681)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * accept a factory options (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf3d7db55cc813ef7dff2328181e3863ad80eda3)
  * add getParentGroups and getManagedGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e01fade62d2c345d1e1c1c9c781df4d0ce64ff9c)
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:**
  * Accept a resultsFactory function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=15ea25fca512024651174afcb4e74a606717e11c)
  * Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userDirectory:** list and adminGroups, accept factory option (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a8f9009da63ec06a5209e28d93f0b766595a68fb)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.2.0"></a>
## 2.2.0 (2016-04-11)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **collabStore:** factory was never called before (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=18e2907a49ff61bf9499be8d7557a7fd2f52ec38)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:** use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectory:** api.user.v0 is optional (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=38acbe003091db7b8b29dab7e6137195821e3681)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * accept a factory options (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf3d7db55cc813ef7dff2328181e3863ad80eda3)
  * add getParentGroups and getManagedGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e01fade62d2c345d1e1c1c9c781df4d0ce64ff9c)
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:**
  * Accept a resultsFactory function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=15ea25fca512024651174afcb4e74a606717e11c)
  * Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userDirectory:** list and adminGroups, accept factory option (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a8f9009da63ec06a5209e28d93f0b766595a68fb)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.1.2"></a>
### 2.1.2 (2016-04-07)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:** use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectory:** api.user.v0 is optional (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=38acbe003091db7b8b29dab7e6137195821e3681)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * add getParentGroups and getManagedGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e01fade62d2c345d1e1c1c9c781df4d0ce64ff9c)
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:** Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.1.1"></a>
### 2.1.1 (2016-04-05)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:** use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:** Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.1.0"></a>
## 2.1.0 (2016-04-05)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * remove unused library from test (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7ce6d97b22b475d31eb88fb109a15693de00eedb)
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **groupStore:** use _embedded.groups to retrieve results when needed. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6a8e2e262390106243da0be44e3236a599ba256d)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:** Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.0.3"></a>
### 2.0.3 (2016-04-01)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:**
  * Added methods to retrieve memberGroups and admins, adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59dcde5a4356fe84cc241b9cf72ca6a309e0b249)
  * add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:** Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.0.2"></a>
### 2.0.2 (2016-04-01)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:** add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:**
  * adminGroups support parameters (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=55c1a81de8feffba3a675472f62687d42c80ec12)
  * created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:** Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.0.1"></a>
### 2.0.1 (2016-02-25)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:** add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:** Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.0.0-dev.14"></a>
### 2.0.0-dev.14 (2016-02-24)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:** add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:** Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * refactor isHbpMember and isAdmin (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3c5386e279d3c09c240c3e024744faabb9d33207)
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.0.0-dev.13"></a>
### 2.0.0-dev.13 (2016-02-19)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:** add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **paginatedResultSet:** Add a ResultSet.toArray() method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f03991f76321eca31ea6a0dd3a42d0124e9c7bb7)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v0:** add isHbpMember method (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4da5ec6b5f1efb9552f476b52f273da4f94b928)
* **v1:**
  * add isHbpMember() function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0c22f460f78bece72823f56c5b6dbc7b91ec4603)
  * fix getCurrentUser groups. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1a307d120f51046501d8180045fdbd7979c834f8)
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.0.0-dev.12"></a>
### 2.0.0-dev.12 (2016-02-19)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:** add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v1:**
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.0.0-dev.11"></a>
### 2.0.0-dev.11 (2016-02-15)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **v1:** group/member has been refactored (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=355710e5dd44431481764f69542110e13692df46)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:** add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v1:**
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.0.0-dev.10"></a>
### 2.0.0-dev.10 (2016-02-03)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbp-user-selector:** add a 300ms debounce to search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fdf2e3acf6da108e2c7e455e6309b669f63b273e)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **lint:**
  * remove unused injected service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b56844a520dbb499d6d9a13563fd2ce5b98793ea)
  * remove unreachable code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a3ecf52a2f4f714ddb47a6db812c0cd2987abce8)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **test:** fix template issues in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ef13421b6b49755e5c8d931b91d74eaef6ba6a64)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:** add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v1:**
  * support for getMembers() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0f223cd8b8b967a21d4f1cc2712f312757fb5d96)
  * support for addMembers and removeMembers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=94ad85aa697cc06ff2a890da39e19eaef0bfdf40)
  * group.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f45310c24734553e41cc980ebb21873c0b10f05c)
  * user.list accept multiple filter keys (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ceb21c94ffd89725e8ec86731204c073d4ce7f36)
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.0.0-dev.9"></a>
### 2.0.0-dev.9 (2016-02-01)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:** add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v1:**
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.0.0-dev.8"></a>
### 2.0.0-dev.8 (2016-02-01)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * remove call to autoprefixer (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2652a038769e72ac1ae15f14f96395f16d6414eb)
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:**
  * typo in documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=cf234257ccb00445d03c6f2b7253145462d01ce0)
  * fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:** add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)
* **v1:**
  * hbpIdentityUserDirectory use groupDirectory v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=444a33be6178edd3c723bdbc0ddb365d68776e0c)
  * add hbpIdentityUserDirectory.adminGroups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=22ae3cf3b0d5dda00c8837fd6783e1deebfa47ce)
  * add hbpGroupStore listing supports (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ce5461011fb107336d8f5485bbfb9b7ca98dea2e)
  * enable userApiV1 in tests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e213b56b327fc54e9e5c896679df6a1b86a22f95)
  * add a utility function to return the API version (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4afb5b9af92395f5bb2213d27b113bb92ebb62a6)


<a name"2.0.0-dev.7"></a>
### 2.0.0-dev.7 (2016-01-27)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * migrate user update to v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fd2834ccaba76974c445e5bbe2d89310a5718af0)
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **loading:** make directive work w/ Angular 1.4.9 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9529f4dbf11cf7162ee78dbb7a9430d4b4efc02c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **groupStore:** add createGroup and deleteGroup methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=59fa7d81fe521a40be2c05a0e1a6a69c8493161e)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * by default sort users by lastname (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a4c1226c512de435ae95962a8deaa2f0a602a75f)
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)


<a name"2.0.0-dev.6"></a>
### 2.0.0-dev.6 (2016-01-20)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **identity:**
  * support for pageSize=0 in list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0053c42bb17456f175cbd114fccde5912496061b)
  * list function supports v1 api (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7423b9fc824e6f42eef3d35b90d733f66339090c)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)


<a name"2.0.0-dev.5"></a>
### 2.0.0-dev.5 (2016-01-19)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * support for user api v1 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7c32373cddb27085f3ffd58c14098651f78582b4)
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)


<a name"2.0.0-dev.4"></a>
### 2.0.0-dev.4 (2015-11-03)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collabStore:** add collab.private (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=513ae97419f959a88f3837a44f5879917b3d18bd)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)


<a name"2.0.0-dev.3"></a>
### 2.0.0-dev.3 (2015-10-26)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **hbpLoading:** add a directive to show a loading message (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1d3992ae51dac5e70651298fcb3622cc8d271875)
* **hbpPerformAction:** toggle loading class while performing (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e795e89465f369ab622a9eb524c02b2e82aba809)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)


<a name"2.0.0-dev.2"></a>
### 2.0.0-dev.2 (2015-10-13)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * regression lead to empty team list (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=91bab5fb12d4e948abe896b89a34f3fcbdb291b5)
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)


<a name"2.0.0-dev.1"></a>
### 2.0.0-dev.1 (2015-10-09)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * push release to the right branch. (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3f38a8dd617eefc74fe4091dab91bace40f3b32a)
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:**
  * no more css generated (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5d0f02baab57f8d75f2913d211889628463cda44)
  * fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)


<a name"2.0.0-dev.0"></a>
### 2.0.0-dev.0 (2015-10-08)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * recognize prerelease target (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f7faf831a0e0912f9e6d44f6db3e9966f26279d7)
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **paginatedResultSet:** promise contains a instance ref (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c00dc5f903d3ba68a1564768cc87d386b3ceaf06)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **userInTeam:** regression (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=65d22f5ce8003d1b7d20bff081f6a90aaab03472)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpCollabStore:** mine accepts a search field (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2ceaf431324e8d52416c44f22cd605cf110cf1fd)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **hbpIdentity:** created the module hbpIdentity (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2b7b8e0fc24b36895deb9f789c64610eeda6d0f3)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styleguide:** removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=43979593bec2b4c7a8127ec720098d067157db5a)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:**
  * removed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ba79beb301f5e95257076ddb4e3f089048689a30)
  * use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)


<a name"1.1.0"></a>
## 1.1.0 (2015-09-24)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)
* **util:** Add hbpUtil. paginatedResultSet(promise, options) (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4c28dfe142e2eac2b93b1f2f223e0bf4af2f89ae)


<a name"1.0.3"></a>
### 1.0.3 (2015-08-04)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * updated doc server name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c784891f468b763ddb0f88bf36620a25c4f8a23f)
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **error:** return raw data if unknown msg format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2152bbf3ef806fbfe524402808684a05ab68c047)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)


<a name"1.0.2"></a>
### 1.0.2 (2015-07-10)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)


<a name"1.0.1"></a>
### 1.0.1 (2015-07-07)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)


<a name"1.0.0"></a>
## 1.0.0 (2015-05-26)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:**
  * angular-bootstrap 0.13 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=60c65be3e1b5e12f6007fd7a2d45054d183bb289)
  * user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **user:** fix getCurrentUserOnly function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a380b896d57044defa2f958cfc9a1a48916f2fbd)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **collaboratory:** remove all visual part (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=ac9177813e3dc8ca0f899b9aa5b1ae4b6fd01f28)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **getCurrentUserOnly:** user info w/o groups (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3cad9f6fd2cbe0222a4fedca22d23149ce38fd37)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)


<a name"0.7.14"></a>
### 0.7.14 (2015-04-29)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:** user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **mine:** get all collabs for mine (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=7b0a3d1d49eff6d578b878aa00583d7650b11d45)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **roles:** try to post if put fails with 404 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6fe2a05a8ca3be9a80b4d61be3494f81bff672aa)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)


<a name="0.7.13"></a>
### 0.7.13 (2015-04-24)


#### Bug Fixes

* **build:** fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **team:**
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab:** retrieve the collab using label (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a0d4acafa48eac2fca39be5ddf726883efae5732)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)


<a name"0.7.12"></a>
### 0.7.12 (2015-04-20)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:** user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **auth:** Add auth checking function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d35a9f67c2984a709649e03dc06cb176d9ec6629)
* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * func to check if user belongs to group (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f4fa1f623fbb2c6c894fbdde3147309eabf73f68)
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)


<a name"0.7.11"></a>
### 0.7.11 (2015-04-16)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:** user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)


<a name"0.7.10"></a>
### 0.7.10 (2015-04-14)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **clean:** remove request to load current user (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3a1eb176aefc57b5a301523487054ffd6f5c2665)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:** user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **cache:** caching groupByName requests (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9632c6d82a6d7f6277d5ba33cbcf9c3420ed0a14)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **directive:** added user selector directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1161dafd17cefa1cbd75924aa22f29440ea76408)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **group:**
  * add getByName function to group-store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3ad3d64d678c8af467a33fdd8f0b1ab127cfb0c8)
  * added Groups store (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4878e86cd732d9e05d8a36bbda194c258270f8dc)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **roles:** Add endpoint access to roles (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6df1d12c3dbd98d9272cc651a077ae8e553cabeb)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:**
  * disable input during onSelect callback (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=9dd7433e1dac1118093be02d69d810c97942b809)
  * added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)


<a name"0.7.9"></a>
### 0.7.9 (2015-04-08)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **collab:** deserialise deleted property (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4b80f9d1b602ae9cf652a6cb0e55efecc1dfc5b4)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **delete:** ensure body is sent with delete (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0ee61574cc8e72084a5effe1c23e4afbfde83274)
* **deps:** user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:** added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)


<a name"0.7.8"></a>
### 0.7.8 (2015-04-08)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **deps:** user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **generated-icon:** fix element size when hbpSize is defined (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e21ec55801f94d5d7552b9d587eb2a8eee843fc3)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:** added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)


<a name"0.7.7"></a>
### 0.7.7 (2015-04-08)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **collab-store:**
  * add missing return statement (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d553670a8ccc43ec5b417d9caf16b6c482216c63)
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **deps:** user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:**
  * Modify the delete and put methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fb930827560101757b0162512c076dfc5cccf1a2)
  * correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **collab-store:**
  * use cache and classes for Collab and Context retrieval (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=929a22f469b583f4295163a334c9b59f468a8e68)
  * retrieve context using uuid (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d94dc8bc9d6e1b0cfed6b6ab1ec7ebc8d56ba83a)
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:** added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)


<a name"0.7.6"></a>
### 0.7.6 (2015-04-07)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **collab-store:**
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **deps:** user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **filters:** hbp-yes-no works with boolean (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a5a9d0ecd82da25f867305c09dc27a615c7fc4cd)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **team:** correct the add and delete methods (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=25d863c8930258c79101dc45a05271f392dfb4ff)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **collab-store:**
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:** added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)


<a name"0.7.5"></a>
### 0.7.5 (2015-04-02)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **build:**
  * fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
  * missing grunt-bump lib (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=489630d3f505c2e39327c74592e3471f208bf4aa)
* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **collab-store:**
  * team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **deps:** user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **dist:** angular-hbp-common.min.js (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=fa685a25703f4d425a2a05f013e24f575d2cbd43)
* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **error:**
  * feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)
  * handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)
* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)
* **modal:** handle various type of error format (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4e88d9a8a8ad385ead8ab3652d771b007aa2c7ae)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)
* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)
* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)
* **users:** backwards compatability of result vs results (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1dda2ecc6d5b6b86939dcc2652b5a41ad8b30b94)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **build:** enable jjb-platform JS build (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=5e6409107a5eb1649edbaf3206f99c584f31ad2d)
* **collab-store:**
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)
* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)
* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)
* **filters:**
  * Add hbpYesNo filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a9628e08231041e02f8c07ab7f094c9f8c4ead26)
  * Add hbpDollarToNewLine filter (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1251c26f9547f9e8bafc791e278df56663db6bf8)
* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)
* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)
* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)
* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)
* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)
* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)
* **user:** added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)
* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)
* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)


<a name="0.7.4"></a>
### 0.7.4 (2015-03-30)


#### Bug Fixes

* **query:** Add param to list in lieu of query (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e79dcdf5ff999ba20389692d773cbcb44071a87)


<a name="0.7.3"></a>
### 0.7.3 (2015-03-30)


#### Bug Fixes

* **refactor:** Refactor Django REST paging code (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6c519b443a848cb6ea016679d16cd791ed007a0b)


#### Features

* **collab-team:** Retrieve user role within a team (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=608266214e774380f9f3050761f5fec64991df3c)
* **pagination:** Add pagination (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=c2265c97692683a56cbe9f16858a9d7165b04002)


<a name="0.7.2"></a>
### 0.7.2 (2015-03-26)


#### Bug Fixes

* **url:** URL fix and gem install correctly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b98803451d153e08c35faa23d7e5956388534d9a)


#### Features

* **user-card:** add hbpUsercard directive (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8c60e583c06fcd798b20ed2063332bed2fafce3f)


<a name="0.7.1"></a>
### 0.7.1 (2015-03-24)


#### Bug Fixes

* **collab-store:** team now has a trailing slash (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0bec2a5ab6a727e37fbc9500d11b6fa0b9888d16)


<a name="0.7.0"></a>
## 0.7.0 (2015-03-24)


#### Bug Fixes

* **build:** fix karma port to not conflict with other dev servers (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=0e067c9793da51b0083320d5c567b668dc0dfbe1)
* **collab-store:**
  * team retrieve users from the hbp-directory service (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e14bec3213cd6a29c57cea2a050e3bd8b08f6594)
  * jshint error in tests fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=bcb6b88077c17369376e382c373bd4800bfad993)
  * use api.collab.v0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3d13e2123094959235b0b1c8e3ed0b9f041ce46b)
* **collab-stores:** temporary fix to work with backend (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=f00b0c1d28755a756c376026fc00aa1875858df7)
* **move:**
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=1c5d058b20ff4c684fcc1c957170a2a63321ac6c)
  * move stores to hbpCommon (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=154e87c6e11f0bc4222ec97b902653409216c342)


#### Features

* **collab-store:**
  * add collab/:id/team endpoint (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=3e8ce326a34d42f97d8df4f0dbeaf03900f32333)
  * promise is being rejected with an error (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=dbb56caf72fd6d58e14c5abd8a38c592eac4a8b3)
  * retrieve my collabs (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=24e41a6d8f0457053fc167a4cf9c4ccc51096955)


<a name="0.6.7"></a>
### 0.6.7 (2015-03-16)


#### Features

* **icon:** add hbp-size attribute (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b7d6b8eb38a8076cd89f9512f2faf0afe328f224)


<a name="0.6.6"></a>
### 0.6.6 (2015-03-11)


<a name="0.6.5"></a>
### 0.6.5 (2015-02-12)


#### Features

* **user:** added isAdmin function (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=220bef96b2332efe08a6964246e6b6a56dc92373)


<a name="0.6.4"></a>
### 0.6.4 (2015-02-03)


#### Bug Fixes

* **doc:** fixed broken hbpDialogFactory documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=496021bc7cdcd43c2c294b488069ca0057281e81)
* **hbpErrorService:** returns argument if already an HbpError instance (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6907f29645c911070df743bee72005e656b87987)


<a name="0.6.3"></a>
### 0.6.3 (2015-01-30)


<a name="0.6.2"></a>
### 0.6.2 (2015-01-23)


<a name="0.6.1"></a>
### 0.6.1 (2015-01-22)


<a name="0.6.0"></a>
## 0.6.0 (2015-01-21)


#### Bug Fixes

* **chore:** fixed font paths (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=143165a097bb49b91176a25eb82c41cf0ab4b2bc)
* **oidc:** use bbp-oidc-client@0.6.0 (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=58765fe3c32b3f1da8d4822b1a2db03e8f102807)


#### Features

* **upnav:** use up.config URL when present (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=4abf8c213d717f15bd2ebbbf220d58505904c25c)


<a name="0.5.2"></a>
### 0.5.2 (2015-01-16)


<a name="0.5.1"></a>
### 0.5.1 (2015-01-15)


#### Bug Fixes

* **icon-generator:**
  * more uniform with code from the up-navbar (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6768f79ea884874c85b44960b8bac0284ff4b542)
  * test imported and indentation fixed (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=e505cd62b1610215c1a9a1c5bdec59dcfd46cafb)


<a name="0.5.0"></a>
## 0.5.0 (2015-01-14)


#### Features

* **hbp-up-nav:** wrap the Unified Portal javascript menu (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d44c4fbf81f0d29c3e7e516ddd1b36c4be0a821e)


<a name="0.4.4"></a>
### 0.4.4 (2015-01-09)


#### Bug Fixes

* **bower:** Added assets to main key of bower.json (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=84ec3b82dd219c932a5e9d185374e92eed787f80)
* **userDirectoryService:** fix the cache management on user update (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d2107578eaad8a010d8b61dcb93b33d7cbb002db)


<a name="0.4.3"></a>
### 0.4.3 (2014-12-16)


#### Features

* **userdirectory:** Add hbpUserDirectory.update() (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=906d7a6d590afe180b0b0e0dfc4569d7ae45814b)


<a name="0.4.2"></a>
### 0.4.2 (2014-12-02)


<a name="0.4.1"></a>
### 0.4.1 (2014-12-02)


#### Features

* **dialog:** error alert dialog (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=6b80e6317bdd0d69c176c1a7207a215bfc71d3bb)


<a name="0.4.0"></a>
## 0.4.0 (2014-11-28)


#### Bug Fixes

* **deps:** user proper angular-bootstrap component (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=d3b71d7d65fbe3b06f07ffa0195e6babffc5126b)
* **styles:** fixed padding on .hbp-navbar .dropdown-header (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01896258f9adebabd8013c83ae078b08a6b88f0c)


<a name="0.3.6"></a>
### 0.3.6 (2014-11-18)


<a name="0.3.5"></a>
### 0.3.5 (2014-11-18)


#### Bug Fixes

* **error:** feedback when an error occurred on entity creation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=a7cc1845c1666efa4371e37f3d3c4bd8d64b579e)


<a name="0.3.4"></a>
### 0.3.4 (2014-11-14)


#### Features

* **docs:**
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=01fdf7531ad432d7e1be10b3f1b324379000a5c2)
  * generate angular documentation (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b92ecb49c26b492cedc805a3bb1526cd4dfc18f2)


<a name="0.3.3"></a>
### 0.3.3 (2014-11-14)


#### Features

* **mimetype:** image Bundle mimetype has a short name (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=8103058156f020a6739c2436e3883439e73dbc36)
* **styles:** h3 to h6 use sans-serif fonts (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=08a0bf4dade1d862a1812248f9573a14cfc4e209)


<a name="0.3.2"></a>
### 0.3.2 (2014-11-03)


#### Features

* **hbpErrorService:** parse error and output HbpError (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=432a1707d7ce02a957ad7119859124c3eee564c9)


<a name="0.3.1"></a>
### 0.3.1 (2014-10-28)


#### Bug Fixes

* **error:** handle http error properly (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=aa88aab80ad9bac0ed246c19a466a1d5d14aa2d4)
* **toolbar:** align label properly with content (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b1c30008e95d17d7c44c3f155e1ef64e0dd21257)
* **website-selector:** css broken (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=b0cf4e0f8b3002298463cf9f70fe95098af26e01)


#### Features

* **toolbar:** .hbp-toolbar-expand decorator (https://bbpteam.epfl.ch/reps/gerrit/platform/JSLibAngularHbpCommon.git/commit/?id=2e13d8da9dc1a3ee8f940491a9248522919d6cf3)


<a name="0.3.0"></a>
## 0.3.0

#### Features

* **navbar:** Use a simpler layout for the common navbar, the site navigator has bee
  removed and placed in a more general `user navigation`.

#### Bug Fixes

* **navbar:** Remove styles about logo in header site navigation.


<a name="0.2.2"></a>
## 0.2.2

#### Bug Fixes

* **fonts:** Fixed font for buttons in headers

<a name="0.2.1"></a>
## 0.2.1

#### Features

* **hbpDialogFactory:** Added hbpDialogFactory.confirm(options) and deprecated hbpDialogFactory.confirmation()

<a name="0.2.0"></a>
## 0.2.0


#### Features

* **components:** Use Bootstrap SASS 3.2.x which has a new directory structure.
