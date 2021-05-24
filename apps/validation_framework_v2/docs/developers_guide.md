# EBRAINS Model Catalog app: Guide for Developers and Maintainers

The [Model Catalog app](https://model-catalog.brainsimulation.eu) is a web-browser-based graphical user interface for the EBRAINS Model Validation Framework.

This document is intended for developers and maintainers of the app.

The app [source code](https://github.com/HumanBrainProject/hbp-validation-framework/) is available on Github.
The repository also contains the source code for the Model Validation Service API, and for the Curation Dashboard app.
In what follows, the "root directory of the app" means the directory `apps/validation-framework-v2` within the Github project.

## Architecture

The app is based on [Create React App](https://create-react-app.dev), using [Material-UI](https://material-ui.com) for layout and styling.

It is a single-page app, using modal dialogs to display different views. The app may be embedded in the [EBRAINS Collaboratory](https://wiki.ebrains.eu) as a "community app", in which case it communicates with the Collaboratory to store per-user settings.

Authentication / authorization uses EBRAINS IAM. Access to private models is based on collab membership.

## Setting up a development environment

If you haven't already forked the [Github project](https://github.com/HumanBrainProject/hbp-validation-framework/), then do so and `git clone` your fork.

In the root directory of the app run

```
$ npm install
```

To run the app in development mode

```
$ npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running tests

### Unit and integration tests

[TODO]

### System and end-to-end tests

In the root directory of the app run

```
$ npx cypress open
```

and then click on "Run <nn> integration tests".

## Continuous integration / Continuous delivery

For CI/CD we use the [EBRAINS Gitlab server](https://gitlab.ebrains.eu).
Certain branches of the Github repository are [mirrored](https://gitlab.ebrains.eu/model-validation/hbp-validation-framework/) (manual mirror using `git push`, there is not automatic synchronisation)

The config file is `.gitlab-ci.yml` in the top-level folder of the Git repository. On each commit to the "development" branch, all tests are run, then the Docker image for the development server is built and pushed to the [EBRAINS image registry](https://docker-registry.ebrains.eu/).

## Code style

We use [Prettier](https://prettier.io) to maintain uniform code formatting. This integrates with most editors. You can also run the formatter manually, using

```
npx prettier --write --tab-width 4 .
```

## Making a release

[TODO]

## Deployment

The app is deployed using nginx running in a Docker container. To build a Docker image for the development version:

```
$ docker build -f deployment/Dockerfile.dev -t docker-registry.ebrains.eu/model-catalog/model-catalog-v2:dev .
```

(you could replace the Docker tag "dev" with the Git branch name). Note that this build is run automatically by the GitLab CI pipeline (see above).

To build a Docker image for the production version:

```
$ docker build -f deployment/Dockerfile.prod -t docker-registry.ebrains.eu/model-catalog/model-catalog-v2:latest .
```

To push an image to the EBRAINS image registry, first ensure you are logged in (see the [docker-registry collab](https://wiki.ebrains.eu/bin/view/Collabs/kubernetes/docker-registry/) for instructions). Then run:

```
docker push docker-registry.ebrains.eu/model-catalog/model-catalog-v2:latest
```

On the VM where you wish to deploy the app, run

```
sudo docker pull docker-registry.ebrains.eu/model-catalog/model-catalog-v2:latest
```

(replace "latest" with "dev", or another tag as appropriate).

then

```
sudo docker run -d -v /etc/letsencrypt:/etc/letsencrypt -p 443:443 --name model-catalog-app docker-registry.ebrains.eu/model-catalog/model-catalog-v2:latest
```

TODO: document how to set up the VM, and how to install the letsencrypt certificate.

## Contributing / development workflow

To submit a bug reports or request for enhancements, please use the [issue tracker](https://github.com/HumanBrainProject/hbp-validation-framework/issues).
Before creating a new issue, please first check that there is no existing issue on the same topic.
Please give as much information as possible, including screenshots, error messages, etc.

The development workflow is based on pull requests. If you wish to contribute, please:

-   fork the repository
-   base your changes off the most recent development branch
-   use a branch with a meaningful name (no pull requests from branches named "master" or "development")
-   open a pull request, explaining which issue the PR addresses

As noted above, please use [Prettier](https://prettier.io) to format your code.
Since the app already has several heavy dependencies, please try to minimise use of additional third-party libraries.

## Code of Conduct

In the interest of fostering an open and welcoming environment, we expect all developers, maintainers and other contributors to abide by the project [Code of Conduct](https://github.com/HumanBrainProject/hbp-validation-framework/blob/master/CODE_OF_CONDUCT.md), which you can find in the file `CODE_OF_CONDUCT.md` at the top level of the Git repository.
