/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode : 'class',
  content: [
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      spacing : {
        "15" : "3.7rem"
      },
      fontFamily : {
        "inter" : 'Inter'
      },
      colors : {
        "biru" : "#5B67F1",
        "biru-hover" : "#3442e3",
        "biru-dark" : "#00163B",
        "biru-tua" : "#002A66",
        "kuning-hitam" : "#F6AC4D",
        "kuning-hitam-hover" : "#e09e48",
        "abu-abu" : "#767676",
        "sal" : "#F15B5B",
        "sal-hover" : "#c74c4c",
        "abu-trans" : "#858181"
      },
      boxShadow : {
        'cari' : "0px 0px 4px 1px rgba(0,0,0,0.3)",
        'cari-fokus' : "0px 0px 6px 1px rgba(0,0,0,0.5)",
        'kunjungan' : "1px 1px 4px 0px rgba(0,0,0,0.3)",
        "kunjungan-hover" : "0px 0px 5px 1px rgba(0,0,0,0.3)",
        "popup" : "0px 0px 2px 0px rgba(255,255,255,0.8)"
      },
      animation : {
        'authMuncul' : 'tampilPerlahan .7s ease-in .7s forwards',
        'iconBerputar' : 'putar 1s linear infinite'
      },
      keyframes : {
        'tampilPerlahan' : {
          '0%' : { opacity : '0'},
          '100%' : {opacity : '1'}
        },
        'putar' : {
          '0%' : {transform : "rotate(0deg)"},
          '100%' : {transform : "rotate(360deg)"}
        }
      }
    },
  },
  plugins: [],
}
