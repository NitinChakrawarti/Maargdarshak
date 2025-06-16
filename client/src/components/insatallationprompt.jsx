import { useEffect, useState } from 'react';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response: ${outcome}`);
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
    };

    if (!showInstallPrompt) return null;

    return (
        <div className="fixed bottom-4 right-4 p-4 bg-white border rounded-xl shadow-xl z-50 max-w-xs w-full animate-slide-in">
            <p className="text-sm font-medium text-gray-800">Install our app for a better experience!</p>
            <button
                onClick={handleInstallClick}
                className="mt-2 px-3 py-1 bg-brand-navy text-white rounded hover:bg-brand-blue cursor-pointer transition-all"
            >
                Install App
            </button>
            <button
                onClick={() => setShowInstallPrompt(false)}
                className="mt-2 px-3 py-1 bg-bg text-brand-navy rounded hover:bg-bg/70 cursor-pointer transition-all"
            >
                Later
            </button>
        </div>
    );
}
