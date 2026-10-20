export default function CookieBanner({ visible, setVisible }) {

    if (!visible) return null

    return (
        <div className='fixed bottom-0 inset-x-0 z-50 px-5 py-4 bg-charcoal text-concrete'>
            <p>Acest website foloseste cookies pentru a masura eficienta reclamelor.</p>
            <div className='flex gap-3 mt-3'>
                <button
                onClick={() => {
                    setVisible(false)
                    localStorage.setItem('cookie-consent', 'accepted')
                    window.gtag('consent', 'update', {
                    ad_storage: 'granted',
                    ad_user_data: 'granted',
                    ad_personalization: 'granted',
                    analytics_storage: 'granted',
                    })
                }}
                className='bg-amber text-charcoal px-5 py-2 font-semibold'
                >Accept</button>

                <button 
                onClick={() => {
                    setVisible(false)
                    localStorage.setItem('cookie-consent', 'refused')
                    window.gtag('consent', 'update', {
                    ad_storage: 'denied',
                    ad_user_data: 'denied',
                    ad_personalization: 'denied',
                    analytics_storage: 'denied',
                    })
                }}
                className='border border-concrete px-5 py-2'
                >Refuz</button>
            </div>
        </div>
    )
}