#!/bin/bash

# Production deployment script for Baus Website
# This script prepares the application for production deployment

set -e  # Exit on any error

echo "🚀 Starting production build process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_status "Checking environment..."

# Check for required environment variables
ENV_FILE=".env.local"
if [ ! -f "$ENV_FILE" ]; then
    print_warning "No .env.local file found. Make sure to set up environment variables."
fi

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf dist

# Install dependencies
print_status "Installing dependencies..."
if command -v yarn &> /dev/null; then
    yarn install --frozen-lockfile
elif command -v pnpm &> /dev/null; then
    pnpm install --frozen-lockfile
else
    npm ci
fi

# Run linting
print_status "Running linter..."
npm run lint || print_warning "Linting issues found, but continuing build..."

# Run type checking if TypeScript is configured
if [ -f "tsconfig.json" ]; then
    print_status "Running TypeScript checks..."
    npx tsc --noEmit || print_warning "TypeScript issues found, but continuing build..."
fi

# Set NODE_ENV for production build
export NODE_ENV=production

# Build the application
print_status "Building application for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    print_status "Build completed successfully!"
    
    # Display build size information
    if [ -d ".next" ]; then
        echo ""
        echo "📊 Build Information:"
        echo "   Build folder: .next"
        BUILD_SIZE=$(du -sh .next 2>/dev/null | cut -f1 || echo "Unknown")
        echo "   Build size: $BUILD_SIZE"
        
        # Check for large bundles
        if [ -d ".next/static/chunks" ]; then
            LARGE_CHUNKS=$(find .next/static/chunks -name "*.js" -size +1M 2>/dev/null | wc -l)
            if [ "$LARGE_CHUNKS" -gt 0 ]; then
                print_warning "Found $LARGE_CHUNKS JavaScript chunks larger than 1MB"
                echo "           Consider code splitting or bundle optimization"
            fi
        fi
    fi
    
    echo ""
    echo "🎉 Production build ready!"
    echo ""
    echo "Next steps:"
    echo "  • Test the build locally: npm start"
    echo "  • Deploy to your hosting platform"
    echo "  • Set up monitoring and analytics"
    echo ""
    
else
    print_error "Build failed!"
    exit 1
fi