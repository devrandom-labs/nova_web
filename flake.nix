{
  description = "nova web";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    utils = { url = "github:numtide/flake-utils"; };
  };
  outputs = { nixpkgs, utils, ... }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        packageJson = builtins.fromJSON (builtins.readFile ./package.json);
        nodejs = pkgs.nodejs_24;
        pnpmDeps = pkgs.pnpm.fetchDeps {
          pname = packageJson.name;
          version = packageJson.version;
          src = ./.;
          hash = "sha256-iNlTrcBxBTWt8IZXNeEuYt9Xpi1NxaDAkKBiVQwnkrU=";
        };

      in with pkgs; {
        packages.default = stdenv.mkDerivation {
          pname = packageJson.name;
          version = packageJson.version;
          src = ./.;

          nativeBuildInputs = [ nodejs pnpm.configHook ];
          inherit pnpmDeps;

          buildPhase = ''
            runHook preBuild
            pnpm build
            runHook postBuild
          '';
          installPhase = ''
            runHook preInstall
            mkdir -p $out
            cp -r dist/* $out/
            runHook postInstall
          '';
        };
        devShells.default = mkShell {
          buildInputs = [
            nodejs
            nodePackages.pnpm
            nodePackages.typescript-language-server
            tree-sitter-grammars.tree-sitter-tsx
          ];
          shellHook = ''
            echo "✔ Nova web environment ready"
          '';
        };
      });
}
