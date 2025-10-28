import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    // Ignore build artifacts, dependencies, and this config file itself
    { ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'eslint.config.js'] },

    // Base JS recommended rules
    js.configs.recommended,

    // TypeScript recommended + stylistic (type-checked) scoped to TS files
    {
        files: ['**/*.ts']
    },
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                allowDefaultProject: [
                    'vite.config.ts'
                ],
            },
        },
        rules: {
            'no-console': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-undef': 'off',
        },
    }
);


