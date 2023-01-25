let
  pkgs = import <nixpkgs> { };
  pgrest = pkgs.haskellPackages.callPackage ./default.nix { };
  hsTools = with pkgs.haskellPackages; [
    cabal-install hpack 
    haskell-language-server 
    haskell-dap ghci-dap haskell-debug-adapter phoityne-vscode 
    hlint fmt random text-show cassava 
    hsc2hs hint 
  ];
  rTools = with pkgs.rPackages; [
    # rmarkdown
    # knitr
    # rgl
    # magick
    # ggplot2
    # rgdal
  ];
in
  pkgs.lib.overrideDerivation pgrest.env (old: {
    buildInputs = old.buildInputs ++ [ pkgs.zlib pkgs.libiconv pkgs.R ] ++ hsTools ++ rTools;
  })
