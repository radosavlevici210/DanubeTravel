import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

const projectId = '2c5c6c5c7b4b8d5f6c7b4b8d5f6c7b4b'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

export const RECIPIENT_ADDRESS = '0x557E3d20c04e425D2e534cc296f893204D72d5BA'