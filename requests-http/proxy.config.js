const PROXY_CONFIG = [
  { //configuração para o Angular se conectar com o backEnd sem utilizar o cors
    context: ['/api'], //tudo que for /api não vai ser rota, mas sim uma chamada para o backEnd
    target: 'http://localhost:8000',
    secure: false,
    logLevel: 'debug',
    pathRewrite: { '^/api': '' }
  }
]

module.exports = PROXY_CONFIG;


//
