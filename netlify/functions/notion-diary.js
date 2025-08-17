// netlify/functions/notion-diary.js
export async function handler(event, context) {
  const NOTION_SECRET = process.env.NOTION_SECRET;
  const DATABASE_ID = process.env.DATABASE_ID;

  const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${NOTION_SECRET}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sorts: [{ property: "Date", direction: "descending" }],
      page_size: 3
    })
  });

  const data = await response.json();
  console.log(data)
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
