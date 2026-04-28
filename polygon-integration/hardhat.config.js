// hardhat.config.js — Hardhat configuration for EtherXMeet smart contracts
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Validate PRIVATE_KEY — only use env value if it looks like a 32-byte hex string.
// Falls back to Hardhat account #0 (public test key, zero balance on real networks).
const rawKey = process.env.PRIVATE_KEY || "";
const PRIVATE_KEY = /^(0x)?[0-9a-fA-F]{64}$/.test(rawKey)
  ? (rawKey.startsWith("0x") ? rawKey : "0x" + rawKey)
  : "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const POLYGON_RPC_URL     = process.env.POLYGON_RPC_URL         || "https://rpc-mumbai.maticvigil.com";
const POLYGON_MAINNET_URL = process.env.POLYGON_MAINNET_RPC_URL || "https://polygon-rpc.com";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY     || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      // 200 optimizer runs: moderate deploy cost, low call cost — standard for contracts
      optimizer: { enabled: true, runs: 200 },
    },
  },

  networks: {
    // Local Hardhat node — used for E2E testing (npx hardhat node)
    localhost: {
      url:     "http://127.0.0.1:8545",
      chainId: 31337,
    },
    // Polygon Mumbai testnet (chain ID 80001)
    mumbai: {
      url:      POLYGON_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId:  80001,
    },
    // Polygon Mainnet (chain ID 137)
    polygon: {
      url:      POLYGON_MAINNET_URL,
      accounts: [PRIVATE_KEY],
      chainId:  137,
    },
  },

  etherscan: {
    // Used by `hardhat verify` to publish source code on Polygonscan
    apiKey: {
      polygonMumbai: POLYGONSCAN_API_KEY,
      polygon:       POLYGONSCAN_API_KEY,
    },
  },
};
