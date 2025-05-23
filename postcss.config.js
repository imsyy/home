module.exports = {
    plugins: {
        'postcss-preset-env': {
            stage: 3,
            features: {
                'nesting-rules': true
            },
        },
        'autoprefixer': {
            // overrideBrowserslist: [
            //     '> 1%',
            //     'last 2 versions',
            //     'not dead',
            //     'Chrome >= 60',
            //     'Firefox >= 60',
            //     'iOS >= 12',
            //     'Safari >= 12'
            // ],
        },
        'cssnano': {
            preset: 'default'
        },
    },
}