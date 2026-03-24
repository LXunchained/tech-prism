import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * TikTokCallback — handles the OAuth redirect from TikTok
 * after a user authorizes the TechPrism app.
 *
 * TikTok redirects to:
 *   https://techprismhq.com/tiktok/callback/?code=XXX&state=YYY
 * or on error:
 *   https://techprismhq.com/tiktok/callback/?error=access_denied&...
 */
export default function TikTokCallback() {
    const [searchParams] = useSearchParams()
    const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'

    const code  = searchParams.get('code')
    const error = searchParams.get('error')
    const state = searchParams.get('state')

    useEffect(() => {
        if (error) {
            setStatus('error')
        } else if (code) {
            setStatus('success')
            // No-op in the static site — the desktop app handled the auth via
            // its local polling loop; this page is purely cosmetic for the
            // TikTok reviewer and for users who connect their account.
        } else {
            setStatus('error')
        }
    }, [code, error])

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: 'Inter, sans-serif',
        }}>
            <div style={{
                maxWidth: 480,
                textAlign: 'center',
                background: '#0f0f0f',
                border: '1px solid #222',
                borderRadius: 16,
                padding: '3rem 2rem',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            }}>
                {status === 'loading' && (
                    <>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
                        <h1 style={{ color: '#fff', fontSize: '1.5rem' }}>Connecting…</h1>
                        <p style={{ color: '#aaa' }}>Verifying your TikTok authorization.</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                        <h1 style={{ color: '#fff', fontSize: '1.5rem' }}>TikTok Connected!</h1>
                        <p style={{ color: '#aaa', marginBottom: 24 }}>
                            Your TikTok account has been successfully authorized with TechPrism.
                            You can close this window and return to the app.
                        </p>
                        <a href="/" style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg,#00f2ea,#ff0050)',
                            color: '#fff',
                            padding: '0.75rem 2rem',
                            borderRadius: 8,
                            textDecoration: 'none',
                            fontWeight: 700,
                        }}>
                            ← Back to TechPrism
                        </a>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
                        <h1 style={{ color: '#fff', fontSize: '1.5rem' }}>Authorization Failed</h1>
                        <p style={{ color: '#aaa', marginBottom: 24 }}>
                            {error === 'access_denied'
                                ? 'You declined the TikTok authorization request.'
                                : 'Something went wrong during TikTok authorization. Please try again.'}
                        </p>
                        <a href="/tiktok-integration" style={{
                            display: 'inline-block',
                            background: '#222',
                            color: '#fff',
                            padding: '0.75rem 2rem',
                            borderRadius: 8,
                            textDecoration: 'none',
                            fontWeight: 700,
                            border: '1px solid #444',
                        }}>
                            Try Again
                        </a>
                    </>
                )}
            </div>
        </div>
    )
}
