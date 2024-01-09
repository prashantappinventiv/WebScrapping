export const CONSTANT = {
  API_ROOT_PATH: 'api/v1',
  LOGGER_NAME: 'LOGGER',
};

export const ERROR_MESSAGE = {
  FAILED: 'Failed to scrape data.',
  INVALID_URL: 'Invalid URL provided. Please check the URL and try again.',
  INVALID_DATA:
    'Invalid HTML tag and attribute provided. Please provide a valid HTML tag and attribute.',
};

export const Swagger = {
  Title: 'WebScraping Application',
  Description: 'WebScraping Api',
  Version: '1.0',
  AddApiKey: {
    Type: 'apiKey',
  },
  Path: 'swagger',
};
