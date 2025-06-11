// app.config.js
export default {
  name: "SilentHelp",
  slug: "silenthelp",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  android: {
    package: "com.bobbysyakir.silenthelp"
  },
  ios: {
    bundleIdentifier: "com.bobbysyakir.silenthelp"
  }
}
