export const convertNotionUrl = (url: string, publicDomain: string) => {
  try{
    const parsed = new URL(url);
    return `https://${publicDomain}${parsed.pathname}`;
  }catch{
    return url;
  }
}
