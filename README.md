# Tx Payments

This Frame button uses the standard for EVM transactons [EIP681](https://eips.ethereum.org/EIPS/eip-681)

## URL Parameters and Ethereum Scheme

The frame uses the following default parameters if not specified:

```typescript
const defaultParams = {
  recipientAddress: "0x277C0dd35520dB4aaDDB45d4690aB79353D3368b",
  tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913", // USDC on Base
  chainId: 8453, // Base
  amount: 1, // 1 USDC
  baseLogo: "https://avatars.githubusercontent.com/u/108554348?s=280&v=4",
  networkName: "base",
  tokenName: "usdc",
};
```

The frame generates an Ethereum URL scheme following EIP-681 format:

```
ethereum:{tokenAddress}@{chainId}/transfer?address={recipientAddress}&uint256={amountInWei}
```

For example, a 1 USDC transfer would generate:

```
ethereum:0x833589fcd6edb6e08f4c7c32d4f71b54bda02913@8453/transfer?address=0x277C0dd35520dB4aaDDB45d4690aB79353D3368b&uint256=1000000
```

Note: USDC amounts are converted to wei (6 decimal places) before being included in the URL.

## Examples

1. **Basic USDC Payment (Using Defaults)**

```
https://txpay.vercel.app/
```

This uses all default values:

- Recipient: 0xc93B8e62b3c60f6D222491201B92909089A9faD3
- Token: USDC (0x833589fcd6edb6e08f4c7c32d4f71b54bda02913)
- Chain: Base (8453)
- Amount: 1 USDC

2. **Custom Amount**

```
https://txpay.vercel.app/?amount=5
```

Sends 5.5 USDC to the default recipient

3. **Custom Recipient**

```
https://txpay.vercel.app/?recipientAddress=0x742d35Cc6634C0532925a3b844Bc454e4438f44e
```

Sends to a different recipient address

4. **Full Custom Parameters**

```
https://txpay.vercel.app/?recipientAddress=0x742d35Cc6634C0532925a3b844Bc454e4438f44e&tokenAddress=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&chainId=8453&amount=10
```

This example:

- Sets a custom recipient
- Uses USDC token
- Specifies Base chain
- Sets amount to 10 USDC

5. **Different Chain and Token**

```
https://txpay.vercel.app/?chainId=1&tokenAddress=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&amount=2
```

This example:

- Uses Ethereum mainnet (chainId=1)
- Uses Ethereum USDC address
- Sets amount to 2 USDC

You can mix and match any of these parameters as needed. Any parameter not specified will fall back to the default values in the code.
