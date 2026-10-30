import { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { Link } from "react-router";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {handleRegister} = useAuth()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

   await  handleRegister(formData)

  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#171512] px-5 py-12 text-[#f4eee5]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 -top-40 h-96 w-96 rounded-full bg-[#d8b99a]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-36 h-[30rem] w-[30rem] rounded-full bg-[#c4a486]/10 blur-3xl"
      />

      <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#211e1a]/90 p-8 shadow-2xl shadow-black/30 sm:p-10">
        <div className="mb-8">
          <Link
            to="/"
            className="text-sm font-semibold tracking-[0.22em] text-[#dec4a9]"
          >
            PERPLEXCITY
          </Link>
          <p className="mt-8 text-sm font-medium text-[#c8aa8d]">JOIN US</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#f4eee5]">
            Create your account
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#a9a198]">
            A little curiosity can take you a long way.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmitForm}>
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-[#e8dfd4]"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              minLength={4}
              maxLength={12}
              pattern="[A-Za-z0-9_]+"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className="w-full rounded-xl border border-white/10 bg-[#171512] px-4 py-3 text-sm text-[#f4eee5] outline-none transition placeholder:text-[#77716a] focus:border-[#c8aa8d] focus:ring-2 focus:ring-[#c8aa8d]/20"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#e8dfd4]"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-[#171512] px-4 py-3 text-sm text-[#f4eee5] outline-none transition placeholder:text-[#77716a] focus:border-[#c8aa8d] focus:ring-2 focus:ring-[#c8aa8d]/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#e8dfd4]"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="w-full rounded-xl border border-white/10 bg-[#171512] px-4 py-3 text-sm text-[#f4eee5] outline-none transition placeholder:text-[#77716a] focus:border-[#c8aa8d] focus:ring-2 focus:ring-[#c8aa8d]/20"
            />
          </div>

          {errorMessage && (
            <p role="alert" className="rounded-lg bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p role="status" className="rounded-lg bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#d8b99a] px-4 py-3.5 text-sm font-semibold text-[#211a14] transition hover:bg-[#e6cbb0] focus:outline-none focus:ring-2 focus:ring-[#e6cbb0] focus:ring-offset-2 focus:ring-offset-[#211e1a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#a9a198]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#dec4a9] transition hover:text-[#f0d7bc]"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
