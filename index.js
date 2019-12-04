'use strict'
const http = require('http')
const pug = require('pug')
const server = http.createServer((req, res) => {
  const now = new Date()
  console.info(`[${now}] requested by ${req.connection.remoteAddress}`)
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  })
  // res.write(req.headers['user-agent'])
  switch (req.method) {
    case 'GET':
      // リクエストurlに応じてレスポンス値の選択
      if (req.url === '/enquests/yaki-shabu') {
        res.write(pug.renderFile('./index.pug', { //第二引数にpugに渡す値をオブジェクトとして設定
          path: req.url,
          firstItem: '焼肉',
          secondItem: "しゃぶしゃぶ"
        }))
      } else if (req.url === '/enquests/rice-bread') {
        res.write(pug.renderFile('./index.pug', { //第二引数にpugに渡す値をオブジェクトとして設定
          path: req.url,
          firstItem: 'ごはん',
          secondItem: "パン"
        }))
      } else if (req.url === '/enquests/sushi-piza') {
        res.write(pug.renderFile('./index.pug', {
          path: req.url,
          firstItem: '寿司',
          secondItem: 'ピザ'
        }))
      }
      res.end()
      break;
    case 'POST':
      res.write(`POST ${req.url}`) // req.urlにaction属性で指定した文字列が入る
      let rawData = ''
      req.on('data', chunk => {
        rawData = rawData + chunk
      }).on('end', () => {
        // console.log(`[${now}] Data posted: ${rawData}`)
        // POST通信で送信された値を受け取ってhtmlとして表示
        const decoded = decodeURIComponent(rawData)
        console.info(`[${now}] 投稿: ${decoded}`)
        res.write(`<!DOCTYPE html><html lang="ja"><body><h1>${decoded}が投稿されました</h1></body></html>`)
        res.end()
      })
      break;
    default:
      break;
  }
  // res.end() POSTメソッドのときのみ
}).on('error', e => {
  console.error(`${now} Server Error`, e)
}).on('clientError', e => {
  console.error(`${now} Client Error`, e)
})

const port = 8000
server.listen(port, () => {
  console.log(`${new Date()} Listening on ${port}`)
})