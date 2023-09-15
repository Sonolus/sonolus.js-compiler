module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'prettier',
    ],
    rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/no-unnecessary-condition': [
            'error',
            {
                allowConstantLoopConditions: true,
            },
        ],
        'no-constant-condition': [
            'error',
            {
                checkLoops: false,
            },
        ],
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    Function: false,
                    '{}': false,
                },
                extendDefaults: true,
            },
        ],
        '@typescript-eslint/dot-notation': [
            'error',
            {
                allowPrivateClassPropertyAccess: true,
            },
        ],
        '@typescript-eslint/unbound-method': 'off',
    },
}
