I'll show you examples of how to use the payment frame with different URL parameters. Here are some practical examples using the pay-frame.vercel.app service:

1. **Basic USDC Payment (Using Defaults)**

```
https://pay-frame.vercel.app/
```

This uses all default values:

- Recipient: 0xc93B8e62b3c60f6D222491201B92909089A9faD3
- Token: USDC (0x833589fcd6edb6e08f4c7c32d4f71b54bda02913)
- Chain: Base (8453)
- Amount: 1 USDC

2. **Custom Amount**

```
https://pay-frame.vercel.app/?amount=5
```

Sends 5.5 USDC to the default recipient

3. **Custom Recipient**

```
https://pay-frame.vercel.app/?recipientAddress=0x742d35Cc6634C0532925a3b844Bc454e4438f44e
```

Sends to a different recipient address

4. **Full Custom Parameters**

```
https://pay-frame.vercel.app/?recipientAddress=0x742d35Cc6634C0532925a3b844Bc454e4438f44e&tokenAddress=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&chainId=8453&amount=10
```

This example:

- Sets a custom recipient
- Uses USDC token
- Specifies Base chain
- Sets amount to 10 USDC

5. **Different Chain and Token**

```
https://pay-frame.vercel.app/?chainId=1&tokenAddress=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&amount=2
```

This example:

- Uses Ethereum mainnet (chainId=1)
- Uses Ethereum USDC address
- Sets amount to 2 USDC

You can mix and match any of these parameters as needed. Any parameter not specified will fall back to the default values in the code.

[Reference: pay-frame.vercel.app](https://pay-frame.vercel.app/)
