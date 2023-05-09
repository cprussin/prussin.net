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

    build = "${pkgs.turbo}/bin/turbo run build";
    start = "${pkgs.turbo}/bin/turbo run start:dev";

    test = {
      nix = {
        lint = "${pkgs.statix}/bin/statix check --ignore node_modules .";
        dead-code = "${pkgs.deadnix}/bin/deadnix .";
        format = "${pkgs.alejandra}/bin/alejandra --exclude ./node_modules --check .";
      };
      turbo = "${pkgs.turbo}/bin/turbo run test";
    };

    fix = {
      nix = {
        lint = "${pkgs.statix}/bin/statix fix --ignore node_modules .";
        dead-code = "${pkgs.deadnix}/bin/deadnix -e .";
        format = "${pkgs.alejandra}/bin/alejandra --exclude ./node_modules .";
      };
      turbo = "${pkgs.turbo}/bin/turbo run fix";
    };
  };
in
  pkgs.mkShell {
    FORCE_COLOR = 1;
    buildInputs = [
      cli
      pkgs.git
      pkgs.niv
      pkgs.nodePackages.pnpm
      pkgs.nodejs
      pkgs.turbo
      pkgs.yarn
    ];
  }
