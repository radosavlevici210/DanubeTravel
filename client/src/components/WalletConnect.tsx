import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Wallet, Send, Loader2 } from 'lucide-react'
import { RECIPIENT_ADDRESS } from '@/lib/web3-config'

export default function WalletConnect() {
  const [amount, setAmount] = useState('')
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { toast } = useToast()

  const { 
    data: hash, 
    isPending: isSending, 
    sendTransaction 
  } = useSendTransaction()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleSendTransaction = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive"
      })
      return
    }

    try {
      sendTransaction({
        to: RECIPIENT_ADDRESS,
        value: parseEther(amount),
      })
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Failed to send transaction. Please try again.",
        variant: "destructive"
      })
    }
  }

  // Show success message when transaction is confirmed
  if (isConfirmed) {
    toast({
      title: "Transaction Successful",
      description: `Successfully sent ${amount} ETH to ${RECIPIENT_ADDRESS}`,
    })
  }

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </CardTitle>
          <CardDescription>
            Connect your Ethereum wallet to make payments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => connect({ connector })}
              variant="outline"
              className="w-full"
            >
              Connect {connector.name}
            </Button>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Ethereum Payment
        </CardTitle>
        <CardDescription>
          Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            value={RECIPIENT_ADDRESS}
            disabled
            className="font-mono text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (ETH)</Label>
          <Input
            id="amount"
            type="number"
            step="0.001"
            placeholder="0.1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSendTransaction}
            disabled={isSending || isConfirming || !amount}
            className="flex-1"
          >
            {isSending || isConfirming ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isSending ? 'Sending...' : 'Confirming...'}
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send ETH
              </>
            )}
          </Button>
          
          <Button
            onClick={() => disconnect()}
            variant="outline"
          >
            Disconnect
          </Button>
        </div>

        {hash && (
          <div className="text-xs text-muted-foreground break-all">
            Transaction Hash: {hash}
          </div>
        )}
      </CardContent>
    </Card>
  )
}