import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WalletConnect from "@/components/WalletConnect";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Shield, Zap } from "lucide-react";

export default function Payments() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-danube-50 to-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Crypto Payments
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pay for your Danube adventures using Ethereum. Fast, secure, and borderless payments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Payment Features */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Why Choose Crypto Payments?
            </h2>
            
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-danube-600" />
                    Instant Transactions
                  </CardTitle>
                  <CardDescription>
                    Complete your booking payments in seconds, not days
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-danube-600" />
                    Secure & Transparent
                  </CardTitle>
                  <CardDescription>
                    Blockchain technology ensures your payments are secure and verifiable
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-danube-600" />
                    No Hidden Fees
                  </CardTitle>
                  <CardDescription>
                    Only pay network gas fees - no credit card processing charges
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="bg-danube-50 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-danube-900 mb-2">
                Payment Address
              </h3>
              <p className="text-sm text-danube-700 font-mono break-all">
                0x557E3d20c04e425D2e534cc296f893204D72d5BA
              </p>
              <p className="text-xs text-danube-600 mt-2">
                All payments are sent to this secure Ethereum address
              </p>
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex justify-center lg:justify-start">
            <WalletConnect />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-16 bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            How to Pay with Ethereum
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-danube-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-danube-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Connect Wallet</h3>
              <p className="text-sm text-gray-600">
                Connect your MetaMask or compatible Ethereum wallet
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-danube-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-danube-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Enter Amount</h3>
              <p className="text-sm text-gray-600">
                Specify the amount of ETH you want to send
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-danube-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-danube-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Confirm Payment</h3>
              <p className="text-sm text-gray-600">
                Review and confirm the transaction in your wallet
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}