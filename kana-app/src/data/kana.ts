// data/kana.ts
export interface Kana {
    hiragana: string;
    katakana: string;
    romanji: string;
    row: string;
}

export const kanaData: Kana[] = [
// Ligne a
    { hiragana: 'あ', katakana: 'ア', romanji: 'a', row: 'a' },
    { hiragana: 'い', katakana: 'イ', romanji: 'i', row: 'a' },
    { hiragana: 'う', katakana: 'ウ', romanji: 'u', row: 'a' },
    { hiragana: 'え', katakana: 'エ', romanji: 'e', row: 'a' },
    { hiragana: 'お', katakana: 'オ', romanji: 'o', row: 'a' },

// Ligne ka
    { hiragana: 'か', katakana: 'カ', romanji: 'ka', row: 'ka' },
    { hiragana: 'き', katakana: 'キ', romanji: 'ki', row: 'ka' },
    { hiragana: 'く', katakana: 'ク', romanji: 'ku', row: 'ka' },
    { hiragana: 'け', katakana: 'ケ', romanji: 'ke', row: 'ka' },
    { hiragana: 'こ', katakana: 'コ', romanji: 'ko', row: 'ka' },

// Ligne sa
    { hiragana: 'さ', katakana: 'サ', romanji: 'sa', row: 'sa' },
    { hiragana: 'し', katakana: 'シ', romanji: 'shi', row: 'sa' },
    { hiragana: 'す', katakana: 'ス', romanji: 'su', row: 'sa' },
    { hiragana: 'せ', katakana: 'セ', romanji: 'se', row: 'sa' },
    { hiragana: 'そ', katakana: 'ソ', romanji: 'so', row: 'sa' },

// Ligne ta
    { hiragana: 'た', katakana: 'タ', romanji: 'ta', row: 'ta' },
    { hiragana: 'ち', katakana: 'チ', romanji: 'chi', row: 'ta' },
    { hiragana: 'つ', katakana: 'ツ', romanji: 'tsu', row: 'ta' },
    { hiragana: 'て', katakana: 'テ', romanji: 'te', row: 'ta' },
    { hiragana: 'と', katakana: 'ト', romanji: 'to', row: 'ta' },

// Ligne na
    { hiragana: 'な', katakana: 'ナ', romanji: 'na', row: 'na' },
    { hiragana: 'に', katakana: 'ニ', romanji: 'ni', row: 'na' },
    { hiragana: 'ぬ', katakana: 'ヌ', romanji: 'nu', row: 'na' },
    { hiragana: 'ね', katakana: 'ネ', romanji: 'ne', row: 'na' },
    { hiragana: 'の', katakana: 'ノ', romanji: 'no', row: 'na' },

// Ligne ha
    { hiragana: 'は', katakana: 'ハ', romanji: 'ha', row: 'ha' },
    { hiragana: 'ひ', katakana: 'ヒ', romanji: 'hi', row: 'ha' },
    { hiragana: 'ふ', katakana: 'フ', romanji: 'fu', row: 'ha' },
    { hiragana: 'へ', katakana: 'ヘ', romanji: 'he', row: 'ha' },
    { hiragana: 'ほ', katakana: 'ホ', romanji: 'ho', row: 'ha' },

// Ligne ma
    { hiragana: 'ま', katakana: 'マ', romanji: 'ma', row: 'ma' },
    { hiragana: 'み', katakana: 'ミ', romanji: 'mi', row: 'ma' },
    { hiragana: 'む', katakana: 'ム', romanji: 'mu', row: 'ma' },
    { hiragana: 'め', katakana: 'メ', romanji: 'me', row: 'ma' },
    { hiragana: 'も', katakana: 'モ', romanji: 'mo', row: 'ma' },

// Ligne ya
    { hiragana: 'や', katakana: 'ヤ', romanji: 'ya', row: 'ya' },
    { hiragana: 'ゆ', katakana: 'ユ', romanji: 'yu', row: 'ya' },
    { hiragana: 'よ', katakana: 'ヨ', romanji: 'yo', row: 'ya' },

// Ligne ra
    { hiragana: 'ら', katakana: 'ラ', romanji: 'ra', row: 'ra' },
    { hiragana: 'り', katakana: 'リ', romanji: 'ri', row: 'ra' },
    { hiragana: 'る', katakana: 'ル', romanji: 'ru', row: 'ra' },
    { hiragana: 'れ', katakana: 'レ', romanji: 're', row: 'ra' },
    { hiragana: 'ろ', katakana: 'ロ', romanji: 'ro', row: 'ra' },

// Ligne wa
    { hiragana: 'わ', katakana: 'ワ', romanji: 'wa', row: 'wa' },
    { hiragana: 'を', katakana: 'ヲ', romanji: 'wo', row: 'wa' },

// n
    { hiragana: 'ん', katakana: 'ン', romanji: 'n', row: 'n' },

// Ligne ga (dakuten)
    { hiragana: 'が', katakana: 'ガ', romanji: 'ga', row: 'ga' },
    { hiragana: 'ぎ', katakana: 'ギ', romanji: 'gi', row: 'ga' },
    { hiragana: 'ぐ', katakana: 'グ', romanji: 'gu', row: 'ga' },
    { hiragana: 'げ', katakana: 'ゲ', romanji: 'ge', row: 'ga' },
    { hiragana: 'ご', katakana: 'ゴ', romanji: 'go', row: 'ga' },

// Ligne za (dakuten)
    { hiragana: 'ざ', katakana: 'ザ', romanji: 'za', row: 'za' },
    { hiragana: 'じ', katakana: 'ジ', romanji: 'ji', row: 'za' },
    { hiragana: 'ず', katakana: 'ズ', romanji: 'zu', row: 'za' },
    { hiragana: 'ぜ', katakana: 'ゼ', romanji: 'ze', row: 'za' },
    { hiragana: 'ぞ', katakana: 'ゾ', romanji: 'zo', row: 'za' },

// Ligne da (dakuten)
    { hiragana: 'だ', katakana: 'ダ', romanji: 'da', row: 'da' },
    { hiragana: 'ぢ', katakana: 'ヂ', romanji: 'ji', row: 'da' },
    { hiragana: 'づ', katakana: 'ヅ', romanji: 'zu', row: 'da' },
    { hiragana: 'で', katakana: 'デ', romanji: 'de', row: 'da' },
    { hiragana: 'ど', katakana: 'ド', romanji: 'do', row: 'da' },

// Ligne ba (dakuten)
    { hiragana: 'ば', katakana: 'バ', romanji: 'ba', row: 'ba' },
    { hiragana: 'び', katakana: 'ビ', romanji: 'bi', row: 'ba' },
    { hiragana: 'ぶ', katakana: 'ブ', romanji: 'bu', row: 'ba' },
    { hiragana: 'べ', katakana: 'ベ', romanji: 'be', row: 'ba' },
    { hiragana: 'ぼ', katakana: 'ボ', romanji: 'bo', row: 'ba' },

// Ligne pa (handakuten)
    { hiragana: 'ぱ', katakana: 'パ', romanji: 'pa', row: 'pa' },
    { hiragana: 'ぴ', katakana: 'ピ', romanji: 'pi', row: 'pa' },
    { hiragana: 'ぷ', katakana: 'プ', romanji: 'pu', row: 'pa' },
    { hiragana: 'ぺ', katakana: 'ペ', romanji: 'pe', row: 'pa' },
    { hiragana: 'ぽ', katakana: 'ポ', romanji: 'po', row: 'pa' },
];