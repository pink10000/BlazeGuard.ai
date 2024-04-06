{ sources ? import ./nix/sources.nix }:
let
  pkgs = import sources.nixpkgs {};
  bp = pkgs.callPackage sources.nix-npm-buildpackage {};
  inherit (import sources."gitignore.nix" { inherit (pkgs) lib; }) gitignoreSource;
  src = gitignoreSource ./next-app;
in
  bp.buildNpmPackage {
    inherit src;
    npmBuild = "npm run build";
    extraEnvVars = {
      NEXT_BUILD_ID = builtins.hashString "sha256" "${src}";
    };
  }
 