// Aktualizuje <title> a meta značky v <head> pri každej zmene stránky (SPA).
// Vyhľadávače a zdieľanie na sociálnych sieťach tak dostanú popis konkrétnej stránky / článku.

function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function setPageMeta({ title, description, noindex = false }: { title: string; description: string; noindex?: boolean }): void {
  document.title = title;
  setMeta('name', 'description', description);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', window.location.href);
  setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
}
