const ghPages = require('gh-pages')
const path = require('path')

ghPages.publish(path.resolve(__dirname, '../doc-dist'), {
  dotfiles: true
}, err => {
  if (err) {
    console.error('publish fail')
    console.error(err)
    process.exit(1)
  } else {
    console.log('pubish success')
    process.exit(0)
  }
})
