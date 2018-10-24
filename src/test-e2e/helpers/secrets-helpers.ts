import { browser } from 'protractor';
import { E2EConfig, E2EConfigCloudFoundry, E2ECred, E2EEndpointTypeConfig, E2EEndpointsConfig } from '../e2e.types';
import { ConsoleUserType } from './e2e-helpers';

const DEFAULT_CF_NAME = 'cf';

const ENDPOINT_TYPE_TO_LABEL = {
  'cf': 'Cloud Foundry'
};

export class SecretsHelpers {

  secrets = browser.params as E2EConfig;

  constructor() { }

  haveMultipleCloudFoundryEndpoints = () => {
    return Object.keys(this.getCloudFoundryEndpoints()).length > 1;
  }

  haveSingleCloudFoundryEndpoint = () => {
    return !this.haveMultipleCloudFoundryEndpoints();
  }

  getConsoleAdminUsername(): string {
    return this.secrets.consoleUsers.admin.username;
  }

  getConsoleAdminPassword(): string {
    return this.secrets.consoleUsers.admin.password;
  }

  getConsoleNonAdminUsername(): string {
    return this.secrets.consoleUsers.nonAdmin.username;
  }

  getConsoleNonAdminPassword(): string {
    return this.secrets.consoleUsers.nonAdmin.password;
  }

  getCloudFoundryEndpoints(): any {
    return this.secrets.endpoints.cf;
  }

  getStratosGitHubApiUrl(): string {
    return this.secrets.stratosGitHubApiUrl;
  }

  getConsoleCredentials(userType: ConsoleUserType): E2ECred {
    const isAdmin = userType === ConsoleUserType.admin;
    return isAdmin ? this.secrets.consoleUsers.admin : this.secrets.consoleUsers.nonAdmin;
  }

  getEndpoints(): E2EEndpointsConfig {
    return this.secrets.endpoints || {};
  }

  // Get the configuration for the default CF Endpoint
  getDefaultCFEndpoint(): E2EConfigCloudFoundry {
    if (this.secrets.endpoints.cf) {
      return this.secrets.endpoints.cf.find((ep) => ep.name === DEFAULT_CF_NAME);
    }
    return null;
  }

  getEndpointByName(name: string): E2EEndpointTypeConfig {
    let endpoint = null;
    Object.keys(this.secrets.endpoints).forEach(type => {
      const endpointsForType = this.secrets.endpoints[type];
      const found = endpointsForType.find(ep => ep.name === name);
      if (found) {
        endpoint = {
          ...found,
          type: type,
          typeLabel: ENDPOINT_TYPE_TO_LABEL[type]
        };
      }
    });
    return endpoint;
  }

}
