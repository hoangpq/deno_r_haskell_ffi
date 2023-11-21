{ mkDerivation, aeson, base, bytestring, HDBC, HDBC-postgresql
, heroku, hpack, hspec, http-types, lib, network, network-uri
, optparse-applicative, text, unordered-containers, wai, warp
, random, text-show, cassava
}:
mkDerivation {
  pname = "pgrest";
  version = "0.1.0.0";
  src = ./.;
  isLibrary = false;
  isExecutable = true;
  libraryToolDepends = [ hpack ];
  executableHaskellDepends = [
    aeson base bytestring HDBC HDBC-postgresql heroku hspec http-types
    network network-uri optparse-applicative text unordered-containers
    wai warp cassava
  ];
  prePatch = "hpack";
  homepage = "https://github.com/githubuser/pgrest#readme";
  license = lib.licenses.bsd3;
}
