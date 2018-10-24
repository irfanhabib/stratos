# Deploying as a Cloud Foundry Application

## Deployment Steps

The quickest way to install Stratos is to deploy it as a Cloud Foundry application. To do so, clone the `stratos` repository, cd into the newly cloned repository and push to Cloud Foundry. This can be done with:

```
git clone https://github.com/cloudfoundry-incubator/stratos
cd stratos
git checkout tags/stable -b stable
./build/store-git-metadata.sh
cf push
```

>**NOTE** The console will pre-configure the host Cloud Foundry endpoint. No other CF instance can be registered unless the instructions in the section 'Enable Endpoints Dashboard to register additional Cloud Foundry endpoints' are followed.
 All other deployment methods (helm, docker-compose, docker all-in-one, etc) allow the registration of multiple CF instances by default.

You will then be able to open a web browser and navigate to the console URL:

`https://console.<DOMAIN>`

Where `<DOMAIN>` is the default domain configured for your Cloud Foundry cluster.

To login use the following credentials detailed [here](../../docs/access.md).

If you run into issues, please refer to the [Troubleshooting Guide](#troubleshooting) below.

Note:

1. You need the cf CLI command line tool installed and available on the path.
2. You need to have configured the cf cli to point to your Cloud Foundry cluster, to be authenticated with your credentials and to be targeted at the organization and space where you want the console application be created.
3. You may need to configure Application Security Groups on your Cloud Foundry Cluster in order that  Stratos can communicate with the Cloud Foundry API. See [below](#application-security-groups) for more information.
4. The Stratos Console will automatically detect the API endpoint for your Cloud Foundry. To do so, it relies on the `cf_api_url` value inside the `VCAP_APPLICATION` environment variable. If this is not provided by your Cloud Foundry platform, then you must manually update the application manifest as described [below](#console-fails-to-start).

### Pre-building the UI

Due to the memory usage of the Angular compiler (see below), when deployed to Cloud Foundry via `cf push`, Stratos does not use AOT (Ahead-of-Time) complilation.

If you wish to enable AOT or reduce the push time, you can pre-build the UI before pushing.

This can be done with:

```
git clone https://github.com/cloudfoundry-incubator/stratos
cd stratos
npm install
npm run prebuild-ui
cf push
```

You will need a recent version of Node installed locally to do this.

The `prebuild-ui` npm script performs a build of the front-end UI and then zips up the resulting folder into a package named `stratos-frontend-prebuild.zip`. The Stratos buildpack will unpack this zip file and use its contents instead of building the UI during staging, when this file is present.


### Memory Usage

The Stratos Cloud Foundry `manifest.yml` states that the application requires
`1512MB` of memory. This is required during the build process of the
application since building an angular2 app is a memory intensive process. The
memory limit can be scaled down after the app has been pushed, using the cf CLI.

## Associate Cloud Foundry database service
Follow instructions [here](db-migration/README.md).

## Use SSO Login

By default Stratos will present its own login UI and only supports username and password authentication with your UAA. You can configure Stratos to use UAA's login UI by specifying the  the `SSO_LOGIN` environment variable in the manifest, for example:

```
applications:
- name: console
  ... memory, disk settings here
  env:
    SSO_LOGIN: true
```

When SSO Login is enabled, Stratos will also auto-connect to the Cloud Foundry it is deployed in using the token obtained during the SSO Login flow.

For more information - see [Single-Sign On](../../docs/sso.md).

## Troubleshooting

### Creating logs for recent deployments
To create a log file of the push
```
cf push | tee cfpush.log
```

To create a log file of recent console output
```
cf logs console --recent | tee cfconsole.log
```
>**NOTE** If the name of the application has been changed from `console` in the manifest file please also change the name in the logs statement

### Application Security Groups

If you have problems when deploying Stratos UI as a Cloud Foundry application, check that the Application Security Group you have will allow Stratos to communicate with the Cloud Foundry API.

For information on the default ASGs, see [here](https://docs.cloudfoundry.org/concepts/asg.html#default-asg).

To configure a new ASG for the organization and space that are using Stratos, first create a new ASG definition, for example:

```
[
   {
      "destination":"0.0.0.0-255.255.255.255",
      "protocol":"all"
   }
]
```

Save this to a file, e.g. `my-asg.json`.

> Note: this allows example all network traffic on all IP ranges - we don't recommend using this.

Unbind the existing ASG for you organization (`ORG`) and space (`SPACE`) with:

```
cf unbind-security-group public_networks ORG SPACE
```

Create a new ASG using the definition you saved to a file and give it a name, with:

```
cf create-security-group NAME my-asg.json
```

Bind this ASG to your `ORG` and `SPACE` with:

```
cf bind-security-group NAME ORG SPACE
```

### Console fails to start

The Stratos Console will automatically detect the API endpoint for your Cloud Foundry. To do so, it relies on the `cf_api` value inside the `VCAP_APPLICATION` environment variable.
To check if the variable is present, use the CF CLI to list environment variables, and inspect the `VCAP_APPLICATION` variable under `System-Provided`.

```
$ cf env console
Getting env variables for app console in org SUSE / space dev as admin...
OK

System-Provided:


 {
  "VCAP_APPLICATION": {
   "application_id": ...,
   "application_name": "console",
   "application_uris": ...
   "application_version": ...,
   "cf_api": "http://api.cf-dev.io",
   ...
 }

 No user-defined env variables have been set
 ...
```

If the `cf_api` environment variable is absent then set the `CF_API_URL` variable. See the following _Setting the `CF_API_URL` env variable in the manifest_ section.


However, if the `cf_api` environment variable is present, and an HTTP address is specified, it is possible that insecure traffic may be blocked. See the following _Setting the `CF_API_FORCE_SECURE` env variable in the manifest_ section.


#### Setting the `CF_API_URL` env variable in the manifest

To specify the Cloud Foundry API endpoint, add the `CF_API_URL` variable to the manifest, for example:

```
applications:
- name: console
  memory: 256M
  disk_quota: 256M
  host: console
  timeout: 180
  buildpack: https://github.com/cloudfoundry-incubator/stratos-buildpack
  health-check-type: port
  env:
    CF_API_URL: https://<<CLOUD FOUNDRY API ENDPOINT>>>
```

#### Setting the `CF_API_FORCE_SECURE` env variable in the manifest

To force the console to use secured communication with the Cloud Foundry API endpoint (HTTPS rather than HTTP), specify the `CF_API_FORCE_SECURE` environment in the manifest, for example:

```
applications:
- name: console
  memory: 256M
  disk_quota: 256M
  host: console
  timeout: 180
  buildpack: https://github.com/cloudfoundry-incubator/stratos-buildpack
  health-check-type: port
  env:
    CF_API_FORCE_SECURE: true
```

