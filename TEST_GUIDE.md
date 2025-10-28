# Testing Guide

This project uses **Vitest** for unit and integration testing with TypeScript support.

## Setup

Testing is already configured in the project. No additional setup is needed.

## Running Tests

### Run all tests
```bash
pnpm test
```

### Run tests in watch mode
```bash
pnpm test -- --watch
```

### Run tests with coverage
```bash
pnpm test:coverage
```

### Run specific test file
```bash
pnpm test -- src/utils/response.test.ts
```

## Project Structure

```
src/
├── routes/
│   └── v1/
│       ├── routes.ts          # Route handlers
│       └── routes.test.ts      # Route tests ✓
├── utils/
│   ├── response.ts            # Utility functions
│   ├── response.test.ts        # Response tests ✓
│   └── test-helpers.ts         # Test utilities ✓
└── ...
```

## Test Files

### 1. **src/utils/response.test.ts** - Response Utility Tests
Tests the `sendResponse` function with various scenarios:
- Successful responses (200)
- Failed responses (400)
- Custom status codes (201, 204)
- Request ID handling

### 2. **src/routes/v1/routes.test.ts** - Route Tests
Tests for CRUD endpoints:
- GET /items
- POST /items
- PUT /items/:id
- DELETE /items/:id

### 3. **src/utils/test-helpers.ts** - Test Utilities
Helper functions to mock Express Request and Response objects:
- `createMockRequest()` - Creates a mock request with default values
- `createMockResponse()` - Creates a mock response with chainable methods

## Writing Tests

### Basic Test Structure
```typescript
import { describe, it, expect } from 'vitest';

describe('Feature Name', () => {
    it('should do something', () => {
        const result = functionToTest();
        expect(result).toBe(expectedValue);
    });
});
```

### Testing Express Routes
```typescript
import { createMockRequest, createMockResponse } from '@/utils/test-helpers';

describe('Route Handler', () => {
    it('should handle request', () => {
        const req = createMockRequest({ body: { name: 'Test' } });
        const res = createMockResponse();
        
        // Call route handler
        routeHandler(req, res);
        
        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
```

## Best Practices

1. **Test File Naming**: Use `.test.ts` or `.spec.ts` extensions
2. **Descriptive Names**: Write clear test descriptions
3. **Use beforeEach**: Reset mocks between tests
4. **One Assertion Per Test**: Keep tests focused
5. **Mock External Dependencies**: Use `vi.fn()` and `vi.mock()`
6. **Test Edge Cases**: Test success, failure, and boundary conditions

## Coverage Reports

After running `pnpm test:coverage`, open the HTML report:
```bash
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
```

## Adding New Tests

1. Create a `.test.ts` file next to the file you're testing
2. Import the necessary utilities and functions
3. Use `describe` and `it` to organize tests
4. Use `createMockRequest()` and `createMockResponse()` for Express testing
5. Run `pnpm test` to verify

## Useful Vitest Commands

```bash
pnpm test                    # Run all tests once
pnpm test -- --watch        # Watch mode
pnpm test -- --ui           # Open UI dashboard
pnpm test -- --coverage     # Generate coverage report
pnpm test -- --reporter=verbose  # Verbose output
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Assertion Matchers](https://vitest.dev/api/)
