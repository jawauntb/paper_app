import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

function TradingViewWidget() {
  const tradingViewHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      <div class="tradingview-widget-container">
        <div id="tradingview_advanced_chart"></div>
        <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js">
        {
          "autosize": true,
          "symbol": "NASDAQ:NVDA",
          "interval": "W",
          "timezone": "America/New_York",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "gridColor": "rgba(152, 152, 152, 0.06)",
          "allow_symbol_change": true,
          "calendar": false,
          "studies": [
            "STD;Linear_Regression",
            "STD;RSI"
          ],
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "700",
          "support_host": "https://www.tradingview.com"
        }
        </script>
      </div>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: tradingViewHTML }}
        style={styles.webView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  webView: {
    height: '100%',
    width: '100%',
  },
});

export default memo(TradingViewWidget);