{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
    mkCli.url = "github:cprussin/mkCli";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    mkCli,
    ...
  }: let
    cli-overlay = nixpkgs.lib.composeExtensions mkCli.overlays.default (final: _: {
      cli = final.lib.mkCli "cli" {
        _noAll = true;

        start = "${final.pnpm}/bin/pnpm turbo start:dev";

        test = {
          nix = {
            lint = "${final.statix}/bin/statix check --ignore node_modules .";
            dead-code = "${final.deadnix}/bin/deadnix .";
            format = "${final.alejandra}/bin/alejandra --exclude ./node_modules --check .";
          };
          turbo = "${final.pnpm}/bin/pnpm turbo test -- --ui stream";
        };

        fix = {
          nix = {
            lint = "${final.statix}/bin/statix fix --ignore node_modules .";
            dead-code = "${final.deadnix}/bin/deadnix -e .";
            format = "${final.alejandra}/bin/alejandra --exclude ./node_modules .";
          };
          turbo = "${final.pnpm}/bin/pnpm turbo fix -- --ui stream";
        };
      };
    });

    project-shell-overlay = final: _: {
      project-shell = final.mkShell {
        name = "project-shell";
        FORCE_COLOR = 1;
        buildInputs = [
          final.cli
          final.git
          final.nodejs
          final.pnpm
        ];
      };
    };
  in
    (flake-utils.lib.eachDefaultSystem
      (
        system: let
          pkgs = import nixpkgs {
            inherit system;
            overlays = [cli-overlay project-shell-overlay];
            config = {};
          };
        in {
          packages = {
            inherit (pkgs) cli project-shell;
          };
          devShells.default = pkgs.project-shell;
        }
      ))
    // {
      overlays = {
        cli = cli-overlay;
        project-shell = project-shell-overlay;
      };
    };
}
