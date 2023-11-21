let
  pkgs = import <nixpkgs> { };
  pgrest = pkgs.haskellPackages.callPackage ./default.nix { };
  hsTools = with pkgs.haskellPackages; [
    cabal-install hpack haskell-language-server
    haskell-dap ghci-dap hlint random text-show cassava
    hsc2hs hint 
  ];
  rTools = with pkgs.rPackages; [
    svglite
    # rmarkdown
    # knitr
    # rgl
    # magick
    # ggplot2
    # rgdal
  ];
in
  pkgs.mkShell {
    inputsFrom = [ (pkgs.haskellPackages.callCabal2nix "practical-haskell" ./. { }).env ];
    buildInputs = (with pkgs.haskellPackages; [
      cabal-install haskell-language-server hlint
    ] ++ [ pkgs.zlib pkgs.libiconv pkgs.R ] ++ hsTools ++ rTools);
  }
