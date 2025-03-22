import { Button } from "../components/ui/button";
import Link from "next/link";
import SupabaseStatus from "../components/common/SupabaseStatus";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">SimpleTrust</h1>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">
            Login
          </Button>
          <Button size="sm">
            Sign Up
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Simplify Compliance & Security Management
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            AI-powered platform to identify, implement, and monitor security controls for SMEs in regulated industries.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 md:py-24 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <h3 className="text-2xl md:text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
          Key Features
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 border border-gray-100 dark:border-gray-700 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 flex items-center justify-center rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Unified Control Framework</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Consolidate requirements across multiple regulations into a single framework.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 border border-gray-100 dark:border-gray-700 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 flex items-center justify-center rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">AI-Powered Recommendations</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Get intelligent, actionable tasks based on your specific compliance needs.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 border border-gray-100 dark:border-gray-700 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 flex items-center justify-center rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Continuous Monitoring</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Track compliance status in real-time and get alerts on potential issues.
            </p>
          </div>
        </div>
      </section>

      {/* Development Status */}
      <section className="container mx-auto px-4 py-8 mt-4">
        <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Development Status</h3>
          <SupabaseStatus />
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} SimpleTrust. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Terms
            </Link>
            <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
