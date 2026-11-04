#!/bin/bash
# Build script for Vercel: Vercel has no Flutter preinstalled, so fetch it first.
set -e

FLUTTER_VERSION="3.32.6"

if [ ! -d "flutter" ]; then
  git clone https://github.com/flutter/flutter.git --depth 1 --branch "$FLUTTER_VERSION" flutter
fi
export PATH="$PATH:$(pwd)/flutter/bin"

flutter config --enable-web --no-analytics
flutter pub get
flutter build web --release
