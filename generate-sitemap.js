import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Manually parse .env to get Supabase credentials (ensures 100% compatibility across all Node versions)
const envPath = path.join(__dirname, ".env");
let supabaseUrl = "";
let supabaseAnonKey = "";

try {
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    const lines = envContent.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      
      const parts = trimmed.split("=");
      const key = parts[0].trim();
      const value = parts.slice(1).join("=").trim().replace(/^['"]|['"]$/g, "");
      
      if (key === "VITE_SUPABASE_URL") supabaseUrl = value;
      if (key === "VITE_SUPABASE_ANON_KEY") supabaseAnonKey = value;
    }
  }
} catch (err) {
  console.error("Warning: Error reading .env file:", err.message);
}

// Fallback to process.env if available (e.g. in CI/CD pipeline deployments like Vercel)
supabaseUrl = supabaseUrl || process.env.VITE_SUPABASE_URL;
supabaseAnonKey = supabaseAnonKey || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Error: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not found in .env or environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DOMAIN = "https://webuildreach.com";

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/services", priority: "0.9", changefreq: "weekly" },
  { path: "/blogs", priority: "0.9", changefreq: "daily" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" }
];

const servicePages = [
  { path: "/services/web-dev", priority: "0.9", changefreq: "weekly" },
  { path: "/services/soft-dev", priority: "0.9", changefreq: "weekly" },
  { path: "/services/crm", priority: "0.9", changefreq: "weekly" },
  { path: "/services/erp", priority: "0.9", changefreq: "weekly" },
  { path: "/services/meta-ads", priority: "0.9", changefreq: "weekly" },
  { path: "/services/graphic-design", priority: "0.9", changefreq: "weekly" },
  { path: "/services/app-dev", priority: "0.9", changefreq: "weekly" },
  { path: "/services/ecommerce", priority: "0.9", changefreq: "weekly" }
];

async function fetchBlogs() {
  try {
    console.log("Fetching published blog posts from Supabase...");
    const { data, error } = await supabase
      .from("blogs")
      .select("slug, created_at")
      .eq("is_published", true)
      .neq("slug", "site-settings-topbar");

    if (error) {
      console.error("Error fetching blogs from Supabase:", error.message);
      return [];
    }
    console.log(`Fetched ${data?.length || 0} published blog posts.`);
    return data || [];
  } catch (err) {
    console.error("Failed to connect or fetch from Supabase:", err.message);
    return [];
  }
}

async function generateSitemap() {
  const blogs = await fetchBlogs();
  const currentDate = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Static Pages
  for (const page of staticPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${page.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // 2. Service Pages
  for (const page of servicePages) {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${page.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // 3. Dynamic Blog Pages
  for (const blog of blogs) {
    const blogDate = new Date(blog.created_at || new Date())
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

  // Ensure directories exist and write
  const publicDir = path.join(__dirname, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const publicPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(publicPath, xml, "utf-8");
  console.log(`✓ Sitemap successfully generated at: ${publicPath}`);

  // Also write to dist/sitemap.xml if the dist folder already exists
  const distDir = path.join(__dirname, "dist");
  if (fs.existsSync(distDir)) {
    const distPath = path.join(distDir, "sitemap.xml");
    fs.writeFileSync(distPath, xml, "utf-8");
    console.log(`✓ Sitemap successfully generated at: ${distPath}`);
  }
}

generateSitemap().catch((err) => {
  console.error("Sitemap generation crashed:", err);
  process.exit(1);
});
