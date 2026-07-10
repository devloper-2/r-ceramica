<?php

namespace App\Database\Seeds;

use App\Models\PageModel;
use App\Models\SectionModel;
use CodeIgniter\Database\Seeder;

/**
 * Migrates page + section content from the former frontend constants:
 *   frontend-nextjs/src/lib/constants/home.ts  and  about.ts
 *
 * Section `content` is stored as JSON matching the props each reusable
 * section component already accepts. Lucide icons are stored as string
 * names (e.g. "Building2"); the frontend maps the string back to the icon.
 */
class PagesSeeder extends Seeder
{
    public function run()
    {
        $pages    = model(PageModel::class);
        $sections = model(SectionModel::class);

        // ── Page rows (all site routes) ──────────────────────────────────────
        $pageDefs = [
            ['slug' => 'home',      'title' => 'Home',        'meta_title' => 'R Ceramica — Redefining Spaces', 'meta_description' => 'R Ceramica — premium porcelain and ceramic surfaces. Explore our collection of architectural tiles, luxury bathrooms, and innovative sanitaryware.'],
            ['slug' => 'about',     'title' => 'About Us',    'meta_title' => 'About R Ceramica — The Heritage of Excellence', 'meta_description' => 'From a single kiln in Morbi to a globally recognised name in architectural porcelain — the R Ceramica story.'],
            ['slug' => 'explore',   'title' => 'Explore',     'meta_title' => 'Explore — R Ceramica', 'meta_description' => 'Explore R Ceramica architectural surfaces and collections.'],
            ['slug' => 'bathrooms', 'title' => 'Bathrooms',   'meta_title' => 'Luxury Bathrooms — R Ceramica', 'meta_description' => 'Premium sanitary ware and luxury bathroom collections by R Ceramica.'],
            ['slug' => 'products',  'title' => 'Products',    'meta_title' => 'Products — R Ceramica', 'meta_description' => 'Browse R Ceramica porcelain, ceramic and sanitaryware products.'],
            ['slug' => 'catalogue', 'title' => 'Catalogue',   'meta_title' => 'Catalogue — R Ceramica', 'meta_description' => 'Download and browse the R Ceramica product catalogue.'],
            ['slug' => 'contact',   'title' => 'Contact Us',  'meta_title' => 'Contact R Ceramica', 'meta_description' => 'Get in touch with R Ceramica — sales, support and studio enquiries.'],
            ['slug' => 'privacy',   'title' => 'Privacy Policy', 'meta_title' => 'Privacy Policy — R Ceramica', 'meta_description' => 'R Ceramica privacy policy.'],
            ['slug' => 'terms',     'title' => 'Terms & Conditions', 'meta_title' => 'Terms & Conditions — R Ceramica', 'meta_description' => 'R Ceramica terms and conditions.'],
        ];

        $pageId = [];
        foreach ($pageDefs as $def) {
            $existing = $pages->where('slug', $def['slug'])->first();
            if ($existing) {
                $pageId[$def['slug']] = (int) $existing['id'];
                continue;
            }
            $pageId[$def['slug']] = $pages->insert([
                'slug'             => $def['slug'],
                'title'            => $def['title'],
                'meta_title'       => $def['meta_title'],
                'meta_description' => $def['meta_description'],
                'status'           => 'published',
            ], true);
        }

        // ── HOME sections (from home.ts) ─────────────────────────────────────
        $home = [
            ['type' => 'hero', 'content' => [
                'title'      => 'Redefining Spaces',
                'mediaType'  => 'video',
                'mediaSrc'   => '/images/bathroomvideo.mp4',
                'cta'        => ['label' => 'Explore Collection', 'href' => '/products'],
                'fullHeight' => true,
            ]],
            ['type' => 'mediaGrid', 'content' => [
                'cards' => [
                    ['label' => 'Materiality', 'title' => "Luxury\nBathrooms", 'imageSrc' => 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200', 'imageAlt' => 'Luxury bathroom with premium sanitary ware and fittings', 'href' => '/explore'],
                    ['label' => 'Precision', 'title' => "Sanitary\nForms", 'imageSrc' => 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200', 'imageAlt' => 'Premium sanitary ware basin and mixer tap', 'href' => '/bathrooms'],
                ],
            ]],
            ['type' => 'productCarousel', 'content' => [
                'slides' => [
                    ['title' => 'Petra Vessel', 'subtitle' => 'Natural Granite / Matte Finish', 'videoSrc' => 'https://hindwarestg.blob.core.windows.net/container1/products/ae5eb07a-52f8-45fa-98ea-c427f8dde36f.mp4'],
                    ['title' => 'Obsidian Mono', 'subtitle' => 'Hand-Carved Basalt / Textured', 'videoSrc' => 'https://assets.mixkit.co/videos/preview/mixkit-modern-bathroom-interior-4158-large.mp4'],
                    ['title' => 'Calcite Flow', 'subtitle' => 'Sandstone / Minimalist', 'videoSrc' => 'https://assets.mixkit.co/videos/preview/mixkit-hand-spraying-water-on-the-ceramic-31834-large.mp4'],
                ],
            ]],
            ['type' => 'featureCards', 'content' => [
                'cards' => [
                    ['icon' => 'Building2', 'title' => "Institutional\nBusiness", 'description' => 'Project solutions for institutional & business clients', 'linkLabel' => 'Explore Projects', 'href' => '/about'],
                    ['icon' => 'Globe', 'title' => "International\nBusiness", 'description' => 'Our global footprint and operational countries', 'linkLabel' => 'Global Reach', 'href' => '/about'],
                    ['icon' => 'Headset', 'title' => "Service &\nSupport", 'description' => 'Installation assistance and technical requests', 'linkLabel' => 'Connect Now', 'href' => '/contact'],
                    ['icon' => 'Smartphone', 'title' => "Download\nService App", 'description' => 'Manage your space from your fingertips', 'linkLabel' => 'Download Now', 'href' => '/catalogue', 'inverted' => true],
                ],
            ]],
            ['type' => 'narrative', 'content' => [
                'eyebrow'    => 'Insight & Heritage',
                'title'      => "The Legacy of\nArchitectural\nSurfaces",
                'lead'       => 'Merging traditional craftsmanship with state-of-the-art nanotechnology to redefine modern porcelain engineering.',
                'paragraphs' => [
                    'R Ceramica — an exclusive porcelain and ceramic brand, has established its presence through decades of innovation, merging traditional craftsmanship with cutting-edge nanotechnology production. Our manufacturing units in key industrial hubs are equipped with first-for-industry thermal efficiency systems, ensuring every slab meets the highest architectural standards.',
                    'With a curated network of over 200+ exclusive studios across international markets, we bring a sensory-driven approach to architectural surfaces. Our commitment to sustainability isn\'t just a corporate statement; it\'s embedded in our supply chain, from raw material extraction to the final tactile finish of our large-format porcelain slabs.',
                    'Whether you are designing a high-traffic commercial space or a minimalist private residence, R Ceramica provides the technical data and aesthetic versatility required to transcend the limits of traditional design. Our portfolio spans the world\'s most prestigious projects, reflecting our status as a cornerstone of modern architectural surface engineering.',
                ],
                'cta'        => ['label' => 'Enquire Now', 'href' => '/contact'],
                'watermark'  => 'Excellence Through Innovation',
            ]],
            ['type' => 'socialFeed', 'content' => [
                'posts' => [
                    ['id' => 1, 'imageSrc' => 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=600', 'imageAlt' => 'Luxury bathroom with wall-hung faucet and white basin'],
                    ['id' => 2, 'imageSrc' => 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600', 'imageAlt' => 'Premium chrome basin mixer tap close-up'],
                    ['id' => 3, 'imageSrc' => 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=600', 'imageAlt' => 'Modern exposed shower mixer in matte black'],
                    ['id' => 4, 'imageSrc' => 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=600', 'imageAlt' => 'Contemporary bathroom interior with luxury fittings'],
                    ['id' => 5, 'imageSrc' => 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600', 'imageAlt' => 'Elegant freestanding bath with floor-mounted filler tap'],
                ],
            ]],
        ];
        $this->insertSections($sections, $pageId['home'], $home);

        // ── ABOUT sections (from about.ts — matches what about.tsx renders) ──
        $about = [
            ['type' => 'aboutHero', 'content' => [
                'imageSrc'   => 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80',
                'imageAlt'   => 'Office Facility',
                'eyebrow'    => 'Since 1994',
                'titleLine1' => 'The Heritage of',
                'titleLine2' => 'Excellence',
            ]],
            ['type' => 'philosophy', 'content' => [
                'title'       => 'We don\'t just manufacture surfaces; we engineer',
                'highlight'   => ' sensory experiences.',
                'intro'       => 'R Ceramica was born out of a vision to redefine the architectural landscape through high-performance porcelain and ceramic solutions.',
                'description' => 'Starting as a boutique facility in Morbi, the hub of ceramic innovation, we have evolved into a global powerhouse, merging traditional craftsmanship with state-of-the-art nanotechnology. Our journey is driven by one core philosophy: the surface is the soul of any space.',
                'image'       => '/images/materiallab.webp',
                'imageAlt'    => 'Material Lab',
                'badgeTitle'  => 'Technical Analysis',
                'badgeText'   => '0.05% Water Absorption Certified',
            ]],
            ['type' => 'stats', 'content' => [
                'items' => [
                    ['number' => '20+', 'label' => 'Global Markets Served', 'accent' => 'amber'],
                    ['number' => '5000+', 'label' => 'Surface Designs', 'accent' => 'blue'],
                    ['number' => '30+', 'label' => 'Industry Awards', 'accent' => 'emerald'],
                    ['number' => '12M+', 'label' => 'SQM Annual Production Capacity', 'accent' => 'purple'],
                ],
            ]],
            ['type' => 'technology', 'content' => [
                'items' => [
                    ['title' => 'Nano-Trek Tech', 'description' => 'Micro-pore sealing for absolute hygienic surfaces and stain resistance.', 'image' => '/images/aboutecnoimg.jpg', 'accent' => 'blue'],
                    ['title' => 'Continuum Slabs', 'description' => 'Large format engineering allowing seamless architectural transitions.', 'image' => '/images/continuumimg.webp', 'accent' => 'amber'],
                    ['title' => 'Eco-Thermal Kilns', 'description' => 'Reducing carbon footprint through revolutionary energy recovery.', 'image' => '/images/ecothermalkilns.webp', 'accent' => 'emerald'],
                ],
            ]],
            ['type' => 'chairman', 'content' => [
                'backgroundText' => 'VISIONARY',
                'heading'        => 'Chairman\'s Perspective',
                'quote'          => 'Innovation is not about adding more features; it\'s about stripping away everything that isn\'t essential until the soul of the material is all that remains.',
                'name'           => 'Rajesh Patel',
                'designation'    => 'Founder & Chairman, R Ceramica',
                'image'          => 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80',
                'imageAlt'       => 'Chairman',
            ]],
            ['type' => 'footprint', 'content' => [
                'eyebrow'     => 'Global Echo',
                'title'       => "Across\nBorders",
                'description' => 'With operational hubs in Gujarat, Dubai, and emerging centers in Europe, our logistics network ensures architectural excellence is delivered to every continent without compromise.',
                'cta'         => ['label' => 'View Logistics Centers', 'href' => '/contact'],
                'image'       => '/images/wordmap.jpg',
                'imageAlt'    => 'Abstract World Map',
            ]],
        ];
        $this->insertSections($sections, $pageId['about'], $about);

        // ── EXPLORE (from explore.ts — ExploreSection cards) ─────────────────
        $explore = [
            ['type' => 'exploreGrid', 'content' => [
                'items' => [
                    ['eyebrow' => 'Heritage Collection', 'title' => 'Architectural', 'italicLine' => 'Surfaces', 'description' => 'Curated porcelain systems for high-envelope architecture.', 'image' => 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80', 'imageAlt' => 'Main Collection', 'imageOpacity' => 50, 'bg' => '#080808', 'overlayClass' => 'bg-gradient-to-t from-black via-transparent to-transparent', 'titleTracking' => 'tight', 'href' => '/products', 'linkLabel' => 'View Collection', 'linkVariant' => 'arrow', 'isH1' => true],
                    ['eyebrow' => 'Designer Range', 'title' => "Luxury\nShowers", 'description' => 'Advanced hydro-therapy systems designed for the ultimate wellness experience.', 'image' => 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80', 'imageAlt' => 'Showers', 'imageOpacity' => 30, 'bg' => '#0c0c0c', 'overlayClass' => 'bg-black/30 group-hover:bg-black/10 transition-all', 'titleTracking' => 'wide', 'href' => '/bathrooms', 'linkLabel' => 'Explore Models', 'linkVariant' => 'chevron'],
                    ['eyebrow' => 'Geometric Precision', 'title' => "Artisan\nFaucets", 'description' => 'Precision engineered hardware defining the intersection of fluid dynamics and sculpture.', 'image' => 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1600', 'imageAlt' => 'Artisan Faucets', 'imageOpacity' => 50, 'bg' => '#0a0a0a', 'overlayClass' => 'bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent', 'contentPosition' => 'center', 'titleTracking' => 'tight', 'href' => '/bathrooms', 'linkLabel' => 'Technical Series', 'linkVariant' => 'gold-arrow'],
                    ['eyebrow' => 'Hygiene Systems', 'title' => "Sanitary\nForm", 'description' => 'High-performance water closets connecting ergonomic form and sustainability for contemporary living.', 'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1600', 'imageAlt' => 'Bathware', 'imageOpacity' => 40, 'bg' => '#0c0c0c', 'overlayClass' => 'bg-gradient-to-b from-black/20 to-black/80', 'titleTracking' => 'wide', 'href' => '/bathrooms', 'linkLabel' => 'Browse Complete Series', 'linkVariant' => 'button'],
                    ['eyebrow' => 'Vessel Works', 'title' => "Minimal\nBasins", 'description' => 'Hand-crafted artisan basins that redefine the morning ritual through stone and ceramic textures.', 'image' => 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=1600', 'imageAlt' => 'Wash Basin', 'imageOpacity' => 40, 'bg' => '#080808', 'overlayClass' => 'bg-gradient-to-t from-black/60 to-transparent', 'titleTracking' => 'wide', 'href' => '/bathrooms', 'linkLabel' => 'Explore Gallery', 'linkVariant' => 'button'],
                    ['eyebrow' => 'Infrastructural', 'title' => "FRP\nManhole", 'description' => ['a blend of durability', 'and sustainable performance'], 'image' => 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&q=80&w=1600', 'imageAlt' => 'FRP Manhole', 'imageOpacity' => 30, 'bg' => '#060606', 'overlayClass' => 'bg-gradient-to-b from-transparent to-black/90', 'titleTracking' => 'wide', 'href' => '/contact', 'linkLabel' => 'Technical Spec', 'linkVariant' => 'gold-arrow'],
                ],
            ]],
        ];
        $this->insertSections($sections, $pageId['explore'], $explore);

        // ── CONTACT (hero from contact.ts) ───────────────────────────────────
        $contact = [
            ['type' => 'contactHero', 'content' => [
                'eyebrow'     => 'Connectivity',
                'title'       => 'Get In Touch',
                'description' => 'Experience architectural excellence first hand. Our consultants are ready to assist your vision.',
                'mediaType'   => 'image',
                'mediaSrc'    => '/images/contacthero.webp',
                'mediaAlt'    => 'R Ceramica architectural porcelain showroom interior',
                'cta'         => ['label' => 'Talk to Us', 'href' => '/contact', 'variant' => 'gold'],
                'fullHeight'  => false,
            ]],
        ];
        $this->insertSections($sections, $pageId['contact'], $contact);
    }

    private function insertSections(SectionModel $sections, int $pageId, array $defs): void
    {
        // Per-page idempotency: skip if this page already has sections.
        if ($sections->where('page_id', $pageId)->countAllResults() > 0) {
            return;
        }

        $sort = 0;
        foreach ($defs as $def) {
            $sections->insert([
                'page_id'    => $pageId,
                'type'       => $def['type'],
                'sort_order' => $sort++,
                'content'    => $def['content'],
                'is_active'  => 1,
            ]);
        }
    }
}
