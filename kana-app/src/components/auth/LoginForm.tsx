import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../../lib/supabase';
import './LoginForm.css';

const loginSchema = z.object({
    email: z.string().min(1, 'L\'email est requis').email('Adresse email invalide'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

const registerSchema = z.object({
    email: z.string().min(1, 'L\'email est requis').email('Adresse email invalide'),
    username: z.string().min(2, 'Le pseudonyme doit contenir au moins 2 caractères'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

function LoginForm() {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [serverError, setServerError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const loginForm = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
    const registerForm = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });

    const switchMode = (next: 'login' | 'register') => {
        setMode(next);
        setServerError(null);
        setSuccess(null);
        loginForm.reset();
        registerForm.reset();
    };

    const onLogin = async (data: LoginData) => {
        setServerError(null);
        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });
        if (error) setServerError('Email ou mot de passe incorrect.');
    };

    const onRegister = async (data: RegisterData) => {
        setServerError(null);
        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: { username: data.username },
            },
        });
        if (error) {
            setServerError('Une erreur est survenue. Cet email est peut-être déjà utilisé.');
        } else {
            setSuccess('Compte créé ! Vérifie ta boîte mail pour confirmer ton adresse.');
        }
    };

    const isLogin = mode === 'login';

    return (
        <section className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2 className="login-title">
                        {isLogin ? 'Connexion' : 'Inscription'}
                    </h2>
                    <p className="login-subtitle">
                        {isLogin
                            ? 'Accède à ton espace d\'apprentissage'
                            : 'Crée ton compte pour commencer'}
                    </p>
                </div>

                <div className="login-mode-toggle">
                    <button
                        className={isLogin ? 'active' : ''}
                        onClick={() => switchMode('login')}
                        type="button"
                    >
                        Connexion
                    </button>
                    <button
                        className={!isLogin ? 'active' : ''}
                        onClick={() => switchMode('register')}
                        type="button"
                    >
                        Inscription
                    </button>
                </div>

                {isLogin ? (
                    <form
                        className="login-form"
                        onSubmit={loginForm.handleSubmit(onLogin)}
                        noValidate
                    >
                        <div className={`form-field ${loginForm.formState.errors.email ? 'has-error' : ''}`}>
                            <label htmlFor="login-email" className="form-label">Email</label>
                            <input
                                id="login-email"
                                type="email"
                                placeholder="votre@email.com"
                                className="form-input"
                                {...loginForm.register('email')}
                            />
                            {loginForm.formState.errors.email && (
                                <span className="field-error" role="alert">
                                    {loginForm.formState.errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className={`form-field ${loginForm.formState.errors.password ? 'has-error' : ''}`}>
                            <label htmlFor="login-password" className="form-label">Mot de passe</label>
                            <input
                                id="login-password"
                                type="password"
                                placeholder="••••••••"
                                className="form-input"
                                {...loginForm.register('password')}
                            />
                            {loginForm.formState.errors.password && (
                                <span className="field-error" role="alert">
                                    {loginForm.formState.errors.password.message}
                                </span>
                            )}
                        </div>

                        {serverError && <p className="field-error server-error">{serverError}</p>}

                        <button
                            className="login-submit-btn"
                            type="submit"
                            disabled={loginForm.formState.isSubmitting}
                        >
                            {loginForm.formState.isSubmitting ? 'Connexion…' : 'Se connecter'}
                        </button>
                    </form>
                ) : (
                    <form
                        className="login-form"
                        onSubmit={registerForm.handleSubmit(onRegister)}
                        noValidate
                    >
                        <div className={`form-field ${registerForm.formState.errors.email ? 'has-error' : ''}`}>
                            <label htmlFor="reg-email" className="form-label">Email</label>
                            <input
                                id="reg-email"
                                type="email"
                                placeholder="votre@email.com"
                                className="form-input"
                                {...registerForm.register('email')}
                            />
                            {registerForm.formState.errors.email && (
                                <span className="field-error" role="alert">
                                    {registerForm.formState.errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className={`form-field ${registerForm.formState.errors.username ? 'has-error' : ''}`}>
                            <label htmlFor="reg-username" className="form-label">Pseudonyme</label>
                            <input
                                id="reg-username"
                                type="text"
                                placeholder="Ton pseudonyme"
                                className="form-input"
                                {...registerForm.register('username')}
                            />
                            {registerForm.formState.errors.username && (
                                <span className="field-error" role="alert">
                                    {registerForm.formState.errors.username.message}
                                </span>
                            )}
                        </div>

                        <div className={`form-field ${registerForm.formState.errors.password ? 'has-error' : ''}`}>
                            <label htmlFor="reg-password" className="form-label">Mot de passe</label>
                            <input
                                id="reg-password"
                                type="password"
                                placeholder="••••••••"
                                className="form-input"
                                {...registerForm.register('password')}
                            />
                            {registerForm.formState.errors.password && (
                                <span className="field-error" role="alert">
                                    {registerForm.formState.errors.password.message}
                                </span>
                            )}
                        </div>

                        {serverError && <p className="field-error server-error">{serverError}</p>}
                        {success && <p className="field-success">{success}</p>}

                        <button
                            className="login-submit-btn"
                            type="submit"
                            disabled={registerForm.formState.isSubmitting}
                        >
                            {registerForm.formState.isSubmitting ? 'Création…' : 'Créer mon compte'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}

export default LoginForm;