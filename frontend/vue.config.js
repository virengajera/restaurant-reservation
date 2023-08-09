const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true

})

/*   configureWebpack: {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, vueSrc),
            '@modules': path.resolve(__dirname, vueSrc + 'store/modules')
        },
        extensions: ['.js', '.vue', '.json']
    }
} */
