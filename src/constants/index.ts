export {default as mocks} from './mocks';
export {THEME as light} from './light';
export {THEME as dark} from './dark';

export const APP_ID='IMPRINT_IDENT';

/**
 * Indicates no existing account
 */
export const NO_ACTIVE_WALLET=0;

/**
 * The number of phrase words to confirm in the mnemonic
 */
export const NUM_WORDS_TO_CONFIRM=6;

/**
 * Index of the last phrase in a 24-word phrase
 */
export const LAST_PHRASE_INDEX=23;

/**
 * The number of word phrases in a mnemonic
 */
export const MNEMONIC_PHRASE_LENGTH=24;

/**
 * Hedera Shard and Realm numbers
 */
export const SHARD_NUM=0;
export const REALM_NUM=0;

/**
 * Environment constant while debugging. This will be removed in Production
 * TODO: Delete this in Production
 */
export const ENVIRONMENT="Development";