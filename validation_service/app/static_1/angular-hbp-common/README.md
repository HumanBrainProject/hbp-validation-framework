Angular HBP Common contains common web materials to support creation of
new websites.

# Structure

```
- src/
  - assets/            // contains static assets sources
  - scripts/           // AngularJS services,  directives and controllers
  - styles/            // Sass styles
- bower_components/    // Bower components
- dist/                // Distributed code
```

## What's in /dist/ folder

`angular-hbp-common.js` and `angular-hbp-common.min.js`: a set of common angular scripts grouped in the hbpCommon module

# Migrate from 1.x

Here are the necessary refactoring.

## Renaming:

- `hbpUserDirectory` is now called `hbpIdentityUserDirectory`. It is loaded by
  `hbpCommon` module but is also available in the module `hbpIdentity`
- `hbpGroupStore` is now called `hbpIdentityGroupStore`. It is loaded by
  `hbpCommon` module but is also available in the module `hbpIdentity`

## Removed:

- `hbpGroupStore.getMemebers` alias to `getMembers` has been removed
- `hbpUtil.getList` and `hbpUtil.buildListResponse` has been removed, hbpUtil.paginatedResultSet is a replacement
- `hbpExpandableList` service has been removed, hbpUtil.paginatedResultSet is a replacement

## Method signature changes:

Uniform management of the paginated results. Methods that were retrieving lists, and potentially paginated ones now all retrieve `hbpUtil.ResultSet` instances. This include the following methods:
- `hbpIdentityUserDirectory.list`
- `hbpIdentityGroupStore.(addMembers|removeMembers|list)`

`hbpCollabStore.(list|mine)` methods are now accepting a single options parameter. `list` was previously
requiring an optional url parameter as first argument, but it is useless. Accepted options are `search`, `id` and `page_size`. Moreover, `url` and `params` are still accepted as legacy parameter. `mine` is
now accepting an `options` parameter wich can contains a `search` key.

# Development

Clone the git repository:

```bash
git clone ssh://bbpcode.epfl.ch/platform/JSLibAngularHbpCommon
```

Start the development server using

```bash
grunt serve
```

Start sever against the compressed assets using

```bash
grunt serve:dist
```

Build using grunt

```bash
grunt dist
```

The code is run automatically by the watch task from the devel server. To
trigger test manually, run:

```
grunt test
```

# Roadmap to 2.1

The version 2.0.0 is the unstable API that will lead toward the 2.x version. You should be prepared to API changes from one patch version to the next one for version between 2.0.0 and 2.1.0 (not included)

- [ ] uniformize the paginated result list
- [ ] break into multiple modules
- [ ] extract any UI components in specific repositories
- [ ] proper, clean documentation using jsDoc
- [ ] integrate documentation into sphinx Collaboratory documentation
- [ ] suppress method duplication
- [ ] suppress unused methods
- [ ] remove dependency to marked

## Release

Note: It should be done through Jenking by launching a build with 'release' param set to patch/minor/major.

Steps:
- manually update the version in:
  - bower.json
  - package.json
  - src/angular-hbp-common.js

- commit the 3 files and submit review
```bash
grunt gitcommit:bump
git review
```
- build project
```bash
grunt dist
```
- commit result, create version tag and push it to remote
```bash
grunt gitcommit:dist gittag:dist gitpush:dist
```
- make sure the last commit is not pushed to master:
```bash
git reset HEAD~1
```

to check that the version is available in bower repository:
```bash
bower info angular-hbp-common#<version>
```
