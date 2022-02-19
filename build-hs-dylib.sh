# get C header
# ghc -c -O Eval.hs

# nix-shell -p "ghc.withPackages (pkgs: with pkgs; [ hakyll pandoc ])"
GHC_VERSION=$(ghc --numeric-version)
LIBS_DIR=libs

echo "Using ghc: $GHC_VERSION"

# Manually
#ghc -O2 -dynamic -shared -fPIC \
#  -o libEval.dylib Eval.hs hsbracket.c \
#   -L"$(ghc --print-libdir)/rts" \
#   -l"HSrts-ghc$GHC_VERSION"

# With cabal
cabal build
ghc -O2 -fPIC -c app/c-src/hsbracket.c
ghc -O2 -dynamic -shared -fPIC -o $LIBS_DIR/libEval \
  app/Main.hs app/c-src/hsbracket.o -l"HSrts-ghc$GHC_VERSION"

# gcc -O2 -c calculator.c
# gcc -o calculator calculator.o -L. -lEval -Wl,-rpath,'$ORIGIN'

# change binary @rpath
# install_name_tool -change "@rpath/libEval.dylib" "@executable_path/libEval.dylib" calculator

file $LIBS_DIR/libEval
du -h $LIBS_DIR/libEval

# clean
rm -rf app/c-src/*.{hi,o}
rm -rf app/*.{hi,o}
