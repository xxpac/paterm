{
  description = "Paterm - open-source lightweight cross-platform terminal emulator";

  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }: let
    forAllSystems = nixpkgs.lib.genAttrs [ "x86_64-linux" "x86_64-darwin" "aarch64-darwin" ];
  in {
    packages = forAllSystems (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      paterm = pkgs.callPackage ./nix/package.nix { };
      default = self.packages.${system}.paterm;
    });

    nixosModules.paterm = { pkgs, ... }: {
      environment.systemPackages = [ self.packages.${pkgs.system}.paterm ];
    };

    darwinModules.paterm = { pkgs, ... }: {
      environment.systemPackages = [ self.packages.${pkgs.system}.paterm ];
    };
  };
}
