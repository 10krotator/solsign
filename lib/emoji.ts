import { PublicKey } from '@solana/web3.js';

const emojiList = [
  '🚀',
  '🤠',
  '😇',
  '🤩',
  '🌟',
  '⭐',
  '🌙',
  '🌈',
  '⚡️',
  '🔥',
  '🌊',
  '🎈',
  '🎉',
  '🎁',
  '🏆',
  '📚',
  '💻',
  '📱',
  '🖥️',
  '📷',
  '🔍',
  '🚀',
  '🚗',
  '⚓',
  '🗺️',
  '⚽',
  '🏀',
  '🏈',
  '⚾',
  '🎾',
  '🏐',
  '🎸',
  '🎹',
  '🎺',
  '🥁',
  '🍎',
  '🍋',
  '🍌',
  '🍉',
  '🍇',
  '🥑',
  '🍕',
  '🍔',
  '🌮',
  '🍣',
  '🍜',
  '🐶',
  '🐱',
  '🐭',
  '🦊',
  '🐻',
  '🐼',
  '🦁',
  '🦒',
  '🐘',
  '🦜',
  '🐬',
  '🏔️',
  '🌋',
  '🏖️',
  '🌴',
  '🏞️',
  '🏙️',
  '🧲',
  '🧭',
  '🧩',
  '🍕',
  '🎭',
  '🎨',
  '🛸',
  '🎢',
  '🚁',
  '🚤',
  '🛶',
  '🧬',
  '🔬',
  '🧪',
  '🧫',
  '📡',
  '🔧',
  '🍔',
  '🍟',
  '🍗',
  '🍖',
  '🍤',
  '🍳',
];

export function publicKeyToEmoji(publicKey: string | PublicKey): string {
  let key: string;

  if (typeof publicKey === 'string') {
    key = publicKey;
  } else if (publicKey instanceof PublicKey) {
    key = publicKey.toBase58();
  } else {
    throw new Error('Invalid public key format');
  }

  // Use the first 4 bytes (8 characters) of the base58 encoded public key
  const seed = key.slice(0, 8);

  // Convert the seed to a number
  let seedNumber = 0;
  for (let i = 0; i < seed.length; i += 1) {
    seedNumber += seed.charCodeAt(i);
  }

  // Use the seedNumber to deterministically select an emoji
  const emojiIndex = seedNumber % emojiList.length;

  return emojiList[emojiIndex];
}


const pubKey2 = 'EGNPfLtNe4WAcAQpnNwmehmEANCgj7FnqLUHfT54eVgV';
console.log(publicKeyToEmoji(pubKey2)); // Output will be the same emoji as above
