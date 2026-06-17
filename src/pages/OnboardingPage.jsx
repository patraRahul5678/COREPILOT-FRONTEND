import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const OnboardingPage = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('loading');
    const installationId = searchParams.get('installationId');
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    useEffect(() => {
        if (success) {
            setStatus('success');
        } else if (error) {
            setStatus('error');
        } else if (installationId) {
            setStatus('ready');
        } else {
            setStatus('no-installation');
        }
    }, [success, error, installationId]);

    const handleConnectJira = () => {
        window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/jira?installationId=${installationId}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8">
                {status === 'loading' && (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-300">Loading...</p>
                    </div>
                )}

                {status === 'ready' && (
                    <>
                        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Corepilot</h1>
                        <p className="text-gray-300 mb-6 text-center">
                            Connect your Jira account to enable automatic ticket linking and analysis in pull requests.
                        </p>
                        <button
                            onClick={handleConnectJira}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                        >
                            Connect Jira
                        </button>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="text-center">
                            <div className="text-6xl mb-4">✅</div>
                            <h2 className="text-2xl font-bold mb-4">Successfully Connected!</h2>
                            <p className="text-gray-300 mb-6">
                                Your Jira account has been linked. Corepilot will now automatically analyze Jira tickets in your pull requests.
                            </p>
                            <a
                                href="https://github.com"
                                className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                            >
                                Go to GitHub
                            </a>
                        </div>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="text-center">
                            <div className="text-6xl mb-4">❌</div>
                            <h2 className="text-2xl font-bold mb-4">Connection Failed</h2>
                            <p className="text-gray-300 mb-6">
                                {error === 'access_denied' 
                                    ? 'You denied access to Jira. Please try again and allow access.' 
                                    : 'Something went wrong during authentication. Please try again.'}
                            </p>
                            <button
                                onClick={handleConnectJira}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                            >
                                Try Again
                            </button>
                        </div>
                    </>
                )}

                {status === 'no-installation' && (
                    <>
                        <div className="text-center">
                            <div className="text-6xl mb-4">⚠️</div>
                            <h2 className="text-2xl font-bold mb-4">Installation Required</h2>
                            <p className="text-gray-300 mb-6">
                                Please install the Corepilot GitHub App first.
                            </p>
                            <a
                                href="https://github.com/apps/corepilot"
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                            >
                                Install GitHub App
                            </a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default OnboardingPage;
