import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, ExternalLink, Calendar, Tag } from 'lucide-react';
import blogPosts from '../data/blogPosts.json';

function StructuredData({ post }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: post.title,
        description: post.meta_description || post.metaDescription || '',
        offers: {
            '@type': 'Offer',
            price: post.price || 0,
            priceCurrency: 'USD',
            url: post.affiliate_link || post.affiliateLink || '',
            availability: 'https://schema.org/InStock',
        },
        aggregateRating: post.rating
            ? {
                '@type': 'AggregateRating',
                ratingValue: Number(post.rating).toFixed(1),
                bestRating: '5',
                ratingCount: '1',
            }
            : undefined,
        review: {
            '@type': 'Review',
            author: { '@type': 'Organization', name: 'TechPrism' },
            reviewBody: post.meta_description || post.metaDescription || '',
            datePublished: post.publishedAt || post.generated_at || new Date().toISOString(),
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

function formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default function BlogPost() {
    const { slug } = useParams();
    const post = blogPosts.find((p) => p.slug === slug);

    useEffect(() => {
        if (!post) return;
        const title = post.title || 'Tech Review | TechPrism';
        const desc = post.meta_description || post.metaDescription || '';

        document.title = `${title} | TechPrism`;

        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', desc);

        // Scroll to top on route change
        window.scrollTo(0, 0);
    }, [post]);

    if (!post) return <Navigate to="/blog" replace />;

    const affLink = post.affiliate_link || post.affiliateLink || `https://www.amazon.com/dp/${post.asin}`;
    const pubDate = post.publishedAt || post.generated_at || '';
    const articleHtml = post.article_html || post.articleHtml || '';

    return (
        <>
            <StructuredData post={post} />
            <div className="blogpost-page">
                <div className="blogpost-container">

                    {/* Back nav */}
                    <Link to="/blog" className="blogpost-back">
                        <ArrowLeft size={16} />
                        Back to Blog
                    </Link>

                    {/* Meta header */}
                    <div className="blogpost-meta-row">
                        {post.category && (
                            <span className="blogpost-category">
                                <Tag size={12} /> {post.category}
                            </span>
                        )}
                        {pubDate && (
                            <span className="blogpost-date">
                                <Calendar size={12} />
                                {formatDate(pubDate)}
                            </span>
                        )}
                        {post.rating && (
                            <span className="blogpost-rating">
                                <Star size={12} fill="currentColor" />
                                {Number(post.rating).toFixed(1)} / 5
                            </span>
                        )}
                        {post.price > 0 && (
                            <span className="blogpost-price">${Number(post.price).toFixed(2)}</span>
                        )}
                    </div>

                    {/* YouTube embed */}
                    {(post.youtubeId || post.youtube_id) && (
                        <div className="blogpost-video-wrap">
                            <iframe
                                src={`https://www.youtube.com/embed/${post.youtubeId || post.youtube_id}`}
                                title={post.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="blogpost-video"
                            />
                        </div>
                    )}

                    {/* Affiliate CTA */}
                    <div className="blogpost-cta-bar">
                        <div className="blogpost-cta-info">
                            <span className="blogpost-cta-label">Best price on Amazon</span>
                            {post.price > 0 && (
                                <span className="blogpost-cta-price">${Number(post.price).toFixed(2)}</span>
                            )}
                        </div>
                        <a
                            href={affLink}
                            target="_blank"
                            rel="nofollow sponsored noopener noreferrer"
                            className="btn btn-primary blogpost-cta-btn"
                            id="affiliate-cta-top"
                        >
                            <ShoppingCart size={16} />
                            Buy on Amazon
                            <ExternalLink size={13} />
                        </a>
                    </div>

                    {/* Article HTML from Gemini */}
                    <article
                        className="blogpost-article"
                        dangerouslySetInnerHTML={{ __html: articleHtml }}
                    />

                    {/* Bottom CTA */}
                    <div className="blogpost-cta-bottom">
                        <p>Ready to grab this deal?</p>
                        <a
                            href={affLink}
                            target="_blank"
                            rel="nofollow sponsored noopener noreferrer"
                            className="btn btn-primary"
                            id="affiliate-cta-bottom"
                        >
                            <ShoppingCart size={16} />
                            Check Price on Amazon →
                        </a>
                        <p className="blogpost-disclaimer">
                            <em>
                                TechPrism participates in the Amazon Associates Program.
                                Purchases made through our links support the site at no extra cost to you.
                            </em>
                        </p>
                    </div>

                    {/* Back nav bottom */}
                    <Link to="/blog" className="blogpost-back" style={{ marginTop: '2rem', display: 'inline-flex' }}>
                        <ArrowLeft size={16} />
                        More Reviews
                    </Link>
                </div>
            </div>
        </>
    );
}
