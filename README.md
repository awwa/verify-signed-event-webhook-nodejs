Verify Signed Event Webhook
=====================

# 使い方

Signed Event Webhookの検証を行うサンプルアプリケーションです。
HTTP Webフレームワーク `express` 上で動作します。

## Signed Event Webhook Requestsの有効化

SendGridのダッシュボード上で[Mail Settings > Signed Event Webhook Requests](https://app.sendgrid.com/settings/mail_settings)を有効化し、画面に表示されている `Verification Key`
 を確認します。

## サンプルコードの準備

```bash
$ git clone http://github.com/awwa/verify-signed-event-webhook-nodejs.git
$ cd verify-signed-event-webhook-nodejs
$ cp .env.example .env
# .envファイルを編集してください
$ npm install
```

## .envファイルの編集

[Mail Settings > Signed Event Webhook Requests](https://app.sendgrid.com/settings/mail_settings)に表示されている `Verification Key` を `SG_VERIFICATION_KEY` に指定して、.envファイルを保存します。

```bash
SG_VERIFICATION_KEY=sendgrid_verification_key
```
## サンプルアプリケーションの実行

```bash
$ npm start
```

## Event Webhookの設定

SendGridのダッシュボード上で[Mail Settings > Event Webhook](https://app.sendgrid.com/settings/mail_settings)を有効化し、`HTTP Post URL` にサンプルアプリケーションのURLを指定します。[ngrok](https://ngrok.com/)などでトンネリングすると開発環境で手軽に試すことができます。

## 動作確認

SendGridのダッシュボード上の[Mail Settings > Event Webhook](https://app.sendgrid.com/settings/mail_settings)で `Test Your Integration` ボタンを選択してサンプルイベントを送信します。以下のようなログが出力されていたら、検証は成功です。

```
result: true
```

----

# Usage

A sample application that verifies SendGrid Signed Event Webhook.
It runs on HTTP Web framework `express`.

## Enable Signed Event Webhook Requests

Enable [Mail Settings > Signed Event Webhook Requests](https://app.sendgrid.com/settings/mail_settings) on SendGrid dashboard. Copy  `Verification Key` to clip board.

## Build sample application

```bash
$ git clone http://github.com/awwa/verify-signed-event-webhook-nodejs.git
$ cd verify-signed-event-webhook-nodejs
$ cp .env.example .env
# Edit .env file
$ npm install
```

## Edit .env file

Set `Verification Key` which is displayed on [Mail Settings > Signed Event Webhook Requests](https://app.sendgrid.com/settings/mail_settings) to  `SG_VERIFICATION_KEY`. Save .env file.

```bash
SG_VERIFICATION_KEY=sendgrid_verification_key
```
## Run sample application

```bash
$ npm start
```

## Enable Event Webhook

Enable [Mail Settings > Event Webhook](https://app.sendgrid.com/settings/mail_settings) on SendGrid dashboard. Set your sample application URL to `HTTP Post URL`. You can use [ngrok](https://ngrok.com/) for tunneling on development environment.

## Result

Press button `Test Your Integration` on SendGrid dashboard [Mail Settings > Event Webhook](https://app.sendgrid.com/settings/mail_settings) to POST sample events. You can see the log below if the verification process is successful.

```
result: true
```
