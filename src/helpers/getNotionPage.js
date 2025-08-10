export const getNotionPage = async (pageId) => {
    const response = await fetch(`/api/${pageId}`)
    return response.json();
}