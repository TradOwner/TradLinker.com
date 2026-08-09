#!/usr/bin/env python3
"""Dependency-free static site generator for TradLinker GitHub Pages."""
from __future__ import annotations

import html
import json
import re
import shutil
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
OUT = ROOT / "_site"
BASE_URL = "https://tradlinker.com"

PRODUCTS = {
    "tradlinker": {
        "name": "TradLinker",
        "description": "Discord translation bot for linked multilingual channels.",
        "install": "https://discord.com/oauth2/authorize?client_id=1323028790770798673&scope=bot",
        "image": "/image/Avatar%20Linker%20rond.webp",
    },
    "tradassist": {
        "name": "TradAssist",
        "description": "Discord translation assistant for on-demand translation.",
        "install": "https://discord.com/oauth2/authorize?client_id=1419765128597078218",
        "image": "/image/Avatar%20Assistant%20rond.webp",
    },
    "tradcoord": {
        "name": "TradCoord",
        "description": "Discord onboarding, coordination, and automatic role management bot.",
        "install": "https://discord.com/oauth2/authorize?client_id=1326539242590961746&permissions=8&integration_type=0&scope=bot+applications.commands",
        "image": "/image/Avatar%20Orga%20rond.webp",
    },
}

PAGE_SLUGS = {
    "home": "",
    "tradlinker": "tradlinker",
    "tradassist": "tradassist",
    "tradcoord": "tradcoord",
    "privacy-policy": "privacy-policy",
    "terms-of-service": "terms-of-service",
}


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def page_url(lang: str, page: str) -> str:
    slug = PAGE_SLUGS[page]
    return f"{BASE_URL}/{lang}/" + (f"{slug}/" if slug else "")


def rel_page_url(lang: str, page: str) -> str:
    slug = PAGE_SLUGS[page]
    return f"/{lang}/" + (f"{slug}/" if slug else "")


def published_for_page(languages: list[dict], page: str) -> list[dict]:
    if page in {"privacy-policy", "terms-of-service"}:
        return [x for x in languages if x.get("published") and x.get("legalPublished", x.get("published"))]
    return [x for x in languages if x.get("published")]


def alternate_links(languages: list[dict], page: str) -> str:
    items = []
    for lang in published_for_page(languages, page):
        items.append(
            f'<link rel="alternate" hreflang="{html.escape(lang["hreflang"])}" href="{page_url(lang["code"], page)}">'
        )
    items.append(f'<link rel="alternate" hreflang="x-default" href="{page_url("en", page)}">')
    return "\n  ".join(items)


def language_menu(languages: list[dict], current: dict, page: str, label: str) -> str:
    available = published_for_page(languages, page)
    items = []
    for lang in available:
        url = rel_page_url(lang["code"], page)
        item = (
            f'<span class="lang-option is-current" aria-current="true">'
            if lang["code"] == current["code"]
            else f'<a class="lang-option" href="{html.escape(url)}">'
        )
        closing = '</span>' if lang["code"] == current["code"] else '</a>'
        items.append(
            item
            + f'<span class="lang-flag" aria-hidden="true">{html.escape(lang.get("flag", "🌐"))}</span>'
            + f'<span class="lang-option-label">{html.escape(lang["nativeName"])}</span>'
            + closing
        )
    return (
        '<div class="nav-lang">'
        '<details class="lang-dropdown">'
        f'<summary class="lang-current" aria-label="{html.escape(label, quote=True)}">'
        f'<span class="lang-flag" aria-hidden="true">{html.escape(current.get("flag", "🌐"))}</span>'
        f'<span class="lang-current-label">{html.escape(current["nativeName"])}</span>'
        '</summary>'
        f'<div class="lang-dropdown-panel" role="list" aria-label="{html.escape(label, quote=True)}">'
        + ''.join(items)
        + '</div></details></div>'
    )


def nav_html(lang: dict, page: str, data: dict, languages: list[dict]) -> str:
    code = lang["code"]
    home = f"/{code}/"
    if page == "home":
        overview, plans, faq, add = "#presentation", "#offres", "#faq", "#tester"
    else:
        overview, plans, faq, add = home + "#presentation", home + "#offres", home + "#faq", home + "#tester"

    active = lambda name: ' class="is-active" aria-current="page"' if page == name else ""
    return f'''<nav class="nav" id="siteNav" aria-label="Main navigation">
<a href="{overview}">{html.escape(data['nav']['overview'])}</a>
<a href="/{code}/tradlinker/"{active('tradlinker')}>TradLinker</a>
<a href="/{code}/tradcoord/"{active('tradcoord')}>TradCoord</a>
<a href="/{code}/tradassist/"{active('tradassist')}>TradAssist</a>
<a href="{plans}">{html.escape(data['nav']['plans'])}</a>
<a href="{faq}">{html.escape(data['nav']['faq'])}</a>
<a class="btn btn-ghost btn-sm" href="{add}">{html.escape(data['nav']['add'])}</a>
<a class="btn btn-ghost btn-ghost-support btn-sm" href="https://discord.gg/9tu2DhRFXv" rel="noopener noreferrer" target="_blank">{html.escape(data['nav']['support'])}</a>
{language_menu(languages, lang, page, data['chooseLanguage'])}
</nav>'''


def footer_html(lang: str, data: dict, languages: list[dict]) -> str:
    f = data["footer"]
    legal_lang = lang if any(x["code"] == lang and x.get("legalPublished", x.get("published")) for x in languages) else "en"
    return f'''<footer class="site-footer">
<div class="container footer-grid">
<div>
<div class="brand footer-brand">
<img alt="TradLinker" decoding="async" height="256" width="256" loading="lazy" src="/image/Avatar%20Linker%20rond.webp">
<span><strong>TradLinker Suite</strong><small>{html.escape(f['brandSubtitle'])}</small></span>
</div>
<p class="footer-text">{html.escape(f['description'])}</p>
</div>
<div>
<h4>{html.escape(f['linksTitle'])}</h4>
<ul class="footer-links">
<li><a href="https://discord.gg/9tu2DhRFXv" rel="noopener noreferrer" target="_blank">{html.escape(f['discordSupport'])}</a></li>
<li><a href="https://donate.stripe.com/7sIeXJaO748k2t2fZ0" rel="noopener noreferrer" target="_blank">{html.escape(f['donate'])}</a></li>
</ul>
<div aria-label="TradLinker community links" class="social-row">
<a aria-label="Discord App Directory" class="social-link" href="https://discord.com/discovery/applications/1323028790770798673" rel="noopener noreferrer" target="_blank" title="Discord App Directory"><img alt="Discord" class="social-icon-img" loading="lazy" src="/image/Discord.png"></a>
<a aria-label="Top.gg" class="social-link" href="https://top.gg/fr/bot/1323028790770798673" rel="noopener noreferrer" target="_blank" title="Top.gg"><img alt="Top.gg" class="social-icon-img" loading="lazy" src="/image/top-gg.png"></a>
<a aria-label="Reddit" class="social-link" href="https://www.reddit.com/user/TradLinker/submitted/" rel="noopener noreferrer" target="_blank" title="Reddit"><img alt="Reddit" class="social-icon-img" loading="lazy" src="/image/Reddit.png"></a>
</div>
</div>
<div>
<h4>{html.escape(f['legalTitle'])}</h4>
<ul class="footer-links">
<li><a href="/{legal_lang}/terms-of-service/">{html.escape(f['terms'])}</a></li>
<li><a href="/{legal_lang}/privacy-policy/">{html.escape(f['privacy'])}</a></li>
</ul>
</div>
</div>
<div class="container footer-bottom"><p>© <span id="year"></span> {html.escape(f['copyright'])}</p></div>
</footer>'''


def structured_data(lang: dict, page: str, canonical: str, meta: dict) -> str:
    graph = [
        {
            "@type": "Organization",
            "@id": f"{BASE_URL}/#organization",
            "name": "TLK Forge",
            "url": BASE_URL,
            "email": "mailto:tradsphere@gmail.com",
        },
        {
            "@type": "WebSite",
            "@id": f"{BASE_URL}/#website",
            "url": BASE_URL + "/",
            "name": "TradLinker Suite",
            "publisher": {"@id": f"{BASE_URL}/#organization"},
            "inLanguage": lang["hreflang"],
        },
    ]
    if page in PRODUCTS:
        product = PRODUCTS[page]
        graph.append({
            "@type": "SoftwareApplication",
            "@id": canonical + "#software",
            "name": product["name"],
            "applicationCategory": "CommunicationApplication",
            "operatingSystem": "Discord",
            "url": canonical,
            "installUrl": product["install"],
            "image": BASE_URL + product["image"],
            "description": meta["description"],
            "publisher": {"@id": f"{BASE_URL}/#organization"},
            "inLanguage": lang["hreflang"],
        })
    return json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, separators=(",", ":"))


def render_layout(lang: dict, page: str, data: dict, body: str, languages: list[dict], *, legal=False) -> str:
    meta = data["pages"][page]
    canonical = page_url(lang["code"], page)
    og_alts = "\n  ".join(
        f'<meta property="og:locale:alternate" content="{html.escape(x["ogLocale"])}">'
        for x in published_for_page(languages, page) if x["code"] != lang["code"]
    )
    preload = '<link rel="preload" as="image" href="/image/Banniere.webp" type="image/webp" fetchpriority="high">' if page == "home" else ""
    body_class = " class=\"legal-body\"" if legal else ""
    return f'''<!doctype html>
<html lang="{html.escape(lang['hreflang'])}" dir="{lang['dir']}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{html.escape(meta['title'])}</title>
  <meta name="description" content="{html.escape(meta['description'], quote=True)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="theme-color" content="#0ea5e9">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <link rel="canonical" href="{canonical}">
  {alternate_links(languages, page)}
  <script>(function(){{if(location.hostname==='tradowner.github.io'){{var p=(location.pathname||'/').replace(/^[/]tradlinker[.]com(?=[/]|$)/,'')||'/';location.replace('{BASE_URL}'+p+location.search+location.hash);}}}})();</script>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="TradLinker Suite">
  <meta property="og:url" content="{canonical}">
  <meta property="og:title" content="{html.escape(meta['title'], quote=True)}">
  <meta property="og:description" content="{html.escape(meta['description'], quote=True)}">
  <meta property="og:image" content="{BASE_URL}/image/og-tradlinker.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="{html.escape(lang['ogLocale'])}">
  {og_alts}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{html.escape(meta['title'], quote=True)}">
  <meta name="twitter:description" content="{html.escape(meta['description'], quote=True)}">
  <meta name="twitter:image" content="{BASE_URL}/image/og-tradlinker.jpg">
  <link rel="icon" sizes="32x32" type="image/png" href="/image/favicon-32.png">
  <link rel="icon" type="image/webp" href="/image/Avatar%20Linker%20rond.webp">
  <link rel="apple-touch-icon" href="/image/apple-touch-icon.png">
  {preload}
  <link rel="stylesheet" href="/css/styles.css?v=20260809-2">
  <script defer src="/js/script.js"></script>
  <script type="application/ld+json">{structured_data(lang, page, canonical, meta)}</script>
</head>
<body{body_class}>
<div class="bg-orb orb-a"></div><div class="bg-orb orb-b"></div><div class="grid-noise"></div>
<header class="site-header" id="top"><div class="container nav-wrap">
<a class="brand" href="/{lang['code']}/"><img alt="TradLinker" decoding="async" height="256" width="256" src="/image/Avatar%20Linker%20rond.webp"><span><strong>TradLinker Suite</strong><small>{html.escape(data['brandSubtitle'])}</small></span></a>
<div class="header-right">{nav_html(lang, page, data, languages)}</div>
<button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-label="{html.escape(data['menuLabel'], quote=True)}"><span></span><span></span><span></span></button>
</div></header>
<main class="app-main">{body}</main>
{footer_html(lang['code'], data, languages)}
</body></html>
'''


def localize_fragment(fragment: str, lang: str, page: str) -> str:
    # Assets are root-relative; page-section links on dedicated product pages return to home.
    fragment = re.sub(r'(?P<attr>(?:src|href)=\")(?:(?:\.\./)+)(?=(?:image|css|js)/)', r'\g<attr>/', fragment)
    if page != "home":
        fragment = re.sub(r'href="#(presentation|offres|tester|faq|home)"', rf'href="/{lang}/#\1"', fragment)
    return fragment


def make_home_body(lang: str) -> str:
    base = SRC / "content" / lang
    pieces = []
    for name in ["home", "presentation", "offres", "tester"]:
        text = (base / f"{name}.html").read_text(encoding="utf-8")
        pieces.append(localize_fragment(text, lang, "home"))
    faq = (base / "faq.html").read_text(encoding="utf-8")
    return '<div class="page-stack" id="pageStack">\n' + "\n".join(pieces) + "\n</div>\n" + faq


def make_product_body(lang: str, page: str) -> str:
    text = (SRC / "content" / lang / f"{page}.html").read_text(encoding="utf-8")
    return '<div class="page-stack" id="pageStack">\n' + localize_fragment(text, lang, page) + "\n</div>"


def inline_markdown(text: str, lang: str) -> str:
    # Extract Markdown links first, then escape all user-readable text.
    links = []
    def stash_link(match):
        label, url = match.group(1), match.group(2)
        if url == "./privacy-policy.md": url = f"/{lang}/privacy-policy/"
        elif url == "./terms-of-service.md": url = f"/{lang}/terms-of-service/"
        token = f"@@LINK{len(links)}@@"
        links.append((token, label, url))
        return token
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', stash_link, text)
    escaped = html.escape(text, quote=False)
    escaped = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', escaped)
    escaped = re.sub(r'`([^`]+)`', r'<code>\1</code>', escaped)
    for token, label, url in links:
        escaped = escaped.replace(token, f'<a href="{html.escape(url, quote=True)}">{html.escape(label)}</a>')
    return escaped


def markdown_to_html(md: str, lang: str) -> str:
    lines = md.replace("\r\n", "\n").split("\n")
    out = []
    paragraph = []
    list_items = []
    quote_lines = []

    def flush_p():
        nonlocal paragraph
        if paragraph:
            rendered = " ".join(paragraph).replace("@@BR@@ ", "<br>").replace("@@BR@@", "<br>")
            out.append(f"<p>{rendered}</p>")
            paragraph = []
    def flush_list():
        nonlocal list_items
        if list_items:
            out.append("<ul>" + "".join(f"<li>{x}</li>" for x in list_items) + "</ul>")
            list_items = []
    def flush_quote():
        nonlocal quote_lines
        if quote_lines:
            out.append("<blockquote><p>" + "<br>".join(quote_lines) + "</p></blockquote>")
            quote_lines = []

    for raw in lines:
        line = raw.rstrip("\n")
        if not line.strip():
            flush_p(); flush_list(); flush_quote(); continue
        m = re.match(r'^(#{1,4})\s+(.+)$', line)
        if m:
            flush_p(); flush_list(); flush_quote()
            level = len(m.group(1))
            out.append(f"<h{level}>{inline_markdown(m.group(2), lang)}</h{level}>")
            continue
        if line.startswith("- "):
            flush_p(); flush_quote()
            list_items.append(inline_markdown(line[2:].strip(), lang))
            continue
        if line.startswith(">"):
            flush_p(); flush_list()
            quote_lines.append(inline_markdown(line[1:].lstrip(), lang))
            continue
        flush_list(); flush_quote()
        br = line.endswith("  ")
        content = inline_markdown(line.rstrip(), lang)
        paragraph.append(content + ("@@BR@@" if br else ""))
    flush_p(); flush_list(); flush_quote()
    return "\n".join(out)


def make_legal_body(lang: str, page: str, data: dict) -> str:
    filename = "privacy-policy.md" if page == "privacy-policy" else "terms-of-service.md"
    md = (SRC / "legal" / lang / filename).read_text(encoding="utf-8")
    rendered = markdown_to_html(md, lang)
    return f'''<section class="section legal-section"><div class="container legal-container">
<a class="legal-back" href="/{lang}/">← {html.escape(data['legal']['back'])}</a>
<article class="legal-card">{rendered}</article>
</div></section>'''


def write_page(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def build_root(languages: list[dict]):
    published = [x for x in languages if x.get("published")]
    links = " · ".join(f'<a href="/{x["code"]}/">{html.escape(x["nativeName"])}</a>' for x in published)
    codes = json.dumps([x["code"] for x in published])
    root_html = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>TradLinker Suite</title><meta name="description" content="TradLinker Suite multilingual website."><meta name="robots" content="noindex,follow"><link rel="canonical" href="{BASE_URL}/en/">{alternate_links(languages, 'home')}<script>(function(){{var p={codes};var langs=navigator.languages||[navigator.language||'en'];var target='en';for(var i=0;i<langs.length;i++){{var b=String(langs[i]).toLowerCase().split('-')[0];if(p.indexOf(b)!==-1){{target=b;break;}}}}location.replace('/'+target+'/'+(location.hash||''));}})();</script></head><body><p>Redirecting…</p><p>{links}</p></body></html>'''
    write_page(OUT / "index.html", root_html)


def build_404(languages: list[dict]):
    links = "".join(f'<li><a href="/{x["code"]}/">{html.escape(x["nativeName"])}</a></li>' for x in languages if x.get("published"))
    text = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | TradLinker</title><link rel="stylesheet" href="/css/styles.css?v=20260809-2"></head><body><main class="app-main"><section class="section"><div class="container legal-container"><article class="legal-card"><h1>Page not found</h1><p>This page does not exist. Choose a language to return to TradLinker.</p><ul>{links}</ul></article></div></section></main></body></html>'''
    write_page(OUT / "404.html", text)


def build_sitemap(languages: list[dict]):
    xmlns = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"'
    rows = []
    for page in PAGE_SLUGS:
        langs = published_for_page(languages, page)
        for lang in langs:
            alternates = "".join(
                f'<xhtml:link rel="alternate" hreflang="{html.escape(alt["hreflang"])}" href="{page_url(alt["code"], page)}"/>'
                for alt in langs
            )
            alternates += f'<xhtml:link rel="alternate" hreflang="x-default" href="{page_url("en", page)}"/>'
            rows.append(f'<url><loc>{page_url(lang["code"], page)}</loc>{alternates}</url>')
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n' + f'<urlset {xmlns}>\n' + "\n".join(rows) + '\n</urlset>\n'
    write_page(OUT / "sitemap.xml", xml)


def validate_locale(lang: dict):
    code = lang["code"]
    if not lang.get("published"):
        return
    base = SRC / "content" / code
    needed = ["site.json", "home.html", "presentation.html", "tradlinker.html", "tradcoord.html", "tradassist.html", "offres.html", "tester.html", "faq.html"]
    missing = [name for name in needed if not (base / name).exists()]
    if missing:
        raise SystemExit(f"Published locale {code!r} is incomplete: {', '.join(missing)}")
    if lang.get("legalPublished", True):
        for name in ["privacy-policy.md", "terms-of-service.md"]:
            if not (SRC / "legal" / code / name).exists():
                raise SystemExit(f"Published legal locale {code!r} is missing {name}")


def main():
    languages = load_json(SRC / "config" / "languages.json")
    # Default legal publication status follows locale publication status.
    for item in languages:
        item.setdefault("legalPublished", item.get("published", False))
        validate_locale(item)

    if OUT.exists(): shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    # Static files shared by every locale.
    for folder in ["css", "js", "image"]:
        shutil.copytree(ROOT / folder, OUT / folder)
    for filename in ["CNAME", ".nojekyll", "google6813d37b4dac858e.html"]:
        if (ROOT / filename).exists(): shutil.copy2(ROOT / filename, OUT / filename)

    published = [x for x in languages if x.get("published")]
    for lang in published:
        code = lang["code"]
        data = load_json(SRC / "content" / code / "site.json")
        write_page(OUT / code / "index.html", render_layout(lang, "home", data, make_home_body(code), languages))
        for page in ["tradlinker", "tradassist", "tradcoord"]:
            write_page(OUT / code / page / "index.html", render_layout(lang, page, data, make_product_body(code, page), languages))
        if lang.get("legalPublished"):
            for page in ["privacy-policy", "terms-of-service"]:
                write_page(OUT / code / page / "index.html", render_layout(lang, page, data, make_legal_body(code, page, data), languages, legal=True))

    build_root(languages)
    build_404(languages)
    build_sitemap(languages)
    write_page(OUT / "robots.txt", f"User-agent: *\nAllow: /\nSitemap: {BASE_URL}/sitemap.xml\n")
    print(f"Built {len(published)} published locales into {OUT}")


if __name__ == "__main__":
    main()
