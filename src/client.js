// src/client.js

import { createClient } from '@sanity/client';

export default createClient({
  projectId: 'c9i21t9u', // You need to replace this
  dataset: 'production',
  useCdn: false, // set to `false` for fresh data
  apiVersion: '2021-10-21', // use today's date in YYYY-MM-DD format
});

