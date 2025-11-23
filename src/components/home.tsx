import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Lock, TrendingUp, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function Home() {
  const navigate = useNavigate();
  const [logoError, setLogoError] = useState(false);
  const [boaLogoError, setBoaLogoError] = useState(false);
  const [newLogoError, setNewLogoError] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <div className="w-full bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <a href="https://gettrumpmemes.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                {!logoError ? (
                  <img 
                    src="https://cust-aff-login.onrender.com/static/images/beloLogo-removebg-preview.png" 
                    alt="TrumpFinance Logo"
                    className="h-6 sm:h-8 w-auto"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="h-6 sm:h-8 w-6 sm:w-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xs sm:text-sm">TF</div>
                )}
              </a>
              <span className="font-bold text-base sm:text-xl text-white whitespace-nowrap">TrumpFinance</span>
            </div>
            <div className="hidden md:flex items-center gap-3 lg:gap-4 pl-3 lg:pl-4 border-l border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs lg:text-sm whitespace-nowrap">Powered by</span>
                <a href="https://www.bankofamerica.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  {!boaLogoError ? (
                    <img 
                      src="https://cust-aff-login.onrender.com/static/images/soPozadinaBankOfAmerica-removebg-preview.png" 
                      alt="Bank of America"
                      className="h-8 lg:h-10 w-auto"
                      onError={() => setBoaLogoError(true)}
                    />
                  ) : (
                    <span className="text-gray-300 text-xs lg:text-sm font-semibold">Bank of America</span>
                  )}
                </a>
              </div>
              <div className="flex items-center gap-2 pl-3 lg:pl-4 border-l border-gray-700">
                <a href="https://gettrumpmemes.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  {!newLogoError ? (
                    <img 
                      src="https://i.imgur.com/AOVLAFU.png" 
                      alt="Partner Logo"
                      className="h-5 lg:h-6 w-auto"
                      onError={() => setNewLogoError(true)}
                    />
                  ) : (
                    <div className="h-5 lg:h-6 w-5 lg:w-6 bg-gray-600 rounded"></div>
                  )}
                </a>
              </div>
            </div>
          </div>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 flex-shrink-0"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-3 sm:px-4 lg:px-8 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://i.imgur.com/8Q4WQo0.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-red-700/80"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
              Welcome to TrumpFinance
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-red-100 mb-6 sm:mb-8 font-semibold tracking-wide px-2">
              UNITE WITH US TO MAKE HISTORY
            </p>
            <button
              onClick={() => navigate("/login")}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-8 sm:mb-12 max-w-2xl mx-auto block cursor-pointer hover:text-yellow-300 transition-all duration-300 hover:scale-105 transform hover:drop-shadow-[0_0_15px_rgba(253,224,71,0.5)] underline decoration-2 underline-offset-8 decoration-yellow-300 px-4"
            >
              Login to Claim Your Rewards
            </button>
            <p className="text-sm sm:text-base text-gray-200 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              Connect your account to view and withdraw your available $TRUMP rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
                onClick={() => navigate("/login")}
              >
                Member Login <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Why Choose TrumpFinance?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              Premium financial services built on trust and security
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 sm:p-8 rounded-lg border border-blue-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Your Financial Goals Matter
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                We're committed to helping you achieve your financial dreams with personalized solutions and expert guidance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 sm:p-8 rounded-lg border border-red-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Secure Banking: Protect Your Money
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Military-grade encryption and multi-layer security protocols ensure your funds are always protected.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 sm:p-8 rounded-lg border border-blue-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                24/7 Access to Your Funds
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Bank anytime, anywhere. Our platform is always available when you need it, day or night.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 sm:p-8 rounded-lg border border-red-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Your Money, Your Control
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Complete transparency and control over your accounts. You decide how your money is managed.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 sm:p-8 rounded-lg border border-blue-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Deposit with Confidence
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                FDIC insured deposits and industry-leading security standards give you peace of mind.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 sm:p-8 rounded-lg border border-red-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Fast & Easy Setup
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Get started in minutes with our streamlined onboarding process. No complicated paperwork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 lg:px-8 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              Trusted by Millions
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 px-4">
              Industry-leading security and compliance standards
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-white/20 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">$500B+</div>
              <p className="text-sm sm:text-base text-blue-100">Assets Under Management</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-white/20 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">99.99%</div>
              <p className="text-sm sm:text-base text-blue-100">Uptime Guarantee</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-white/20 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">24/7</div>
              <p className="text-sm sm:text-base text-blue-100">Customer Support</p>
            </div>
          </div>

          <div>
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <p className="text-xl sm:text-2xl font-bold text-white mb-2 px-2">In Partnership With</p>
              <p className="text-sm sm:text-base text-blue-200 px-4">Backed by industry leaders in security and compliance</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/30 p-6 sm:p-8 md:p-10 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {/* Bank of America */}
                <a 
                  href="https://www.bankofamerica.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="bg-white rounded-xl p-6 sm:p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-400">
                    {!boaLogoError ? (
                      <img 
                        src="https://cust-aff-login.onrender.com/static/images/soPozadinaBankOfAmerica-removebg-preview.png" 
                        alt="Bank of America"
                        className="h-12 sm:h-16 w-auto mx-auto mb-3 sm:mb-4"
                        onError={() => setBoaLogoError(true)}
                      />
                    ) : (
                      <div className="h-12 sm:h-16 flex items-center justify-center mb-3 sm:mb-4">
                        <span className="text-xl sm:text-2xl font-bold text-gray-800">Bank of America</span>
                      </div>
                    )}
                    <div className="space-y-1 sm:space-y-2">
                      <p className="text-xs sm:text-sm font-bold text-gray-900">Bank of America</p>
                      <p className="text-xs text-gray-600">Trusted Banking Partner</p>
                    </div>
                    <div className="mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-blue-600 font-semibold">Learn More →</span>
                    </div>
                  </div>
                </a>

                {/* FDIC Insured */}
                <div className="group">
                  <div className="bg-white rounded-xl p-6 sm:p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-green-400">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <p className="text-xs sm:text-sm font-bold text-gray-900">FDIC Insured</p>
                      <p className="text-xs text-gray-600">Up to $250,000 Coverage</p>
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <span className="inline-block px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        ✓ Protected
                      </span>
                    </div>
                  </div>
                </div>

                {/* ISO 27001 Certified */}
                <div className="group sm:col-span-2 lg:col-span-1">
                  <div className="bg-white rounded-xl p-6 sm:p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-purple-400">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <p className="text-xs sm:text-sm font-bold text-gray-900">ISO 27001 Certified</p>
                      <p className="text-xs text-gray-600">Information Security Standard</p>
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <span className="inline-block px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                        ✓ Certified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 sm:py-12 md:py-16 px-3 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <img 
                  src="https://cust-aff-login.onrender.com/static/images/beloLogo-removebg-preview.png" 
                  alt="TrumpFinance Logo"
                  className="h-8 sm:h-10 w-auto"
                />
                <span className="font-bold text-white text-sm sm:text-base">TrumpFinance</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">
                Secure banking for Americans who demand excellence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                    className="hover:text-white transition text-left"
                  >
                    About Us
                  </button>
                </li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <button 
                    onClick={() => setPrivacyOpen(true)} 
                    className="hover:text-white transition text-left"
                  >
                    Privacy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setTermsOpen(true)} 
                    className="hover:text-white transition text-left"
                  >
                    Terms
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                © 2024 TrumpFinance. All rights reserved.
              </p>
              <div className="flex gap-4 sm:gap-6">
                <a href="https://www.facebook.com/DonaldTrump" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-xs sm:text-sm">Facebook</a>
                <a href="https://twitter.com/realDonaldTrump" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-xs sm:text-sm">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Dialog */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Privacy Policy</DialogTitle>
            <DialogDescription className="text-base">
              Last updated: January 2024
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-700">
            <section>
              <h3 className="font-semibold text-lg mb-2">1. Information We Collect</h3>
              <p>We collect information you provide directly to us, including your name, email address, wallet information, and transaction data when you use our services.</p>
            </section>
            <section>
              <h3 className="font-semibold text-lg mb-2">2. How We Use Your Information</h3>
              <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.</p>
            </section>
            <section>
              <h3 className="font-semibold text-lg mb-2">3. Information Sharing</h3>
              <p>We do not share your personal information with third parties except as described in this policy. We may share information with service providers who perform services on our behalf.</p>
            </section>
            <section>
              <h3 className="font-semibold text-lg mb-2">4. Security</h3>
              <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
            </section>
            <section>
              <h3 className="font-semibold text-lg mb-2">5. Your Rights</h3>
              <p>You have the right to access, update, or delete your personal information at any time. Contact us if you wish to exercise these rights.</p>
            </section>
            <section>
              <h3 className="font-semibold text-lg mb-2">6. Contact Us</h3>
              <p>If you have any questions about this Privacy Policy, please contact us at privacy@tfinance.com</p>
            </section>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Dialog */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Terms of Service</DialogTitle>
            <DialogDescription className="text-base">
              Last updated: January 2024
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-700">
            <section>
              <h3 className="font-semibold text-lg mb-2">1. Acceptance of Terms</h3>
              <p>By accessing and using TrumpFinance services, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>
            <section>
              <h3 className="font-semibold text-lg mb-2">2. Use of Services</h3>
              <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account credentials.</p>
            </section>
            <section>
              <h3 className="font-semibold text-lg mb-2">3. Account Requirements</h3>
              <p>To use certain features of our services, you must register for an account. You must provide accurate and complete information and keep your account information updated.</p>
            </section>
            <section>
              <h3 className="font-semibold text-lg mb-2">4. Trading Volume Requirements</h3>
              <p>Certain rewards and benefits require a minimum trading volume of $3,000. We reserve the right to verify trading activity before processing reward claims.</p>
            </section>
            <section>
              <h3 className="font-semibold text-lg mb-2">5. Wallet Connection</h3>
              <p>By connecting your wallet, you authorize us to access your wallet information for the purpose of processing transactions and rewards. You are responsible for the security of your wallet credentials.</p>
            </section>
            <section>
              <h3 className="font-semibold text-lg mb-2">6. Limitation of Liability</h3>
              <p>TrumpFinance shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
            </section>
            <section>
              <h3 className="font-semibold text-lg mb-2">7. Changes to Terms</h3>
              <p>We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform.</p>
            </section>
            <section>
              <h3 className="font-semibold text-lg mb-2">8. Contact Information</h3>
              <p>For questions about these Terms, please contact us at legal@tfinance.com</p>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Home;