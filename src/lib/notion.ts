
import { Client } from '@notionhq/client';
import type { PageObjectResponse, PartialPageObjectResponse, GetPageResponse } from "@notionhq/client/build/src/api-endpoints";


if (!process.env.NOTION_API_KEY) {
  console.error('ERROR: NOTION_API_KEY environment variable is not set.');
  // throw new Error('NOTION_API_KEY environment variable is not set.');
}
if (!process.env.NOTION_USERS_DATABASE_ID) {
  console.error('ERROR: NOTION_USERS_DATABASE_ID environment variable is not set.');
  // throw new Error('NOTION_USERS_DATABASE_ID environment variable is not set.');
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const usersDatabaseId = process.env.NOTION_USERS_DATABASE_ID!;

export interface NotionUser {
  id: string; // Notion Page ID
  name: string | null;
  email: string | null;
  googleId?: string | null; // Kept for schema compatibility, but won't be primary lookup
  avatarUrl?: string | null;
}

function pageToNotionUser(page: PageObjectResponse | PartialPageObjectResponse): NotionUser | null {
  if (!('properties' in page)) {
    return null; 
  }
  const properties = page.properties;

  const nameProp = properties.Name;
  const emailProp = properties.Email;
  const avatarUrlProp = properties.AvatarURL;
  const googleIdProp = properties.GoogleID; // Still try to read it if it exists

  return {
    id: page.id,
    name: (nameProp?.type === 'title' && nameProp.title[0]?.plain_text) || null,
    email: (emailProp?.type === 'email' && emailProp.email) || null,
    avatarUrl: (avatarUrlProp?.type === 'url' && avatarUrlProp.url) || null,
    googleId: (googleIdProp?.type === 'rich_text' && googleIdProp.rich_text[0]?.plain_text) || null,
  };
}

export async function findUserById(pageId: string): Promise<NotionUser | null> {
  if (!notion) {
     console.error("Notion client is not initialized.");
     return null;
  }
  try {
    const response: GetPageResponse = await notion.pages.retrieve({ page_id: pageId });
    if (response && !("archived" in response && response.archived)) { // Check if page is not archived
        return pageToNotionUser(response as PageObjectResponse);
    }
    return null;
  } catch (error) {
    console.error(`Error finding user by Page ID (${pageId}) in Notion:`, error);
    // Notion API throws error if page ID doesn't exist or is malformed
    return null;
  }
}

// Function to query users database - useful for creating a list if needed later
export async function getAllUsers(): Promise<NotionUser[]> {
  if (!usersDatabaseId || !notion) {
    console.error("Notion client or Users Database ID is not initialized.");
    return [];
  }
  try {
    const response = await notion.databases.query({
      database_id: usersDatabaseId,
    });
    return response.results.map(page => pageToNotionUser(page as PageObjectResponse)).filter(user => user !== null) as NotionUser[];
  } catch (error) {
    console.error('Error fetching all users from Notion:', error);
    return [];
  }
}
