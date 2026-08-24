import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

function Login() {
    const navigate = useNavigate();
    const { user, login: authLogin } = useAuth();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [navigate, user]);

    const resetFields = useCallback(() => {
        setUserName('');
        setPassword('');
        setError('');
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!userName.trim() || !password) {
            setError('Enter your username and password to continue.');
            return;
        }

        setLoading(true);
        try {
            const response = await authAPI.login({
                userName: userName.trim(),
                password,
            });
            await authLogin(response.data?.user ?? response.data);
            resetFields();
            navigate('/', { replace: true });
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ||
                'We could not sign you in. Check your details and try again.',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f4f7f4] px-4 py-6 text-slate-900 sm:px-8 sm:py-10">
            <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(22,42,41,0.12)] sm:min-h-[calc(100vh-5rem)] lg:grid-cols-[0.92fr_1.08fr]">
                <section className="relative hidden overflow-hidden bg-[#12665d] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
                    <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full border-[36px] border-[#f3a24d]/80" />
                    <div className="absolute -bottom-32 -left-28 h-80 w-80 rounded-full border-[46px] border-white/10" />
                    <div className="relative">
                        <div className="mb-14 flex items-center gap-3">
                            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-sm font-extrabold tracking-wider text-[#12665d]">
                                PSG
                            </span>
                            <div>
                                <p className="text-sm font-bold">PSG Document Hub</p>
                                <p className="text-xs text-white/65">College of Technology</p>
                            </div>
                        </div>
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#ffd29c]">
                            One campus, one place
                        </p>
                        <h1 className="max-w-md text-4xl font-bold leading-[1.08] tracking-tight xl:text-5xl">
                            The documents your work depends on.
                        </h1>
                        <p className="mt-6 max-w-sm text-sm leading-6 text-white/75">
                            Access institutional resources, academic records, circulars, and forms from a single secure hub.
                        </p>
                    </div>
                    <div className="relative flex items-center gap-3 border-t border-white/15 pt-5 text-xs text-white/70">
                        <ShieldCheck size={18} className="text-[#ffd29c]" />
                        Secure access for the PSG community
                    </div>
                </section>

                <section className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
                    <div className="w-full max-w-md">
                        <div className="mb-9 lg:hidden">
                            <div className="mb-8 flex items-center gap-3">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#12665d] text-xs font-extrabold tracking-wider text-white">
                                    PSG
                                </span>
                                <div>
                                    <p className="text-sm font-bold">PSG Document Hub</p>
                                    <p className="text-xs text-slate-500">College of Technology</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Welcome back</p>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Sign in to continue.</h2>
                            <p className="mt-3 text-sm leading-6 text-slate-500">Use your institutional account to access the document hub.</p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="userName">Username</label>
                                <div className="relative">
                                    <UserRound className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#12665d] focus:bg-white focus:ring-4 focus:ring-[#12665d]/10"
                                        id="userName"
                                        name="userName"
                                        autoComplete="username"
                                        value={userName}
                                        onChange={(event) => setUserName(event.target.value)}
                                        placeholder="Enter your username"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="block text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
                                    <LockKeyhole size={15} className="text-slate-400" aria-hidden="true" />
                                </div>
                                <div className="relative">
                                    <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm outline-none transition focus:border-[#12665d] focus:bg-white focus:ring-4 focus:ring-[#12665d]/10"
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        className="absolute right-2 top-1/2 grid -translate-y-1/2 place-items-center rounded-lg p-2 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                                        type="button"
                                        onClick={() => setShowPassword((visible) => !visible)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        title={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {error && <p className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700" role="alert">{error}</p>}

                            <button
                                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#12665d] px-4 text-sm font-bold text-white transition hover:bg-[#0e544d] focus:outline-none focus:ring-4 focus:ring-[#12665d]/20 disabled:cursor-not-allowed disabled:opacity-60"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                                {!loading && <ArrowRight size={18} />}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-xs leading-5 text-slate-400">Need access? Contact your department administrator.</p>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Login;