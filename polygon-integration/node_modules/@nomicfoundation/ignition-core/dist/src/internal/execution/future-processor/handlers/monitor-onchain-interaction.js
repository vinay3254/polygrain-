"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitorOnchainInteraction = void 0;
const debug_1 = __importDefault(require("debug"));
const errors_1 = require("../../../../errors");
const errors_list_1 = require("../../../errors-list");
const assertions_1 = require("../../../utils/assertions");
const messages_1 = require("../../types/messages");
const network_interaction_1 = require("../../types/network-interaction");
const debug = (0, debug_1.default)("hardhat-ignition:onchain-interaction-monitor");
/**
 * Checks the transactions of the latest network interaction of the execution state,
 * and returns a message, or undefined if we need to wait for more confirmations.
 *
 * This method can return messages indicating that a transaction has enough confirmations,
 * that we need to bump the fees, or that the execution of this onchain interaction has
 * timed out.
 *
 * If all of the transactions of the latest network interaction have been dropped, this
 * method throws an IgnitionError.
 *
 * SIDE EFFECTS: This function doesn't have any side effects.
 *
 * @param params.exState The execution state that requires the transactions to be checked.
 * @param params.jsonRpcClient The JSON RPC client to use for accessing the network.
 * @param params.transactionTrackingTimer The TransactionTrackingTimer to use for checking the
 *  if a transaction has been pending for too long.
 * @param params.requiredConfirmations The number of confirmations required for a transaction
 *  to be considered confirmed.
 * @param params.millisecondBeforeBumpingFees The number of milliseconds before bumping the fees
 *  of a transaction.
 * @param params.maxFeeBumps The maximum number of times we can bump the fees of a transaction
 *  before considering the onchain interaction timed out.
 * @param params.disableFeeBumping Disables fee bumping for all transactions.
 * @param params.maxRetries The maximum number of times to retry fetching a transaction from the mempool.
 * @param params.retryInterval The number of milliseconds to wait between retries when fetching
 *  a transaction from the mempool.
 * @returns A message indicating the result of checking the transactions of the latest
 *  network interaction.
 */
async function monitorOnchainInteraction(params) {
    const lastNetworkInteraction = params.exState.networkInteractions.at(-1);
    (0, assertions_1.assertIgnitionInvariant)(lastNetworkInteraction !== undefined, `No network interaction for ExecutionState ${params.exState.id} when trying to check its transactions`);
    (0, assertions_1.assertIgnitionInvariant)(lastNetworkInteraction.type === network_interaction_1.NetworkInteractionType.ONCHAIN_INTERACTION, `StaticCall found as last network interaction of ExecutionState ${params.exState.id} when trying to check its transactions`);
    (0, assertions_1.assertIgnitionInvariant)(lastNetworkInteraction.transactions.length > 0, `No transaction found in OnchainInteraction ${params.exState.id}/${lastNetworkInteraction.id} when trying to check its transactions`);
    const transaction = await _getTransactionWithRetry({
        jsonRpcClient: params.jsonRpcClient,
        onchainInteraction: lastNetworkInteraction,
        futureId: params.exState.id,
        maxRetries: params.maxRetries,
        retryInterval: params.retryInterval,
    });
    // We do not try to recover from dropped transactions mid-execution
    if (transaction === undefined) {
        throw new errors_1.IgnitionError(errors_list_1.ERRORS.EXECUTION.DROPPED_TRANSACTION, {
            futureId: params.exState.id,
            networkInteractionId: lastNetworkInteraction.id,
        });
    }
    const [block, receipt] = await Promise.all([
        params.jsonRpcClient.getLatestBlock(),
        params.jsonRpcClient.getTransactionReceipt(transaction.hash),
    ]);
    if (receipt !== undefined) {
        // There's a slight race condition here that we won't check.
        //
        // We should be checking that the receipt's block hash is still part
        // of the chain, as it could have been reorged out.
        //
        // As we intend to use this with requiredConfirmations with
        // values that are high enough to avoid reorgs, we don't do it.
        const confirmations = block.number - receipt.blockNumber + 1;
        if (confirmations >= params.requiredConfirmations) {
            return {
                type: messages_1.JournalMessageType.TRANSACTION_CONFIRM,
                futureId: params.exState.id,
                networkInteractionId: lastNetworkInteraction.id,
                hash: transaction.hash,
                receipt,
            };
        }
        return undefined;
    }
    const timeTrackingTx = params.transactionTrackingTimer.getTransactionTrackingTime(transaction.hash);
    if (timeTrackingTx < params.millisecondBeforeBumpingFees) {
        return undefined;
    }
    if (params.disableFeeBumping ||
        lastNetworkInteraction.transactions.length > params.maxFeeBumps) {
        return {
            type: messages_1.JournalMessageType.ONCHAIN_INTERACTION_TIMEOUT,
            futureId: params.exState.id,
            networkInteractionId: lastNetworkInteraction.id,
        };
    }
    return {
        type: messages_1.JournalMessageType.ONCHAIN_INTERACTION_BUMP_FEES,
        futureId: params.exState.id,
        networkInteractionId: lastNetworkInteraction.id,
    };
}
exports.monitorOnchainInteraction = monitorOnchainInteraction;
async function _getTransactionWithRetry(params) {
    let transaction;
    // Small retry loop for up to X seconds to handle blockchain nodes
    // that are slow to propagate transactions.
    // See https://github.com/NomicFoundation/hardhat-ignition/issues/665
    for (let i = 0; i < params.maxRetries; i++) {
        debug(`Retrieving transaction for interaction ${params.futureId}/${params.onchainInteraction.id} from mempool (attempt ${i + 1}/${params.maxRetries})`);
        const transactions = await Promise.all(params.onchainInteraction.transactions.map((tx) => params.jsonRpcClient.getTransaction(tx.hash)));
        transaction = transactions.find((tx) => tx !== undefined);
        if (transaction !== undefined) {
            break;
        }
        debug(`Transaction lookup for ${params.futureId}/${params.onchainInteraction.id} not found in mempool, waiting ${params.retryInterval} seconds before retrying`);
        await new Promise((resolve) => setTimeout(resolve, params.retryInterval));
    }
    return transaction;
}
//# sourceMappingURL=monitor-onchain-interaction.js.map