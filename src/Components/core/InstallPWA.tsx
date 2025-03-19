import { useState, useEffect } from "react";

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowModal(true); // Show modal when PWA can be installed
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the PWA installation");
          setShowModal(false);
        } else {
          console.log("User dismissed the PWA installation");
        }
        setDeferredPrompt(null);
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (isInstalled) return null; // Hide modal if app is already installed

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-3">Install Our App</h2>
            <p className="mb-4">Get the best experience by installing our app.</p>
            <button
              onClick={handleInstallClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Install Now
            </button>
            <button
              onClick={closeModal}
              className="mt-2 block text-gray-600 underline hover:text-gray-800"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallPWA;
