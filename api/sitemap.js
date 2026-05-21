import { createClient } from "@supabase/supabase-js";

const DOMAIN = "https://webuildreach.com";

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/services", priority: "0.9", changefreq: "weekly" },
  { path: "/blogs", priority: "0.9", changefreq: "daily" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
];

const servicePages = [
  { path: "/services/web-dev", priority: "0.9", changefreq: "weekly" },
  { path: "/services/soft-dev", priority: "0.9", changefreq: "weekly" },
  { path: "/services/crm", priority: "0.9", changefreq: "weekly" },
  { path: "/services/erp", priority: "0.9", changefreq: "weekly" },
  { path: "/services/meta-ads", priority: "0.9", changefreq: "weekly" },
  { path: "/services/graphic-design", priority: "0.9", changefreq: "weekly" },
  { path: "/services/app-dev", priority: "0.9", changefreq: "weekly" },
  { path: "/services/ecommerce", priority: "0.9", changefreq: "weekly" },
];

export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  let blogs = [];

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data, error } = await supabase
        .from("blogs")
        .select("slug, created_at, updated_at")
        .eq("is_published", true)
        .neq("slug", "site-settings-topbar")
        .order("created_at", { ascending: false });

      if (!error && data) {
        blogs = data;
      }
    } catch (err) {
      console.error("Supabase fetch error:", err.message);
    }
  }

  const currentDate = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static pages
  for (const page of staticPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${page.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Service pages
  for (const page of servicePages) {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${page.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Dynamic blog pages
  for (const blog of blogs) {
    const blogDate = new Date(blog.updated_at || blog.created_at || new Date())
      .toISOString()
      .split("T")[0];
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/blogs/${blog.slug}</loc>\n`;
    xml += `    <lastmod>${blogDate}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  res.setHeader("Content-Type", "application/xml");
  // Cache for 1 hour on CDN, but always revalidate — balances freshness vs. load
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(xml);
}
