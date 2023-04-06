{
  sources ? import ./sources.nix,
  nixpkgs ? sources.nixpkgs,
  niv ? sources.niv,
  mkCli ? sources.mkCli,
}: let
  niv-overlay = self: _: {
    niv = self.symlinkJoin {
      name = "niv";
      paths = [niv];
      buildInputs = [self.makeWrapper];
      postBuild = ''
        wrapProgram $out/bin/niv \
          --add-flags "--sources-file ${toString ./sources.json}"
      '';
    };
  };

  mkCli-overlay = import "${mkCli}/overlay.nix";

  pkgs = import nixpkgs {
    overlays = [
      niv-overlay
      mkCli-overlay
    ];
    config = {};
  };

  cli = pkgs.lib.mkCli "cli" {
    _noAll = true;

    build = "${pkgs.nodePackages.pnpm}/bin/pnpm run turbo:build";
    start = "${pkgs.nodePackages.pnpm}/bin/pnpm run turbo:start:dev";

    test = {
      nix = {
        lint = "${pkgs.statix}/bin/statix check --ignore node_modules .";
        dead-code = "${pkgs.deadnix}/bin/deadnix .";
        format = "${pkgs.alejandra}/bin/alejandra --exclude ./node_modules --check .";
      };
      js = {
        dependencies = "${pkgs.nodePackages.pnpm}/bin/pnpm run turbo:test:dependencies";
        format = "${pkgs.nodePackages.pnpm}/bin/pnpm run turbo:test:format";
        lint = "${pkgs.nodePackages.pnpm}/bin/pnpm run turbo:test:lint";
        types = "${pkgs.nodePackages.pnpm}/bin/pnpm run turbo:test:types";
        unit-test = "${pkgs.nodePackages.pnpm}/bin/pnpm run turbo:test:unit-test";
      };
    };

    fix = {
      nix = {
        lint = "${pkgs.statix}/bin/statix fix --ignore node_modules .";
        dead-code = "${pkgs.deadnix}/bin/deadnix -e .";
        format = "${pkgs.alejandra}/bin/alejandra --exclude ./node_modules .";
      };
      js = {
        format = "${pkgs.nodePackages.pnpm}/bin/pnpm run turbo:fix:format";
        lint = "${pkgs.nodePackages.pnpm}/bin/pnpm run turbo:fix:lint";
      };
    };
  };
in
  pkgs.mkShell {
    buildInputs = [
      cli
      pkgs.git
      pkgs.niv
      pkgs.nodePackages.pnpm
      pkgs.nodejs
      pkgs.turbo
    ];
  }
