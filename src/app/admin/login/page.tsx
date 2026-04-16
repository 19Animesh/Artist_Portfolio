import { signIn } from "@/lib/auth";

export const metadata = {
  title: "Admin Login | Artist Portfolio",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050403] px-6">
      <div className="w-full max-w-md bg-[#0c0a09] p-8 rounded-lg border border-[var(--color-gold-900)]">
        <h1 className="text-2xl font-serif text-[var(--color-gold-200)] text-center mb-8 uppercase tracking-widest">
          Admin Portal
        </h1>

        <form
          action={async (formData) => {
            "use server";
            await signIn("credentials", formData);
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Username</label>
            <input
              name="username"
              type="text"
              required
              className="w-full bg-transparent border-b border-[var(--color-gold-900)] py-3 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full bg-transparent border-b border-[var(--color-gold-900)] py-3 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-[var(--color-gold-400)] text-[#000] tracking-widest uppercase text-sm font-semibold hover:bg-[var(--color-gold-300)] transition-colors rounded-md"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
