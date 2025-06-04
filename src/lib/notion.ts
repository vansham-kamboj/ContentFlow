
import { Client } from '@notionhq/client';
import type { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";


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
  googleId: string | null;
  avatarUrl?: string | null;
}

function pageToNotionUser(page: PageObjectResponse | PartialPageObjectResponse): NotionUser | null {
  if (!('properties' in page)) {
    return null; // PartialPageObjectResponse without properties
  }
  const properties = page.properties;

  const nameProp = properties.Name;
  const emailProp = properties.Email;
  const googleIdProp = properties.GoogleID;
  const avatarUrlProp = properties.AvatarURL; // Assuming you add this property

  return {
    id: page.id,
    name: (nameProp?.type === 'title' && nameProp.title[0]?.plain_text) || null,
    email: (emailProp?.type === 'email' && emailProp.email) || null,
    googleId: (googleIdProp?.type === 'rich_text' && googleIdProp.rich_text[0]?.plain_text) || null,
    avatarUrl: (avatarUrlProp?.type === 'url' && avatarUrlProp.url) || null,
  };
}


export async function findUserByGoogleId(googleId: string): Promise<NotionUser | null> {
  if (!usersDatabaseId || !notion) {
     console.error("Notion client or Users Database ID is not initialized.");
     return null;
  }
  try {
    const response = await notion.databases.query({
      database_id: usersDatabaseId,
      filter: {
        property: 'GoogleID',
        rich_text: {
          equals: googleId,
        },
      },
    });

    if (response.results.length > 0) {
      const page = response.results[0] as PageObjectResponse; // Assume full page response
      return pageToNotionUser(page);
    }
    return null;
  } catch (error) {
    console.error('Error finding user by Google ID in Notion:', error);
    return null;
  }
}

export async function createUserInNotion(userData: {
  name: string;
  email: string;
  googleId: string;
  avatarUrl?: string;
}): Promise<NotionUser | null> {
   if (!usersDatabaseId || !notion) {
     console.error("Notion client or Users Database ID is not initialized.");
     return null;
  }
  try {
    const response = await notion.pages.create({
      parent: { database_id: usersDatabaseId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: userData.name,
              },
            },
          ],
        },
        Email: {
          email: userData.email,
        },
        GoogleID: {
          rich_text: [
            {
              text: {
                content: userData.googleId,
              },
            },
          ],
        },
        ...(userData.avatarUrl && { AvatarURL: { url: userData.avatarUrl } }),
      },
    });
    return pageToNotionUser(response as PageObjectResponse);
  } catch (error) {
    console.error('Error creating user in Notion:', error);
    return null;
  }
}
