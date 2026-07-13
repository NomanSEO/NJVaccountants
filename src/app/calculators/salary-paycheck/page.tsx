import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SalaryPaycheckCalculator from "@/components/SalaryPaycheckCalculator";
import Link from "next/link";
export const metadata = {
  title: "Salary Paycheck Calculator 2026 | NJV Accountants",
  description:
    "Estimate US salary paycheck withholding, payroll taxes, and net pay.",
};
export default function SalaryPaycheckPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-navy pt-17.5">
          <div className="max-w-site mx-auto px-6 py-16">
            <Link href="/calculators" className="text-gold">
              ← All Calculators
            </Link>
            <h1 className="font-display mt-6 text-4xl font-bold text-white">
              Salary Paycheck{" "}
              <em className="text-gold not-italic">Calculator</em>
            </h1>
            <p className="mt-4 text-white/70">
              Estimate federal withholding, payroll taxes, and net pay for 2026.
            </p>
          </div>
        </section>
        <section className="bg-cream py-16">
          <div className="max-w-site mx-auto px-6">
            <SalaryPaycheckCalculator />
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="max-w-site mx-auto max-w-3xl px-6">
            <h2 className="font-display text-navy text-3xl font-bold">
              How this Salary Paycheck Calculator works
            </h2>
            <p className="text-slate mt-4">
              The salary paycheck calculator annualizes your income and
              deductions, estimates federal income tax and payroll taxes, then
              divides the estimate across your selected pay periods. State and
              local rates are optional planning estimates.
            </p>
          </div>
        </section>
        <section className="bg-gold py-14">
          <div className="max-w-site mx-auto px-6">
            <Link href="/#contact" className="bg-navy px-6 py-3 text-white">
              Speak to a Partner ›
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
