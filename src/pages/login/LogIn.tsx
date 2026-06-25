import React from "react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import logoSvg from "../../assets/images/logo.svg";
import signInImage from "../../assets/images/pablo-sign-in-1.svg";
import s from "./Login.module.scss";

export const LogIn = (): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    login();
  };

  return (
    <main className={s.page}>
      <div className={s.left} aria-hidden="true">
        <img src={logoSvg} alt="" className={s.logo} />
        <div className={s.illustration}>
          <img src={signInImage} alt="" />
        </div>
      </div>

      <div className={s.right}>
        <form
          className={s.form}
          onSubmit={handleSubmit}
          noValidate
          aria-label="Login form"
        >
          <img
            src={logoSvg}
            alt="Lendsqr"
            className={s.mobileLogo}
          />

          <h1 className={s.title}>Welcome!</h1>
          <p className={s.subtitle}>Enter details to login.</p>

          <div className={s.fields}>
            <div className={s.field}>
              <label htmlFor="login-email" className="sr-only">Email address</label>
              <input
                id="login-email"
                type="email"
                placeholder="Email"
                value={email}
                autoComplete="email"
                data-testid="input-email"
                aria-required="true"
                aria-invalid={!!error && !email.trim()}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
              />
            </div>

            <div className={s.field}>
              <label htmlFor="login-password" className="sr-only">Password</label>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                autoComplete="current-password"
                data-testid="input-password"
                aria-required="true"
                aria-invalid={!!error && !password.trim()}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
              />
              <button
                type="button"
                className={s.showBtn}
                data-testid="button-toggle-password"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-controls="login-password"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          {error && (
            <p className={s.error} role="alert" aria-live="assertive">
              {error}
            </p>
          )}

          <button
            type="button"
            className={s.forgotBtn}
            data-testid="button-forgot-password"
          >
            FORGOT PASSWORD?
          </button>

          <button
            type="submit"
            disabled={loading}
            className={s.submitBtn}
            data-testid="button-login"
          >
            {loading ? "Logging in..." : "LOG IN"}
          </button>
        </form>
      </div>
    </main>
  );
};
