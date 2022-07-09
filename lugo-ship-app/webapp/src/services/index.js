import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { Auth } from 'aws-amplify';
import * as mock from './mockData';

let client;

const SERVICES_HOST = window.appConfig.apiEndpoint;

const getAuthHeader = (session) => `Bearer ${session.getAccessToken().getJwtToken()}`;
// Handle token refreshing
const createAPIClient = async () => {
  console.log('Creating API Client');
  const session = await Auth.currentSession();
  client = axios.create({
    headers: {
      common: {
        Authorization: getAuthHeader(session),
      },
    },
  });
  createAuthRefreshInterceptor(client, async (request) => {
    // Recreate client and update for future requests
    await createAPIClient();
    const newSession = await Auth.currentSession();
    // Update the Auth header for current request
    request.response.config.headers.Authorization = getAuthHeader(newSession);
  });
};

/* eslint-disable no-console */

// Documents ---------------------------------------------------------

export const getAllDocuments = async () => {
  console.log('[MOCK] Get all documents');
  return mock.mockCall(mock.allDocuments, 1000);
};

export const getDocument = async (id) => {
  const document = mock.documents.find((d) => d.PK === id);
  console.log(`[MOCK] Get Document: ${id}`);
  return mock.mockCall(document, 1000);
};

export const deleteDocument = async (id) => {
  console.log(`[MOCK] Delete document: ${id}`);
  return mock.mockCall({}, 1000);
};

export const uploadDocument = async (name, tags, file) => {
  console.log(`[MOCK] Upload document: ${name} ${tags} File: ${file.fileName}`);
  return mock.mockCall({}, 2000);
};

// Users

let userProfileData;

export const getAllUsers = async () => {
  if (!client) {
    await createAPIClient();
  }
  const results = await client.get(`${SERVICES_HOST}/users/`);
  console.log(`Results: ${JSON.stringify(results)}`);
  return results.data.users;
};

export const createNewUser = async (email, name, group) => {
  if (!client) {
    await createAPIClient();
  }
  const body = { email, name, group };
  console.log(`Body: ${JSON.stringify(body)}`);
  const results = await client.post(`${SERVICES_HOST}/users/`, body);
  console.log(`Results: ${JSON.stringify(results)}`);
};

export const deleteUser = async (id) => {
  if (!client) {
    await createAPIClient();
  }
  await client.delete(`${SERVICES_HOST}/users/${id}`);
};

export const getAllUserProfiles = async () => {
  if (!client) {
    await createAPIClient();
  }
  const results = await client.get(`${SERVICES_HOST}/users/profiles`);
  console.log(`Results: ${JSON.stringify(results)}`);
  return results.data.users;
};

export const getProfileData = async (userId, forceRefresh = false) => {
  if (!userProfileData || forceRefresh) {
    userProfileData = await getAllUserProfiles();
    console.log(`User Profile Data: ${JSON.stringify(userProfileData)}`);
  }
  const user = userProfileData.find((u) => u.userId === userId);
  return user;
};

export const getCurrentUserProfile = async () => {
  if (!client) {
    await createAPIClient();
  }
  const results = await client.get(`${SERVICES_HOST}/users/profile`);
  console.log(`Results: ${JSON.stringify(results)}`);
  return results.data.user;
};

export const updateCurrentUserProfile = async (name, shouldDeletePicture, picture) => {
  if (!client) {
    await createAPIClient();
  }
  const formData = new FormData();
  if (name) {
    formData.append('name', name);
  }
  if (shouldDeletePicture) {
    formData.append('deletePicture', true);
  }
  if (picture) {
    formData.append('picture', picture);
  }
  const results = await client.patch(`${SERVICES_HOST}/users/profile`, formData);
  console.log(`Results: ${JSON.stringify(results)}`);
  return results.data.user;
};

// Comments --------------------------------------------------------------

export const createComment = async (id, content) => {
  if (!client) {
    await createAPIClient();
  }
  const body = {
    PK: 'TEST',
    SK: 'TEST0616',
    Comment: content,
  };
  const result = await client.post(`${SERVICES_HOST}/test/${id}`, body);
  console.log(`Result: ${JSON.stringify(result)}`);
};

export const getCommentsForDocument = async (id) => {
  console.log(`[MOCK] Get comments for document ${id}`);
  return mock.mockCall(mock.getCommentsForDocument(id), 1000);
};

export const reportCommentForModeration = async (id) => {
  console.log(`[MOCK] Report comment for moderation ${id}`);
  return mock.mockCall({}, 1000);
};

/* eslint-enable no-console */
