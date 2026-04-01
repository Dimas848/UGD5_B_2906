'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthFromWrapper from '../../../components/AuthFormWrapper';
import SocialAuth from '../../../components/SocialAuth';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface LoginFormData {
  email: string;
  password: string;
  captchaInput: string;
  remberMe?: boolean;
}

interface ErrorObject {
  email?: string;
  password?: string;
  captcha?: string;
}

const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const LoginPage = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    captchaInput: ''
  });
  const [errors, setErrors] = useState<ErrorObject>({});
  
  const [attempts, setAttempts] = useState<number>(3);
  const [captchaText, setCaptchaText] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const FULL_NPM = "241712906";
  const NPM_KAMU = "2906";

  useEffect(() => {
    setCaptchaText(generateCaptcha());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleRefreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
  };

  const handleResetAttempts = () => {
    setAttempts(3);
    setFormData(prev => ({ ...prev, captchaInput: '' }));
    handleRefreshCaptcha();
    toast.success('Kesempatan login berhasil direset!', { theme: 'dark', position: 'top-right' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (attempts <= 0) return;

    const newErrors: ErrorObject = {};
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
      isValid = false;
    } else if (formData.email !== `${NPM_KAMU}@gmail.com`) {
      newErrors.email = `Email harus sesuai dengan npm kalian (cth. ${NPM_KAMU}@gmail.com)`;
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password tidak boleh kosong';
      isValid = false;
    } else if (formData.password !== FULL_NPM) {
      newErrors.password = `Password harus sesuai dengan npm kalian (cth. ${FULL_NPM})`;
      isValid = false;
    }

    if (!formData.captchaInput.trim()) {
      newErrors.captcha = 'Captcha belum diisi';
      isValid = false;
    } else if (formData.captchaInput !== captchaText) {
      newErrors.captcha = 'Captcha tidak sesuai';
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      
      const newAttempts = Math.max(0, attempts - 1);
      setAttempts(newAttempts);

      if (newAttempts === 0) {
        toast.error('Login gagal / kesempatan login habis.', { theme: 'dark', position: 'top-right' });
      } else {
        toast.error(`Login Gagal! Sisa kesempatan: ${newAttempts}`, { theme: 'dark', position: 'top-right' });
      }
      return;
    }

    toast.success('Login Berhasil!', { theme: 'dark', position: 'top-right' });
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', 'true');
    }
    
    router.push('/unguided/home');
  };

  return (
    <AuthFromWrapper title="Login">
      <div className="text-center mb-4">
        <p className="text-sm font-medium text-gray-600">Sisa kesempatan: {attempts}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 w-full">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={attempts === 0}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} disabled:bg-gray-100 disabled:cursor-not-allowed`}
            placeholder="Masukan email"
          />
          {errors.email && <p className="text-red-600 text-sm italic mt-1">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={attempts === 0}
              className={`w-full px-4 py-2.5 rounded-lg border pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300'} disabled:bg-gray-100 disabled:cursor-not-allowed`}
              placeholder="Masukan password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={attempts === 0}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <p className="text-red-600 text-sm italic mt-1">{errors.password}</p>}
          
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                name="remberMe"
                checked={formData.remberMe || false}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, remberMe: e.target.checked }))
                }
                disabled={attempts === 0}
                className="mr-2 h-4 w-4 rounded border-gray-300 disabled:opacity-50"
              />
              Ingat Saya
            </label>
            <Link href="/unguided/auth/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm font-semibold pointer-events-auto">
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">Captcha:</span>
            <span className="font-mono text-lg font-bold text-gray-800 bg-gray-100 px-3 py-1.5 rounded" style={{ userSelect: 'none' }}>
              {captchaText}
            </span>
            <button
              type="button"
              onClick={handleRefreshCaptcha}
              disabled={attempts === 0}
              className="text-gray-500 hover:text-blue-600 transition-colors disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>
          <input
            type="text"
            name="captchaInput"
            value={formData.captchaInput}
            onChange={handleChange}
            disabled={attempts === 0}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.captcha ? 'border-red-500' : 'border-gray-300'} disabled:bg-gray-100 disabled:cursor-not-allowed`}
            placeholder="Masukan captcha"
          />
          {errors.captcha && <p className="text-red-600 text-sm italic mt-1">{errors.captcha}</p>}
        </div>

        <div className="flex flex-col space-y-3">
          <button
            type="submit"
            disabled={attempts === 0}
            className={`w-full font-semibold py-2.5 px-4 rounded-lg transition-colors ${
              attempts === 0 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={handleResetAttempts}
            disabled={attempts > 0} 
            className={`w-full font-semibold py-2.5 px-4 rounded-lg transition-colors ${
              attempts === 0 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-400 text-gray-200 cursor-not-allowed' 
            }`}
          >
            Reset Kesempatan
          </button>
        </div>

        <SocialAuth />

        <p className="mt-6 text-center text-sm text-gray-600">
          Tidak punya akun?{' '}
          <Link href="/unguided/auth/register" className="text-blue-600 hover:text-blue-800 font-semibold pointer-events-auto">
            Daftar
          </Link>
        </p>
      </form>
    </AuthFromWrapper>
  );
};

export default LoginPage;