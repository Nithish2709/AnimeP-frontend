import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "Home": "Home",
                    "Anime": "Anime",
                    "Manga": "Manga",
                    "Login": "Login",
                    "Register": "Register",
                    "Recently Updated Anime": "Recently Updated Anime",
                    "Recently Updated Manga": "Recently Updated Manga",
                    "Latest Episodes": "Latest Episodes",
                    "Popular Manga": "Popular Manga",
                    "Search": "Search...",
                    "Admin Dashboard": "Admin Dashboard",
                    "Logout": "Logout",
                    "Language": "Language",
                    "Logout": "Logout",
                    "Language": "Language",
                    "Episode": "Episode",
                    "Admin Login": "Admin Login"
                }
            },
            hi: {
                translation: {
                    "Home": "होम",
                    "Anime": "एनीमे",
                    "Manga": "मंगा",
                    "Login": "लॉग इन करें",
                    "Register": "रजिस्टर करें",
                    "Recently Updated Anime": "हाल ही में अपडेट किया गया एनीमे",
                    "Recently Updated Manga": "हाल ही में अपडेट किया गया मंगा",
                    "Latest Episodes": "नवीनतम एपिसोड",
                    "Popular Manga": "लोकप्रिय मंगा",
                    "Search": "खोजें...",
                    "Admin Dashboard": "व्यवस्थापक डैशबोर्ड",
                    "Logout": "लॉग आउट",
                    "Language": "भाषा",
                    "Logout": "लॉग आउट",
                    "Language": "भाषा",
                    "Episode": "एपिसोड",
                    "Admin Login": "व्यवस्थापक लॉगिन"
                }
            },
            ta: {
                translation: {
                    "Home": "முகப்பு",
                    "Anime": "அனிம்",
                    "Manga": "மங்கா",
                    "Login": "உள்நுழைய",
                    "Register": "பதிவு செய்யவும்",
                    "Recently Updated Anime": "சமீபத்தில் புதுப்பிக்கப்பட்ட அனிம்",
                    "Recently Updated Manga": "சமீபத்தில் புதுப்பிக்கப்பட்ட மங்கா",
                    "Latest Episodes": "சமீபத்திய அத்தியாயங்கள்",
                    "Popular Manga": "பிரபலமான மங்கா",
                    "Search": "தேடு...",
                    "Admin Dashboard": "நிர்வாக குழு",
                    "Logout": "வெளியேறு",
                    "Language": "மொழி",
                    "Logout": "வெளியேறு",
                    "Language": "மொழி",
                    "Episode": "அத்தியாயம்",
                    "Admin Login": "நிர்வாகி உள்நுழைவு"
                }
            },
            ja: {
                translation: {
                    "Home": "ホーム",
                    "Anime": "アニメ",
                    "Manga": "マンガ",
                    "Login": "ログイン",
                    "Register": "登録",
                    "Recently Updated Anime": "最近更新されたアニメ",
                    "Recently Updated Manga": "最近更新されたマンガ",
                    "Latest Episodes": "最新のエピソード",
                    "Popular Manga": "人気のマンガ",
                    "Search": "検索...",
                    "Admin Dashboard": "管理ダッシュボード",
                    "Logout": "ログアウト",
                    "Language": "言語",
                    "Logout": "ログアウト",
                    "Language": "言語",
                    "Episode": "エピソード",
                    "Admin Login": "管理者ログイン"
                }
            }
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
